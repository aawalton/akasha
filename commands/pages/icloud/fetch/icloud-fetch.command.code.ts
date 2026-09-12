import { mkdir } from "node:fs/promises"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { PhotoAsset } from "akasha/alan/harness/icloud-photos/album-pulling/album-pulling.module.code.ts"
import {
  buildQueryRequest,
  buildResolveRequest,
  dedupePaths,
  nextStartRank,
  parseQueryPage,
  parseResolveResponse,
  parseShareToken,
  resolveOutputDir,
} from "akasha/alan/harness/icloud-photos/album-pulling/album-pulling.module.code.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"

const URL_FLAG = "--url"

const OUTPUT = "--output"

const JSON_FLAG = "--json"

const VALUED = new Set([URL_FLAG, OUTPUT])

const BARE = new Set([JSON_FLAG])

export type Read =
  | { readonly said: ReadonlyMap<string, string>; readonly json: boolean }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const words: string[] = []
  const said = new Map<string, string>()
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      words.push(one)
      continue
    }
    if (BARE.has(one)) {
      json = true
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
      refusals.push(`\`${words[1]}\` follows the album, and one call names one album`)
    } else if (said.has(URL_FLAG)) {
      refusals.push(`\`${first}\` names the album in place where \`${URL_FLAG}\` names it too`)
    } else {
      said.set(URL_FLAG, first)
    }
  }
  if (!said.has(URL_FLAG)) {
    refusals.push("this takes the album to fetch, and none was named")
  }
  if (refusals.length > 0) return { refused: refusals }
  return { said, json }
}

export function folderOf(said: string | undefined, root: string, from: string): string {
  return said === undefined ? from : resolveOutputDir(said, root)
}

async function postJson(url: string, body: unknown): Promise<unknown> {
  let answer: Response
  try {
    answer = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch (thrown) {
    throw new OperationalError(`the iCloud request failed: ${whyOf(thrown)}`)
  }
  if (!answer.ok) {
    throw new OperationalError(`iCloud answered ${answer.status} ${answer.statusText}`)
  }
  try {
    return await answer.json()
  } catch {
    throw new OperationalError("what iCloud answered with is no JSON")
  }
}

async function downloadTo(url: string, at: string): Promise<void> {
  let answer: Response
  try {
    answer = await fetch(url)
  } catch (thrown) {
    throw new OperationalError(`the download for ${at} failed: ${whyOf(thrown)}`)
  }
  if (!answer.ok) {
    throw new OperationalError(
      `the download for ${at} answered ${answer.status} ${answer.statusText}`
    )
  }
  await Bun.write(at, await answer.arrayBuffer())
}

async function everyAsset(raw: unknown): Promise<readonly PhotoAsset[]> {
  const held = parseResolveResponse(raw)
  const assets: PhotoAsset[] = []
  let startRank = 0
  for (;;) {
    const asked = buildQueryRequest(held, startRank)
    const page = parseQueryPage(await postJson(asked.url, asked.body))
    assets.push(...page)
    const next = nextStartRank(startRank, page.length)
    if (next === undefined) break
    startRank = next
  }
  return assets
}

export type Target = {
  readonly asset: { readonly downloadURL: string }
  readonly path: string
}

export type Downloading = (url: string, at: string) => Promise<void>

export function saidOf(path: string, json: boolean): string {
  return json ? JSON.stringify({ path }) : `path\t${path}`
}

export async function wroteEach(
  targets: readonly Target[],
  json: boolean,
  downloading: Downloading,
  done: string[]
): Promise<void> {
  for (const target of targets) {
    await downloading(target.asset.downloadURL, target.path)
    done.push(saidOf(target.path, json))
  }
}

async function fetching(
  read: {
    readonly said: ReadonlyMap<string, string>
    readonly json: boolean
  },
  root: string,
  from: string,
  downloading: Downloading,
  done: string[]
): Promise<Answer> {
  const shareUrl = read.said.get(URL_FLAG) ?? ""
  const token = parseShareToken(shareUrl)
  const asked = buildResolveRequest(token)
  const assets = await everyAsset(await postJson(asked.url, asked.body))
  if (assets.length === 0) {
    return refusedBy([`the shared album at ${shareUrl} holds no photo`], DATA)
  }
  const folder = folderOf(read.said.get(OUTPUT), root, from)
  await mkdir(folder, { recursive: true })
  await wroteEach(dedupePaths(assets, folder), read.json, downloading, done)
  return told(done)
}

export async function icloudFetch(
  argv: readonly string[],
  given: Given,
  downloading: Downloading = downloadTo
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => fetching(read, given.root, given.from, downloading, done))
}
