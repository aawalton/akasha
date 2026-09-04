import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import {
  AGGREGATE,
  bytesIn,
  entriesIn,
  folderOf,
  pageAtOf,
  pageBody,
  rendered,
  type Staged,
  standingIn,
} from "../icon-index-rendering/icon-index-rendering.module.code.ts"

const CODE_ROOT = "--code-root"

const STAGE = "--stage"

const VALUED: readonly string[] = [CODE_ROOT, STAGE]

/** The release the icons are read from. Bumping this is the whole point of a run. */
const LUCIDE_TAG = "0.576.0"

const LUCIDE_REPO = "https://github.com/lucide-icons/lucide"

const SCRATCH_UNDER = "/var/tmp"

const SCRATCH_PREFIX = "akasha-icon-search-index-"

const STAGE_PREFIX = "akasha-icon-search-index-stage-"

const FETCH_CEILING_MS = 180_000

const REGENERATE = "akasha page-icon-search-index-generate"

const SECOND_MS = 1000

const OPERATIONAL = 3

type Said = Readonly<Record<string, string | undefined>>

type Reading = { readonly named: Said } | { readonly refused: readonly string[] }

export function wordsIn(argv: readonly string[]): Reading {
  const named: Record<string, string | undefined> = {}
  const refusals: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (!VALUED.includes(one)) {
      refusals.push(`\`${one}\` is not an argument this takes`)
      continue
    }
    const value = argv[at + 1]
    if (value === undefined) {
      refusals.push(`\`${one}\` names a path, and nothing followed it`)
      continue
    }
    named[one] = value
    at += 1
  }
  return refusals.length > 0 ? { refused: refusals } : { named }
}

export function quoted(word: string): string {
  return `'${word.replaceAll("'", `'\\''`)}'`
}

async function fetched(
  into: string
): Promise<{ readonly icons: string } | { readonly why: string }> {
  const from = `${LUCIDE_REPO}/archive/refs/tags/${LUCIDE_TAG}.tar.gz`
  const tarball = join(into, "lucide.tar.gz")
  let bytes: ArrayBuffer
  try {
    const answer = await fetch(from, { signal: AbortSignal.timeout(FETCH_CEILING_MS) })
    if (!answer.ok) return { why: `${from} answered ${answer.status} ${answer.statusText}` }
    bytes = await answer.arrayBuffer()
  } catch (thrown) {
    if (thrown instanceof Error && thrown.name === "TimeoutError") {
      return {
        why:
          `${from} did not arrive within ${FETCH_CEILING_MS / SECOND_MS}s, so the lucide ` +
          `${LUCIDE_TAG} release was never fetched and no index was built`,
      }
    }
    return { why: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  await Bun.write(tarball, bytes)
  const unpacked = spawnSync("tar", ["xzf", tarball, "-C", into])
  if (unpacked.status !== 0) {
    return { why: `the lucide ${LUCIDE_TAG} tarball would not unpack: ${String(unpacked.stderr)}` }
  }
  const icons = join(into, `lucide-${LUCIDE_TAG}`, "icons")
  if (!existsSync(icons)) {
    return { why: `the lucide ${LUCIDE_TAG} release unpacked with no \`icons\` folder at ${icons}` }
  }
  return { icons }
}

/** Writes the bodies into the staging folder and the script that lands them. Nothing under
 *  `akasha/` is touched: a body reaches there through `akasha write` alone. */
function staged(
  stage: string,
  root: string,
  pages: readonly Staged[],
  gone: readonly string[]
): string {
  const argv: string[] = []
  for (const page of pages) {
    for (const [at, body] of [
      [page.codeAt, page.code],
      [page.pageAt, pageBody(root, page.slug, page.definition)],
    ] as const) {
      const into = join(stage, at)
      mkdirSync(dirname(into), { recursive: true })
      writeFileSync(into, body)
      argv.push("--file-path", at, "--content-file", into)
    }
  }
  // A removed page carries the files standing beside it, so naming the page file takes the
  // code body with it and empties the folder.
  for (const slug of gone) argv.push("--remove", pageAtOf(slug))

  const messageAt = join(stage, "message.txt")
  writeFileSync(
    messageAt,
    `regenerate the icon search index from lucide ${LUCIDE_TAG}\n\nWritten by \`${REGENERATE}\`.\n`
  )
  argv.push("--message-file", messageAt)

  const landAt = join(stage, "land.sh")
  const call = argv.map(quoted).join(" \\\n  ")
  writeFileSync(landAt, `#!/usr/bin/env bash\nset -euo pipefail\nakasha write \\\n  ${call}\n`)
  return landAt
}

/** The staging folder is left standing after this returns, because the `akasha write` call
 *  that lands what is in it is made afterwards by whoever ran this. */
function stagingAt(named: string | undefined): string {
  if (named === undefined) return mkdtempSync(join(realpathSync(SCRATCH_UNDER), STAGE_PREFIX))
  mkdirSync(named, { recursive: true })
  return realpathSync(named)
}

export async function pageIconSearchIndexGenerate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const said = wordsIn(argv)
  if ("refused" in said) return { report: [], refusals: said.refused, code: 1 }

  const named = said.named[CODE_ROOT]
  if (named !== undefined && !existsSync(named)) {
    return {
      report: [],
      refusals: [`\`${CODE_ROOT} ${named}\` names no folder that is there`],
      code: 1,
    }
  }
  const root = realpathSync(named ?? given.root)
  const stage = stagingAt(said.named[STAGE])
  const scratch = mkdtempSync(join(realpathSync(SCRATCH_UNDER), SCRATCH_PREFIX))
  try {
    const release = await fetched(scratch)
    if ("why" in release) return { report: [], refusals: [release.why], code: OPERATIONAL }
    const entries = entriesIn(release.icons)
    const held = rendered(entries)
    if ("refused" in held) return { report: [], refusals: held.refused, code: 1 }
    const pages = held.pages

    const standing = standingIn(root)
    const kept = new Set(pages.map((one) => one.slug))
    const gone = standing.filter((slug) => !kept.has(slug))
    const landAt = staged(stage, root, pages, gone)

    const report = [
      `${entries.length} icons staged across ${pages.length} pages ` +
        `(${pages.length * 2} files) under ${stage}`,
      ...pages.map((one) => `  ${bytesIn(one.code)}\t${one.codeAt}`),
      ...gone.map((slug) => `  gone\t${folderOf(slug)}`),
      "",
      `nothing has landed. To land what was staged, run:`,
      `  bash ${landAt}`,
      "",
      "a write over a body the read record does not show you read is refused, so every page " +
        "above that already stands has to be read first, or the write has to break the glass " +
        "— which also passes the checks that judge the sizes.",
    ]

    const stood = new Set(standing)
    const arrived = [...kept].filter((slug) => slug !== AGGREGATE && !stood.has(slug)).sort()
    if (arrived.length > 0 || gone.length > 0) {
      report.push(
        "",
        "the shard count changed, so the `partSlugs` of the package holding these no longer " +
          "names what stands. Nothing here writes that list:",
        ...arrived.map((slug) => `  add     module/${slug}`),
        ...gone.map((slug) => `  remove  module/${slug}`)
      )
    }
    return { report, refusals: [], code: 0 }
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}
