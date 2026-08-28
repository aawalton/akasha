import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { parse, stringify } from "yaml"
import { holdInCall, onceInCall } from "../../during-call/during-call.ts"
import { exclusively } from "../../exclusive/exclusive.ts"
import { isMissing } from "../../missing/missing.ts"

const PAGE_SUFFIX = ".md"

const UNCOMMITTED_SUFFIX = ".uncommitted.yaml"

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
