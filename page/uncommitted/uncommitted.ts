import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { parse, stringify } from "yaml"
import { exclusively } from "../../exclusive/exclusive.ts"

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

export function readUncommitted(pagePath: string): Record<string, unknown> | null {
  let raw: string
  try {
    raw = readFileSync(uncommittedPathFor(pagePath), "utf8")
  } catch {
    return null
  }
  let parsed: unknown
  try {
    parsed = parse(raw)
  } catch {
    return null
  }
  return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : null
}

export function writeUncommitted(pagePath: string, values: Record<string, unknown>): void {
  const path = uncommittedPathFor(pagePath)
  mkdirSync(dirname(path), { recursive: true })
  const scratch = `${path}.${process.pid}.part`
  writeFileSync(scratch, stringify(values, STRINGIFY_OPTIONS), "utf8")
  renameSync(scratch, path)
}

export function patchUncommitted(pagePath: string, values: Record<string, unknown>): void {
  exclusively(uncommittedPathFor(pagePath), () => {
    writeUncommitted(pagePath, { ...(readUncommitted(pagePath) ?? {}), ...values })
  })
}

export function patchUncommittedUnder(
  pagePath: string,
  key: string,
  values: Record<string, unknown>
): void {
  exclusively(uncommittedPathFor(pagePath), () => {
    const held = readUncommitted(pagePath) ?? {}
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
}