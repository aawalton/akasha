import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { exclusively } from "../../exclusive/exclusive.ts"

const PAGE_SUFFIX = ".md"

const UNCOMMITTED_SUFFIX = ".uncommitted.yaml"

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
    parsed = Bun.YAML.parse(raw)
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
  writeFileSync(scratch, Bun.YAML.stringify(values), "utf8")
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
