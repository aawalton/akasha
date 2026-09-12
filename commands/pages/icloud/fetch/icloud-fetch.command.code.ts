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
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { album } from "akasha/commands/arguments/pages/album.argument.ts"
import { json as jsonArgument } from "akasha/commands/arguments/pages/json.argument.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { icloudFetch as page } from "akasha/commands/pages/icloud/fetch/icloud-fetch.command.ts"

export type Asked = {
  readonly album: string
  readonly output?: string
  readonly json: boolean
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
    const got = parseQueryPage(await postJson(asked.url, asked.body))
    assets.push(...got)
    const next = nextStartRank(startRank, got.length)
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

function saidOf(path: string, json: boolean): string {
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
  read: Asked,
  root: string,
  from: string,
  downloading: Downloading,
  done: string[]
): Promise<Answer> {
  const shareUrl = read.album
  const token = parseShareToken(shareUrl)
  const asked = buildResolveRequest(token)
  const assets = await everyAsset(await postJson(asked.url, asked.body))
  if (assets.length === 0) {
    return refusedBy([`the shared album at ${shareUrl} holds no photo`], DATA)
  }
  const folder = folderOf(read.output, root, from)
  await mkdir(folder, { recursive: true })
  await wroteEach(dedupePaths(assets, folder), read.json, downloading, done)
  return told(done)
}

export async function icloudFetch(
  argv: readonly string[],
  given: Given,
  downloading: Downloading = downloadTo
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [output, album, jsonArgument])
  if ("refused" in read) return refusedBy([...read.refused])
  const asked = read.taken
  return await answering(async (done) => fetching(asked, given.root, given.from, downloading, done))
}
