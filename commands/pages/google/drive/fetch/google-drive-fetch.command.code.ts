import { mkdir } from "node:fs/promises"
import { basename, isAbsolute, join, resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { driveFile } from "akasha/commands/arguments/pages/drive-file.argument.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import {
  codeOf,
  DATA,
  INPUT,
  OPERATIONAL,
  partWay,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { googleDriveFetch as page } from "akasha/commands/pages/google/drive/fetch/google-drive-fetch.command.ts"

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
      `\`${fileId}\` names no file on Drive this consent can reach — check the id, and that ` +
        "the file is shared with the account the consent was granted for",
      DATA
    )
  }
  if (status === 401 || status === 403) {
    return refused(
      `\`${fileId}\` was turned away by Drive with ${status} — the consent held is missing ` +
        "or too narrow, and `akasha google login` grants a fresh one",
      OPERATIONAL
    )
  }
  return null
}

export type Making = (folder: string) => Promise<string | undefined>

export type Putting = (at: string, bytes: Uint8Array) => Promise<unknown>

export function madeSaid(folder: string): string {
  return `the folder ${folder} was not there before this, and this made it`
}

export const madeFolder: Making = (folder) => mkdir(folder, { recursive: true })

export const putBytes: Putting = (at, bytes) => Bun.write(at, bytes)

export async function wroteFile(
  folder: string,
  name: string,
  bytes: Uint8Array,
  done: string[],
  making: Making = madeFolder,
  putting: Putting = putBytes
): Promise<string> {
  const made = await making(folder)
  if (made !== undefined) done.push(madeSaid(made))
  const at = join(folder, name)
  await putting(at, bytes)
  return isAbsolute(at) ? at : resolve(at)
}

export function fetchRefused(thrown: unknown, fileId: string, done: readonly string[]): Answer {
  const said = reachSaid(thrown, fileId) ?? refused(whyOf(thrown), codeOf(thrown))
  if (done.length === 0) return said
  return { report: [...done], refusals: [...said.refusals, ...partWay(done)], code: said.code }
}

async function fetching(
  source: string,
  into: string | undefined,
  root: string,
  from: string
): Promise<Answer> {
  const done: string[] = []
  const files = await import("akasha/alan/google/drive/drive-files/drive-files.module.code.ts")
  const fileId = files.parseDriveFileId(source)
  const folder = folderOf(into, root, from)
  const { makeDriveClient } = await import(
    "akasha/alan/google/drive/drive-client/drive-client.module.code.ts"
  )
  const client = await makeDriveClient()
  try {
    const metadata = await files.fetchFileMetadata(client, fileId)
    if (files.isNativeGoogleDoc(metadata.mimeType)) {
      return refused(
        `\`${metadata.name}\` is a native Google ${metadata.mimeType ?? "app"} file holding no ` +
          "bytes to download, and exporting one sits outside what this reaches",
        INPUT
      )
    }
    const bytes = await files.downloadFileBytes(client, fileId)
    const name = basename(metadata.name).trim()
    if (name === "" || name === "." || name === "..") {
      return refused(
        `\`${fileId}\` carries the Drive name \`${metadata.name}\`, and nothing can be written under it`,
        OPERATIONAL
      )
    }
    return told([await wroteFile(folder, name, bytes, done)])
  } catch (thrown) {
    return fetchRefused(thrown, fileId, done)
  }
}

export async function googleDriveFetch(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [output, driveFile])
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  try {
    return await fetching(taken.driveFile, taken.output, resolve(given.root), given.from)
  } catch (thrown) {
    return refused(`\`${given.calledAs}\` — ${whyOf(thrown)}`, codeOf(thrown))
  }
}
