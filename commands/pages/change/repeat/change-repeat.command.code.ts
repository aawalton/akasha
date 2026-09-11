import { join } from "node:path"
import { atMostIn } from "akasha/changes/modules/value-carrying/value-carrying.module.code.ts"
import { readingIn } from "akasha/commands/modules/argument-reading/argument-reading.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { type Input, inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const CHANGE_AGENT = "change-agent"

const MODULE = "module"

const CLI = "cli"

const CODE = "code"

const TS = "ts"

const AT_MOST = "at-most"

const TAKES_AT_MOST = "takesAtMost"

const APPLIES = ["change", "apply"]

const COMMITTED = "committed as "

const NO_CHANGE = "no change is named, and a repeat runs one change over and over"

const NO_ARGUMENTS =
  "a repeat reads its arguments from standard input, and this call piped nothing in"

const NO_CEILING = "`at-most` says how many pages one batch acts on, and this call names none"

const NO_CLI = "no `module` is slugged `cli`, so no batch could be run"

const NOTHING_SAID = "that batch landed nothing and said nothing"

const AND_THEN = "batch(es) landed, and then:"

export type Piping = () => Input

export type Batch = {
  readonly code: number
  readonly out: readonly string[]
  readonly err: readonly string[]
}

export type Running = (slug: string, given: string) => Batch

export type Making = (root: string, at: string) => Running

export function cliAt(root: string): string | null {
  const page = listedAt(root, MODULE, CLI)[0]
  return page === undefined ? null : besideAt(page.path, CODE, TS)
}

export function takesAtMost(root: string, slug: string): boolean | null {
  const page = listedAt(root, CHANGE_AGENT, slug)[0]
  if (page === undefined) return null
  const value = valueAt(page.path, root)
  return value === null ? null : value[TAKES_AT_MOST] === true
}

export function lined(said: string | null): readonly string[] {
  if (said === null || said === "") return []
  const held = said.replace(/\n+$/, "")
  return held === "" ? [] : held.split("\n")
}

export function runningIn(root: string, at: string): Running {
  return (slug, given) => {
    const done = ran([process.execPath, join(root, at), ...APPLIES, slug], {
      cwd: root,
      env: { ...process.env, AKASHA_ROOT: root },
      stdin: new TextEncoder().encode(given),
    })
    return { code: done.code, out: lined(done.out), err: lined(done.err) }
  }
}

export function committedIn(out: readonly string[]): string | null {
  const found = out.find((one) => one.startsWith(COMMITTED))
  return found === undefined ? null : found.slice(COMMITTED.length)
}

export function saidBy(batch: Batch): readonly string[] {
  if (batch.err.length > 0) return batch.err
  return batch.out.length > 0 ? batch.out : [NOTHING_SAID]
}

export function repeating(running: Running, slug: string, given: string): Answer {
  const landed: string[] = []
  for (;;) {
    const batch = running(slug, given)
    const commit = batch.code === 0 ? committedIn(batch.out) : null
    if (commit === null) {
      const why = saidBy(batch)
      if (landed.length === 0) return { report: [], refusals: why, code: batch.code || 1 }
      const closing = `${String(landed.length)} ${AND_THEN}`
      return { report: [...landed, closing, ...why], refusals: [], code: 0 }
    }
    landed.push(`batch ${String(landed.length + 1)} committed as ${commit}`)
  }
}

export type Piped = { readonly text: string } | { readonly why: string }

export function textFrom(piping: Piping): Piped {
  const held = piping()
  if ("tty" in held) return { why: NO_ARGUMENTS }
  if ("unreadable" in held) return { why: `the arguments would not open: ${held.unreadable}` }
  if (held.bytes.byteLength === 0) return { why: NO_ARGUMENTS }
  return { text: new TextDecoder().decode(held.bytes) }
}

export function noBatching(slug: string): string {
  return (
    `\`${slug}\` states no \`takes-at-most\`, so one run of it acts on every page it reaches` +
    " and there is nothing to repeat"
  )
}

export function changeRepeat(
  argv: readonly string[],
  given: Given,
  piping: Piping = inputIn,
  making: Making = runningIn
): Answer {
  const slug = argv[0]
  if (slug === undefined) return mistaking([NO_CHANGE])
  const piped = textFrom(piping)
  if ("why" in piped) return mistaking([piped.why])
  const read = readingIn(piped.text)
  if ("refused" in read) return mistaking([read.refused])
  const atMost = atMostIn(read.given[AT_MOST])
  if (typeof atMost === "string") return mistaking([atMost])
  if (atMost === null) return mistaking([NO_CEILING])
  const takes = takesAtMost(given.root, slug)
  if (takes === null) return mistaking([`\`${slug}\` names no change`])
  if (!takes) return mistaking([noBatching(slug)])
  const at = cliAt(given.root)
  if (at === null) return mistaking([NO_CLI])
  return repeating(making(given.root, at), slug, piped.text)
}
