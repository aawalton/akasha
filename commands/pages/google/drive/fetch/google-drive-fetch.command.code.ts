import { mkdir } from "node:fs/promises"
import { basename, isAbsolute, join, resolve } from "node:path"
import { exitCodeForThrowable } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"

const SOURCE = "--source"

const OUT = "--out"

const VALUED = new Set([SOURCE, OUT])

export type Read =
  | { readonly said: ReadonlyMap<string, string> }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const words: string[] = []
  const said = new Map<string, string>()
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      words.push(one)
      continue
    }
    if (!VALUED.has(one)) {
      refusals.push(`\`${one}\` is no flag this takes`)
      continue
    }
    const value = argv[at + 1]
    if (value === undefined || value.startsWith("--")) {
      refusals.push(`\`${one}\` takes a value, and none followed it`)
      continue
    }
    at += 1
    if (said.has(one)) {
      refusals.push(`\`${one}\` is said twice over, and it takes one value`)
      continue
    }
    said.set(one, value)
  }
  const first = words[0]
  if (first !== undefined) {
    if (words.length > 1) {
      refusals.push(`\`${words[1]}\` follows the file, and one call names one file`)
    } else if (said.has(SOURCE)) {
      refusals.push(`\`${first}\` names the file in place where \`${SOURCE}\` names it too`)
    } else {
      said.set(SOURCE, first)
    }
  }
  if (!said.has(SOURCE)) refusals.push("this takes the file to fetch, and none was named")
  if (refusals.length > 0) return { refused: refusals }
  return { said }
}

export function folderOf(said: string | undefined, root: string, from: string): string {
  if (said === undefined) return from
  return isAbsolute(said) ? said : resolve(root, said)
}

function statusOf(thrown: unknown): number | undefined {
  if (typeof thrown !== "object" || thrown === null) return undefined
  const status = (thrown as { readonly status?: unknown }).status
  return typeof status === "number" ? status : undefined
}

function reachSaid(thrown: unknown, fileId: string): Answer | null {
  const status = statusOf(thrown)
  if (status === 404) {
    return refused(
      `Drive holds no file ${fileId} this consent can reach — check the id, and that the file ` +
        "is shared with the account the consent was granted for",
      2
    )
  }
  if (status === 401 || status === 403) {
    return refused(
      `Drive turned the request for ${fileId} away with ${status} — the consent held is missing ` +
        "or too narrow, and `akasha google auth login` grants a fresh one",
      3
    )
  }
  return null
}

async function fetching(
  said: ReadonlyMap<string, string>,
  root: string,
  from: string
): Promise<Answer> {
  const files = await import("akasha/alan/google/drive/drive-files/drive-files.module.code.ts")
  const fileId = files.parseDriveFileId(said.get(SOURCE) ?? "")
  const folder = folderOf(said.get(OUT), root, from)
  const { makeDriveClient } = await import(
    "akasha/alan/google/drive/drive-client/drive-client.module.code.ts"
  )
  const client = await makeDriveClient()
  try {
    const metadata = await files.fetchFileMetadata(client, fileId)
    if (files.isNativeGoogleDoc(metadata.mimeType)) {
      return refused(
        `"${metadata.name}" is a native Google ${metadata.mimeType ?? "app"} file holding no ` +
          "bytes to download, and exporting one sits outside what this reaches",
        1
      )
    }
    const bytes = await files.downloadFileBytes(client, fileId)
    const name = basename(metadata.name).trim()
    if (name === "" || name === "." || name === "..") {
      return refused(
        `Drive file ${fileId} carries a name nothing can be written under: "${metadata.name}"`,
        3
      )
    }
    const at = join(folder, name)
    await mkdir(folder, { recursive: true })
    await Bun.write(at, bytes)
    return { report: [isAbsolute(at) ? at : resolve(at)], refusals: [], code: 0 }
  } catch (thrown) {
    return reachSaid(thrown, fileId) ?? refused(whyOf(thrown), exitCodeForThrowable(thrown))
  }
}

export async function googleDriveFetch(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await fetching(read.said, resolve(given.root), given.from)
  } catch (thrown) {
    return refused(`${given.calledAs} — ${whyOf(thrown)}`, exitCodeForThrowable(thrown))
  }
}
