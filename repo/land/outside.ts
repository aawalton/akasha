import { existsSync, rmSync, statSync } from "node:fs"
import { resolve } from "node:path"
import { fail } from "../../patches/patch.ts"
import {
  byteCount,
  byteSize,
  LandingRefused,
  MISSING,
  put,
  recordOwnWrite,
  type SizeChange,
  sizeLines,
} from "./land.ts"

export interface Loose {
  readonly absolute: string
  readonly body: string | Uint8Array
}

export function landOutside(entries: readonly Loose[], dryRun: boolean): void {
  const sizes: readonly SizeChange[] = entries.map((entry) => ({
    relPath: entry.absolute,
    before: byteSize(entry.absolute),
    after: byteCount(entry.body),
  }))
  if (dryRun) {
    process.stdout.write(
      [
        `write:  dry-run — ${entries.length} file(s) would be written outside every repo`,
        ...sizeLines(sizes),
      ].join("\n") + "\n"
    )
    return
  }
  for (const entry of entries) {
    try {
      put(entry.absolute, entry.body)
    } catch (err) {
      throw new LandingRefused(
        `could not write ${entry.absolute}: ${err instanceof Error ? err.message : String(err)}`
      )
    }
    recordOwnWrite(entry.absolute, entry.body)
  }
  process.stdout.write(
    [
      `write:  ${entries.length} file(s) written outside every repo`,
      ...sizeLines(sizes),
      "commit: none — no repo holds these paths, so nothing carries their history",
    ].join("\n") + "\n"
  )
}

export function removeOutside(named: readonly string[], dryRun: boolean): void {
  const absolutes = named.map((one) => resolve(process.cwd(), one))
  if (new Set(absolutes).size !== absolutes.length) fail("a path is declared more than once")
  const refusals: string[] = []
  for (const absolute of absolutes) {
    if (!existsSync(absolute)) {
      refusals.push(`${absolute} ${MISSING}`)
      continue
    }
    if (!statSync(absolute).isFile()) {
      refusals.push(
        `${absolute} is a directory no repo holds, so nothing says which files under it would go — ` +
          "name them"
      )
    }
  }
  if (refusals.length > 0) fail(refusals.join("\n       "))
  const sizes: readonly SizeChange[] = absolutes.map((absolute) => ({
    relPath: absolute,
    before: statSync(absolute).size,
    after: null,
  }))
  if (dryRun) {
    process.stdout.write(
      [
        `write:  dry-run — ${absolutes.length} file(s) would be removed outside every repo`,
        ...sizeLines(sizes),
      ].join("\n") + "\n"
    )
    return
  }
  for (const absolute of absolutes) rmSync(absolute)
  process.stdout.write(
    [
      `write:  ${absolutes.length} file(s) removed outside every repo`,
      ...sizeLines(sizes),
      "commit: none — no repo holds these paths, so nothing carries their history",
    ].join("\n") + "\n"
  )
}
