import { readFileSync } from "node:fs"
import { join } from "node:path"
import { landBodies } from "@akasha/command-system/gated-landing"
import { exclusively } from "@akasha/file-system/exclusive"
import { valuesOfType } from "@akasha/indexes"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { numberAt, textAt } from "@akasha/pages-system/page-value"
import { ran } from "@akasha/utils-run/running"

const PAGE_TYPE = "page-type"

const NEXT_SEQ_KEY = "nextSeq"

const WRITER = "page-seq-writer"

const ALLOCATING = ".seq"

export interface SeqSource {
  readonly pageTypeSlug: string
  readonly noun: string
}

export const PIPELINE_SEQS: SeqSource = { pageTypeSlug: "pipeline", noun: "pipeline" }

export const WORKFLOW_SEQS: SeqSource = { pageTypeSlug: "workflow", noun: "workflow" }

export const STEP_SEQS: SeqSource = { pageTypeSlug: "step", noun: "step" }

function root(): string {
  return rootFor(resolveRoots(), AKASHA)
}

export function pageTypePathOf(at: string, pageTypeSlug: string): string {
  for (const one of valuesOfType(at, PAGE_TYPE)) {
    if (textAt(one.value, "slug") === pageTypeSlug) return one.path
  }
  throw new Error(
    `no page type is filed under \`${pageTypeSlug}\`, so there is no counter to take a seq from`
  )
}

function readNextSeqOf(at: string, relPath: string, pageTypeSlug: string): number {
  const found = valuesOfType(at, PAGE_TYPE).find((one) => one.path === relPath)
  const stated = found === undefined ? null : numberAt(found.value, NEXT_SEQ_KEY)
  if (stated === null) {
    throw new Error(
      `${relPath} states no \`${NEXT_SEQ_KEY}\`, so \`${pageTypeSlug}\` hands out no seq`
    )
  }
  if (!Number.isInteger(stated) || stated <= 0) {
    throw new Error(
      `${relPath} states \`${NEXT_SEQ_KEY}: ${String(stated)}\`, ` +
        "which is not a whole number above zero"
    )
  }
  return stated
}

interface Advance {
  readonly code: number
  readonly output: string
}

function uncommitted(at: string, relPath: string): boolean {
  const done = ran(["git", "-C", at, "status", "--porcelain", "--", relPath])
  if (done.code !== 0) return false
  return done.out.trim() !== ""
}

function runOf(first: number, count: number): string {
  return count === 1 ? `#${first}` : `#${first} to #${first + count - 1}`
}

function advance(at: string, relPath: string, noun: string, first: number, count: number): Advance {
  const was = `${NEXT_SEQ_KEY}: ${first}`
  const now = `${NEXT_SEQ_KEY}: ${first + count}`
  let text: string
  try {
    text = readFileSync(join(at, relPath), "utf8")
  } catch (err) {
    return { code: 1, output: `${relPath} would not open: ${String(err)}` }
  }
  const parts = text.split(was)
  if (parts.length !== 2) {
    return {
      code: 1,
      output:
        `\`${was}\` stands ${parts.length - 1} time(s) in ${relPath}, and the ` +
        "counter is advanced only where it stands exactly once",
    }
  }
  const landed = landBodies(
    {
      repo: AKASHA,
      writer: WRITER,
      root: at,
      message: `${noun}: ${runOf(first, count)} ${count === 1 ? "is" : "are"} taken`,
    },
    [{ relPath, body: parts.join(now) }]
  )
  return landed.ok ? { code: 0, output: "" } : { code: 1, output: landed.why }
}

export function takeSeqsOf(source: SeqSource, count: number): number {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error(
      `no ${source.noun} seq was taken: a run of ${count} is not a whole number above zero`
    )
  }
  const at = root()
  const relPath = pageTypePathOf(at, source.pageTypeSlug)
  return exclusively(`${join(at, relPath)}${ALLOCATING}`, () => {
    const stoodChanged = uncommitted(at, relPath)
    const first = readNextSeqOf(at, relPath, source.pageTypeSlug)
    const run = advance(at, relPath, source.noun, first, count)
    if (run.code === 0) return first
    if (!stoodChanged && uncommitted(at, relPath)) {
      throw new Error(
        `nothing was created and ${count === 1 ? "seq" : "seqs"} ${runOf(first, count)} cannot be ` +
          `given back: the edit advancing \`${NEXT_SEQ_KEY}\` in ${relPath} ` +
          "reached disk and the commit that should have carried it did not, so that file stands " +
          "changed and uncommitted. Land or undo the change before asking again. What the attempt " +
          `said:\n${run.output}`
      )
    }
    throw new Error(
      `no ${source.noun} seq was taken: advancing \`${NEXT_SEQ_KEY}\` in ` +
        `${relPath} by ${count} was refused with the counter left where it stood, ` +
        "and nothing was created. Asking again reads the same number and meets the same refusal, " +
        `so read what it said and fix that:\n${run.output}`
    )
  })
}

export function takeSeqOf(source: SeqSource): number {
  return takeSeqsOf(source, 1)
}
