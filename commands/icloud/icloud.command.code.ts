import { mkdir } from "node:fs/promises"
import { exitCodeForThrowable, OperationalError } from "@akasha/errors-core/exit-code"
import type { PhotoAsset } from "@akasha/icloud-photos/album-pulling"
import {
  buildQueryRequest,
  buildResolveRequest,
  dedupePaths,
  nextStartRank,
  parseQueryPage,
  parseResolveResponse,
  parseShareToken,
  resolveOutputDir,
} from "@akasha/icloud-photos/album-pulling"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"

export const FETCH = "fetch"

const URL_FLAG = "--url"

const OUT = "--out"

const OUTPUT = "--output"

const JSON_FLAG = "--json"

const ACTS = [FETCH]

const VALUED = new Set([URL_FLAG, OUT, OUTPUT])

const BARE = new Set([JSON_FLAG])

export type Read =
  | { readonly act: string; readonly said: ReadonlyMap<string, string>; readonly json: boolean }
  | { readonly refused: readonly string[] }

function listed(said: readonly string[]): string {
  return said.map((one) => `\`${one}\``).join(", ")
}

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
    const key = one === OUTPUT ? OUT : one
    if (said.has(key)) {
      refusals.push(`\`${key}\` is said twice over, and it takes one value`)
      continue
    }
    said.set(key, value)
  }
  const act = words[0]
  if (act === undefined) {
    return { refused: [...refusals, `this names no act — it carries ${listed(ACTS)}`] }
  }
  if (!ACTS.includes(act)) {
    return {
      refused: [...refusals, `\`${act}\` is no act this carries — it carries ${listed(ACTS)}`],
    }
  }
  const rest = words.slice(1)
  const first = rest[0]
  if (first !== undefined) {
    if (rest.length > 1) {
      refusals.push(`\`${rest[1]}\` follows the album, and one call names one album`)
    } else if (said.has(URL_FLAG)) {
      refusals.push(`\`${first}\` names the album in place where \`${URL_FLAG}\` names it too`)
    } else {
      said.set(URL_FLAG, first)
    }
  }
  if (!said.has(URL_FLAG)) {
    refusals.push(`\`${FETCH}\` takes the album to fetch, and none was named`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act, said, json }
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

async function fetching(
  read: {
    readonly said: ReadonlyMap<string, string>
    readonly json: boolean
  },
  root: string,
  from: string
): Promise<Answer> {
  const shareUrl = read.said.get(URL_FLAG) ?? ""
  const token = parseShareToken(shareUrl)
  const asked = buildResolveRequest(token)
  const assets = await everyAsset(await postJson(asked.url, asked.body))
  if (assets.length === 0) {
    return { report: [], refusals: [`the shared album at ${shareUrl} holds no photo`], code: 2 }
  }
  const folder = folderOf(read.said.get(OUT), root, from)
  await mkdir(folder, { recursive: true })
  const targets = dedupePaths(assets, folder)
  for (const target of targets) await downloadTo(target.asset.downloadURL, target.path)
  return {
    report: targets.map((one) =>
      read.json ? JSON.stringify({ path: one.path }) : `path\t${one.path}`
    ),
    refusals: [],
    code: 0,
  }
}

export async function icloud(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await fetching(read, given.root, given.from)
  } catch (thrown) {
    return {
      report: [],
      refusals: [`${given.calledAs} ${read.act} — ${whyOf(thrown)}`],
      code: exitCodeForThrowable(thrown),
    }
  }
}
