import { existsSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  addingFile,
  changingFile,
  landingAt,
  type PartsStaged,
  partsStaged,
  removingAt,
} from "akasha/code/module/modules/name-series/name-series.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import { stage as stageArgument } from "akasha/command/argument/pages/stage.argument.ts"
import {
  answering,
  keeping,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { pageIconSearchIndexGenerate as page } from "akasha/command/pages/page/icon-search-index-generate/page-icon-search-index-generate.command.ts"
import {
  bytesIn,
  entriesIn,
  folderOf,
  isShard,
  pageAtOf,
  pageBody,
  rendered,
  type Staged,
  standingIn,
} from "akasha/page/command/modules/icon-index-rendering/icon-index-rendering.module.code.ts"

const LUCIDE_TAG = "0.576.0"

const LUCIDE_REPO = "https://github.com/lucide-icons/lucide"

const SCRATCH_UNDER = "/var/tmp"

const SCRATCH_PREFIX = "akasha-icon-search-index-"

const STAGE_PREFIX = "akasha-icon-search-index-stage-"

const OWNER_ID = "01a071ca-ec89-7025-aea5-fdec003f5ade"

const FETCH_CEILING_MS = 180_000

const SECOND_MS = 1000

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
  const unpacked = ran(["tar", "xzf", tarball, "-C", into])
  if (unpacked.code !== 0) {
    return { why: `the lucide ${LUCIDE_TAG} tarball would not unpack: ${unpacked.err}` }
  }
  const icons = join(into, `lucide-${LUCIDE_TAG}`, "icons")
  if (!existsSync(icons)) {
    return { why: `the lucide ${LUCIDE_TAG} release unpacked with no \`icons\` folder at ${icons}` }
  }
  return { icons }
}

type Making = (at: string) => undefined

type Writing = (at: string, body: string) => undefined

export type Staging = {
  readonly making: Making
  readonly writing: Writing
}

const STAGING: Staging = {
  making: (at) => {
    mkdirSync(at, { recursive: true })
  },
  writing: (at, body) => {
    writeFileSync(at, body)
  },
}

export type Stageable = {
  readonly slug: string
  readonly files: readonly { readonly at: string; readonly body: string }[]
}

export function stageSaid(stage: string): string {
  return `the stage this writes under is ${stage}`
}

export function stagedSaid(slug: string): string {
  return `staged ${slug}`
}

function messageSaid(messageAt: string): string {
  return `wrote the message a landing takes at ${messageAt}`
}

export function wroteStage(
  stage: string,
  items: readonly Stageable[],
  done: string[],
  staging: Staging = STAGING
): undefined {
  for (const one of items) {
    for (const file of one.files) {
      const into = join(stage, file.at)
      staging.making(dirname(into))
      staging.writing(into, file.body)
    }
    done.push(stagedSaid(one.slug))
  }
  return undefined
}

function staged(
  stage: string,
  root: string,
  pages: readonly Staged[],
  gone: readonly string[],
  calledAs: string,
  done: string[],
  staging: Staging = STAGING
): { readonly landAt: string; readonly parts: PartsStaged } {
  const parts = partsStaged(
    root,
    OWNER_ID,
    isShard,
    pages.map((shard) => shard.slug),
    stage,
    done
  )
  const items: readonly Stageable[] = pages.map((shard) => ({
    slug: shard.slug,
    files: [
      { at: shard.codeAt, body: shard.code },
      { at: shard.pageAt, body: pageBody(root, shard.slug, shard.definition) },
    ],
  }))

  const calls: string[] = [...parts.calls]
  for (const one of items) {
    for (const file of one.files) {
      const was = join(root, file.at)
      const into = join(stage, file.at)
      calls.push(
        ...(existsSync(was)
          ? changingFile(file.at, was, into)
          : addingFile(file.at, into, file.body))
      )
    }
  }
  for (const slug of gone) calls.push(removingAt("remove-page", pageAtOf(slug)))

  wroteStage(stage, items, done, staging)

  const messageAt = join(stage, "message.txt")
  staging.writing(
    messageAt,
    `regenerate the icon search index from lucide ${LUCIDE_TAG}\n\nWritten by \`${calledAs}\`.\n`
  )
  done.push(messageSaid(messageAt))

  const landAt = join(stage, "land.sh")
  const script = ["#!/usr/bin/env bash", "set -euo pipefail", ...calls, ...landingAt(messageAt)]
  staging.writing(landAt, `${script.join("\n")}\n`)
  return { landAt, parts }
}

function stagingAt(named: string | undefined, done: string[]): string {
  if (named === undefined) {
    const made = mkdtempSync(join(realpathSync(SCRATCH_UNDER), STAGE_PREFIX))
    done.push(stageSaid(made))
    return made
  }
  mkdirSync(named, { recursive: true })
  const at = realpathSync(named)
  done.push(stageSaid(at))
  return at
}

export async function pageIconSearchIndexGenerate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [codeRootArgument, stageArgument])
  if ("refused" in read) return refusedBy(read.refused)

  const named = read.taken.codeRoot
  if (named !== undefined && !existsSync(named)) {
    return refusedBy([`\`${codeRootArgument.said} ${named}\` names no folder that is there`])
  }
  return await answering(async (done) => {
    const root = realpathSync(named ?? given.root)
    const stage = stagingAt(read.taken.stage, done)
    const scratch = mkdtempSync(join(realpathSync(SCRATCH_UNDER), SCRATCH_PREFIX))
    try {
      const release = await fetched(scratch)
      if ("why" in release) {
        return keeping(done, refusedBy([release.why], OPERATIONAL))
      }
      const entries = entriesIn(release.icons)
      const held = rendered(entries)
      if ("refused" in held) {
        return keeping(done, refusedBy(held.refused))
      }
      const pages = held.pages

      const standing = standingIn(root)
      const kept = new Set(pages.map((one) => one.slug))
      const gone = standing.filter((slug) => !kept.has(slug))
      const { landAt, parts } = staged(stage, root, pages, gone, given.calledAs, done)

      const report = [
        `${entries.length} icons staged across ${pages.length} pages ` +
          `(${pages.length * 2} files) under ${stage}`,
        ...pages.map((one) => `  ${bytesIn(one.code)}\t${one.codeAt}`),
        ...gone.map((slug) => `  gone\t${folderOf(slug)}`),
        "",
        `nothing has landed. To land what was staged, run:`,
        `  bash ${landAt}`,
        "",
        "the apply is refused for a body the read record does not show you read, so every file " +
          "the script changes has to be read first. Breaking the glass passes the checks and " +
          "passes no reading.",
      ]

      if (parts.at !== null) {
        report.push(
          "",
          `the script rewrites the parts of ${parts.rel} to name every shard above, so that ` +
            "page has to be read first too"
        )
      }
      return told(report)
    } finally {
      rmSync(scratch, { recursive: true, force: true })
    }
  })
}
