import { writePage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { z } from "zod"

export const MOBILE_CUT_PAGE_TYPE_SLUG = "mobile-cut"

const WRITER = "ops mobile deploy-testflight"

export interface CutFingerprint {
  readonly buildNumber: number
  readonly mainSha: string
  readonly shellSha: string | null
  readonly buildInputTreeHash: string | null
  readonly cutAt: string
}

export interface CurrentTreeState {
  readonly mainSha: string
  readonly buildInputTreeHash: string
}

export interface CutStatus {
  readonly owed: boolean
  readonly buildInputChanged: boolean
  readonly predatesBasis: boolean
  readonly lastCut: CutFingerprint | null
}

export function compareCutStatus(
  last: CutFingerprint | null,
  current: CurrentTreeState
): CutStatus {
  if (last === null) {
    return { owed: true, buildInputChanged: true, predatesBasis: false, lastCut: null }
  }
  if (last.buildInputTreeHash === null) {
    return { owed: true, buildInputChanged: true, predatesBasis: true, lastCut: last }
  }
  const buildInputChanged = last.buildInputTreeHash !== current.buildInputTreeHash
  return {
    owed: buildInputChanged,
    buildInputChanged,
    predatesBasis: false,
    lastCut: last,
  }
}

export async function recordCutFingerprint(appSlug: string, fp: CutFingerprint): Promise<void> {
  const name = `${appSlug}-${fp.buildNumber}`
  const landed = await writePage(
    MOBILE_CUT_PAGE_TYPE_SLUG,
    name,
    {
      title: `${appSlug} cut build ${fp.buildNumber}`,
      "app-slug": appSlug,
      "build-number": fp.buildNumber,
      "main-sha": fp.mainSha,
      ...(fp.shellSha === null ? {} : { "shell-sha": fp.shellSha }),
      ...(fp.buildInputTreeHash === null
        ? {}
        : { "build-input-tree-hash": fp.buildInputTreeHash }),
      "cut-at": fp.cutAt,
    },
    WRITER
  )
  if (!landed.ok) {
    throw new Error(`\`${MOBILE_CUT_PAGE_TYPE_SLUG}/${name}\` was not written: ${landed.why}`)
  }
}

const cutFingerprintValuesSchema = z.object({
  "build-number": z.coerce.number().int().positive(),
  "main-sha": z.string().min(1),
  "shell-sha": z.string().min(1).optional(),
  "build-input-tree-hash": z.string().min(1).optional(),
  "cut-at": z.string().min(1),
})

export async function readLatestCutFingerprint(appSlug: string): Promise<CutFingerprint | null> {
  const asked = await askComposed({
    "page-type": MOBILE_CUT_PAGE_TYPE_SLUG,
    where: { "app-slug": { is: appSlug } },
    "sort-by": "build-number",
    descending: true,
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`\`${MOBILE_CUT_PAGE_TYPE_SLUG}\` went unread: ${asked.why}`)
  }

  const newest = asked.answer.rows[0]
  if (newest === undefined) return null
  const parsed = cutFingerprintValuesSchema.safeParse(newest.values)
  if (!parsed.success) {
    throw new Error(
      `the newest \`${MOBILE_CUT_PAGE_TYPE_SLUG}\` for ${appSlug} (${newest.at}) carries no readable fingerprint: ${parsed.error.message}`
    )
  }
  return {
    buildNumber: parsed.data["build-number"],
    mainSha: parsed.data["main-sha"],
    shellSha: parsed.data["shell-sha"] ?? null,
    buildInputTreeHash: parsed.data["build-input-tree-hash"] ?? null,
    cutAt: parsed.data["cut-at"],
  }
}
