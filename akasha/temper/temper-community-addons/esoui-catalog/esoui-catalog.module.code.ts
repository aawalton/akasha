import { OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"
import type { CatalogEntry } from "../addon-update-plan/addon-update-plan.module.code.ts"

const FILELIST_URL = "https://api.mmoui.com/v3/game/ESO/filelist.json"

function filedetailsUrl(uid: string): string {
  return `https://api.mmoui.com/v3/game/ESO/filedetails/${uid}.json`
}

const filelistItemSchema = z
  .object({
    UID: z.string(),
    UIName: z.string(),
    UIVersion: z.string(),
    UIDir: z.array(z.string()).nullish(),
  })
  .passthrough()

const filelistSchema = z.array(filelistItemSchema)

const filedetailsItemSchema = z
  .object({
    UID: z.string(),
    UIVersion: z.string(),
    UIDownload: z.string().url(),
    UIMD5: z.string(),
    UIFileName: z.string().nullish(),
  })
  .passthrough()

const filedetailsSchema = z.array(filedetailsItemSchema).min(1)

export type FileDetails = {
  readonly uid: string
  readonly version: string
  readonly downloadUrl: string
  readonly md5: string
  readonly fileName: string | undefined
}

async function fetchJson(url: string): Promise<unknown> {
  let answered: Response
  try {
    answered = await fetch(url)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    throw new OperationalError(`network error fetching ${url}: ${why}`)
  }
  if (!answered.ok) {
    throw new OperationalError(
      `HTTP ${String(answered.status)} ${answered.statusText} fetching ${url}`
    )
  }
  return answered.json()
}

export async function fetchCatalog(): Promise<readonly CatalogEntry[]> {
  const parsed = filelistSchema.parse(await fetchJson(FILELIST_URL))
  return parsed.map((one) => ({
    uid: one.UID,
    name: one.UIName,
    version: one.UIVersion,
    dirs: one.UIDir ?? [],
  }))
}

export async function fetchFileDetails(uid: string): Promise<FileDetails> {
  const one = filedetailsSchema.parse(await fetchJson(filedetailsUrl(uid)))[0]
  if (one === undefined) throw new OperationalError(`ESOUI answered nothing about file ${uid}`)
  return {
    uid: one.UID,
    version: one.UIVersion,
    downloadUrl: one.UIDownload,
    md5: one.UIMD5,
    fileName: one.UIFileName ?? undefined,
  }
}
