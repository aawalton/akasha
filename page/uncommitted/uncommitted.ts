import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { parse, stringify } from "yaml"
import { holdInCall, onceInCall } from "../../during-call/during-call.ts"
import { exclusively } from "../../exclusive/exclusive.ts"
import { isMissing } from "../../missing/missing.ts"

const PAGE_SUFFIX = ".md"

const UNCOMMITTED_SUFFIX = ".uncommitted.yaml"

/**
 * Written so that any parser reads back what was written.
 *
 * A value like `3019009-26697286` is a string here, but written bare it is a plain scalar whose
 * type the reader resolves, and some YAML readers resolve it to the number 3019009 — truncating
 * at the hyphen. What survives is not a broken value but a plausible one: a well-formed record
 * naming a process nobody can find. Quoting every string settles its type on disk rather than
 * leaving it to whoever parses next.
 *
 * NUMBERS ARE LEFT ALONE, because a reader that wants a port wants a number and refuses a string.
 *
 * NOTHING IS WRAPPED, so a long value stays on the one line it was written as.
 */
const STRINGIFY_OPTIONS = {
  defaultStringType: "QUOTE_DOUBLE",
  defaultKeyType: "PLAIN",
  lineWidth: 0,
} as const

export function uncommittedPathFor(pagePath: string): string {
  if (!pagePath.endsWith(PAGE_SUFFIX)) {
    throw new Error(`an uncommitted file stands beside a page, and '${pagePath}' is not one`)
  }
  return `${pagePath.slice(0, -PAGE_SUFFIX.length)}${UNCOMMITTED_SUFFIX}`
}

function heldUnder(pagePath: string): string {
  return `uncommitted:${uncommittedPathFor(pagePath)}`
}

/**
 * NULL MEANS NO UNCOMMITTED FILE STANDS BESIDE THIS PAGE, and only that.
 *
 * The reason to be strict here is what the callers below do with the null. `patchUncommitted` reads
 * the file, spreads its keys under the ones being set, and writes the whole file back. On a `?? {}`
 * every key already standing there is dropped, and the write reports done. So a file that could not
 * be opened, or whose YAML no longer parses, would not merely fail to be read — the next patch
 * would silently rewrite it down to the handful of keys that patch carried, and the state a
 * supervisor was keeping for a reader elsewhere would be gone with nothing saying so.
 *
 * A file that is not there is the one true empty: the page simply has no uncommitted state yet, and
 * writing the whole file is right. Every other case raises, and the caller decides.
 */
function readUncommittedNow(pagePath: string): Record<string, unknown> | null {
  const path = uncommittedPathFor(pagePath)
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch (thrown) {
    if (isMissing(thrown)) return null
    throw thrown
  }
  let parsed: unknown
  try {
    parsed = parse(raw)
  } catch (thrown) {
    throw new Error(
      `'${path}' stands beside a page but its YAML cannot be parsed, so what it holds is unknown rather than nothing: ${String(thrown)}`
    )
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error(
      `'${path}' parses to ${Array.isArray(parsed) ? "a list" : typeof parsed}, and an uncommitted file is a mapping of keys, so what it holds is unknown rather than nothing`
    )
  }
  return parsed as Record<string, unknown>
}

/**
 * What stands beside a page, read once per call rather than once per key asked of it.
 *
 * ASKING FOR SIX KEYS PARSED THE FILE SIX TIMES. A caller reads one value at a time, so reading one
 * seat's turn state re-read and re-parsed the same YAML for every key, and a fleet colour read paid
 * 78 parses to answer 13 questions.
 *
 * NOTHING IS HELD OUTSIDE A CALL, which is what keeps this honest across processes. The file is a
 * channel between processes — a supervisor writes what a reader elsewhere is waiting to see — so a
 * hold that outlived one call would show a reader a state the writer had already left. A long-lived
 * process that opens no call goes to disk every time, as it did before.
 */
export function readUncommitted(pagePath: string): Record<string, unknown> | null {
  return onceInCall(heldUnder(pagePath), () => readUncommittedNow(pagePath))
}

export function writeUncommitted(pagePath: string, values: Record<string, unknown>): void {
  const path = uncommittedPathFor(pagePath)
  mkdirSync(dirname(path), { recursive: true })
  const scratch = `${path}.${process.pid}.part`
  writeFileSync(scratch, stringify(values, STRINGIFY_OPTIONS), "utf8")
  renameSync(scratch, path)
  holdInCall(heldUnder(pagePath), values)
}

export function patchUncommitted(pagePath: string, values: Record<string, unknown>): void {
  exclusively(uncommittedPathFor(pagePath), () => {
    writeUncommitted(pagePath, { ...(readUncommittedNow(pagePath) ?? {}), ...values })
  })
}

export function patchUncommittedUnder(
  pagePath: string,
  key: string,
  values: Record<string, unknown>
): void {
  exclusively(uncommittedPathFor(pagePath), () => {
    const held = readUncommittedNow(pagePath) ?? {}
    const standing = held[key]
    const under =
      typeof standing === "object" && standing !== null && !Array.isArray(standing)
        ? (standing as Record<string, unknown>)
        : {}
    writeUncommitted(pagePath, { ...held, [key]: { ...under, ...values } })
  })
}

export function removeUncommitted(pagePath: string): void {
  rmSync(uncommittedPathFor(pagePath), { force: true })
  holdInCall<Record<string, unknown> | null>(heldUnder(pagePath), null)
}
