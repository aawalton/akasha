import { mkdir } from "node:fs/promises"
import { basename, isAbsolute, join, resolve } from "node:path"
import { exitCodeForThrowable } from "@akasha/errors-core/exit-code"
import { DRIVE_SCOPES } from "@akasha/google-drive/env"
import { readGoogleOauthAppCredentials } from "@akasha/google-oauth/oauth-app-credentials"
import { googleOauthConsent } from "@akasha/google-oauth/oauth-consent"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"

export const AUTH = "auth"

export const FETCH = "fetch"

const LOGIN = "login"

const CALLBACK_URL = "--callback-url"

const SOURCE = "--source"

const OUT = "--out"

const REFRESH_TOKEN_VAR = "GOOGLE_DRIVE_OAUTH_REFRESH_TOKEN"

const ACTS: Readonly<Record<string, readonly string[]>> = {
  [AUTH]: [LOGIN],
  [FETCH]: [],
}

const TAKES: Readonly<Record<string, readonly string[]>> = {
  [`${AUTH} ${LOGIN}`]: [CALLBACK_URL],
  [FETCH]: [SOURCE, OUT],
}

const VALUED = new Set([CALLBACK_URL, SOURCE, OUT])

export type Read =
  | { readonly act: string; readonly said: ReadonlyMap<string, string> }
  | { readonly refused: readonly string[] }

function listed(said: readonly string[]): string {
  return said.map((one) => `\`${one}\``).join(", ")
}

function reading(argv: readonly string[]): {
  readonly refusals: readonly string[]
  readonly words: readonly string[]
  readonly said: Map<string, string>
} {
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
  return { refusals, words, said }
}

function actIn(words: readonly string[], refusals: string[]): { act: string; rest: number } | null {
  const first = words[0]
  if (first === undefined) {
    refusals.push(`this names no act — it carries ${listed(Object.keys(ACTS))}`)
    return null
  }
  const under = ACTS[first]
  if (under === undefined) {
    refusals.push(`\`${first}\` is no act this carries — it carries ${listed(Object.keys(ACTS))}`)
    return null
  }
  if (under.length === 0) return { act: first, rest: 1 }
  const second = words[1]
  if (second === undefined) {
    refusals.push(`\`${first}\` names no act — it carries ${listed(under)}`)
    return null
  }
  if (!under.includes(second)) {
    refusals.push(`\`${second}\` is no act \`${first}\` carries — it carries ${listed(under)}`)
    return null
  }
  return { act: `${first} ${second}`, rest: 2 }
}

function placing(
  act: string,
  rest: readonly string[],
  said: Map<string, string>,
  refusals: string[]
): void {
  const first = rest[0]
  if (first === undefined) return
  if (act !== FETCH) {
    refusals.push(`\`${first}\` follows \`${act}\`, which names nothing in place`)
    return
  }
  if (rest.length > 1) {
    refusals.push(`\`${rest[1]}\` follows the file, and one call names one file`)
    return
  }
  if (said.has(SOURCE)) {
    refusals.push(`\`${first}\` names the file in place where \`${SOURCE}\` names it too`)
    return
  }
  said.set(SOURCE, first)
}

export function readIn(argv: readonly string[]): Read {
  const held = reading(argv)
  const refusals = [...held.refusals]
  const found = actIn(held.words, refusals)
  if (found === null) return { refused: refusals }
  placing(found.act, held.words.slice(found.rest), held.said, refusals)
  const takes = TAKES[found.act] ?? []
  for (const one of held.said.keys()) {
    if (!takes.includes(one)) refusals.push(`\`${one}\` is no flag \`${found.act}\` takes`)
  }
  if (found.act === FETCH && !held.said.has(SOURCE)) {
    refusals.push(`\`${FETCH}\` takes the file to fetch, and none was named`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act: found.act, said: held.said }
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

function refusing(said: string, code: number): Answer {
  return { report: [], refusals: [said], code }
}

async function loggingIn(said: ReadonlyMap<string, string>): Promise<Answer> {
  const { clientId, clientSecret } = readGoogleOauthAppCredentials()
  await googleOauthConsent({
    scopes: [...DRIVE_SCOPES],
    clientId,
    clientSecret,
    tokenVar: REFRESH_TOKEN_VAR,
    callbackUrl: said.get(CALLBACK_URL),
  })
  return {
    report: [`consent was granted, and the round trip wrote \`${REFRESH_TOKEN_VAR}\` out itself`],
    refusals: [],
    code: 0,
  }
}

function reachSaid(thrown: unknown, fileId: string): Answer | null {
  const status = statusOf(thrown)
  if (status === 404) {
    return refusing(
      `Drive holds no file ${fileId} this consent can reach — check the id, and that the file ` +
        "is shared with the account the consent was granted for",
      2
    )
  }
  if (status === 401 || status === 403) {
    return refusing(
      `Drive turned the request for ${fileId} away with ${status} — the consent held is missing ` +
        "or too narrow, and the login act grants a fresh one",
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
  const files = await import("@akasha/google-drive/files")
  const fileId = files.parseDriveFileId(said.get(SOURCE) ?? "")
  const folder = folderOf(said.get(OUT), root, from)
  const { makeDriveClient } = await import("@akasha/google-drive/client")
  const client = await makeDriveClient()
  try {
    const metadata = await files.fetchFileMetadata(client, fileId)
    if (files.isNativeGoogleDoc(metadata.mimeType)) {
      return refusing(
        `"${metadata.name}" is a native Google ${metadata.mimeType ?? "app"} file holding no ` +
          "bytes to download, and exporting one stands outside what this reaches",
        1
      )
    }
    const bytes = await files.downloadFileBytes(client, fileId)
    const name = basename(metadata.name).trim()
    if (name === "" || name === "." || name === "..") {
      return refusing(
        `Drive file ${fileId} carries a name nothing can be written under: "${metadata.name}"`,
        3
      )
    }
    const at = join(folder, name)
    await mkdir(folder, { recursive: true })
    await Bun.write(at, bytes)
    return { report: [isAbsolute(at) ? at : resolve(at)], refusals: [], code: 0 }
  } catch (thrown) {
    return reachSaid(thrown, fileId) ?? refusing(whyOf(thrown), exitCodeForThrowable(thrown))
  }
}

export async function drive(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    if (read.act === FETCH) return await fetching(read.said, resolve(given.root), given.from)
    return await loggingIn(read.said)
  } catch (thrown) {
    return refusing(
      `${given.calledAs} ${read.act} — ${whyOf(thrown)}`,
      exitCodeForThrowable(thrown)
    )
  }
}
