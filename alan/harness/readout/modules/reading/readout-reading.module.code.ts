import { existsSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  dropUncommitted,
  mergeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const READOUT = "readout"

export function readoutPage(root: string, slug: string): string {
  const listed = listedAt(root, READOUT, slug)[0]
  if (listed === undefined) {
    throw new Error(
      `no \`${READOUT}\` is slugged \`${slug}\`, so a reading taken for it would be kept nowhere`
    )
  }
  return listed.path
}

export const WENT_SILENT_AT = "wentSilentAt"

const LAST_VALUE = "lastValue"

const LAST_VALUE_AT = "lastValueAt"

const LAST_VALUE_FALLS_PER_HOUR = "lastValueFallsPerHour"

export const NOT_FALLING = 0

export type Reading = {
  readonly value: number
  readonly at: string
  readonly fallsPerHour: number
}

function fallsPerHourOn(values: Readonly<Record<string, unknown>>): number {
  const falls = values[LAST_VALUE_FALLS_PER_HOUR]
  return typeof falls === "number" && Number.isFinite(falls) ? falls : NOT_FALLING
}

function pageThere(root: string, page: string): undefined {
  if (existsSync(join(root, page))) return undefined
  throw new Error(
    `no page sits at \`${page}\`, so a reading kept there would be kept beside nothing`
  )
}

type Taken = Omit<Reading, "fallsPerHour"> & { readonly fallsPerHour?: number }

export function readingValues(taken: Taken): Record<string, unknown> {
  return {
    [LAST_VALUE]: taken.value,
    [LAST_VALUE_AT]: taken.at,
    ...(taken.fallsPerHour === undefined
      ? {}
      : { [LAST_VALUE_FALLS_PER_HOUR]: taken.fallsPerHour }),
  }
}

export function keepReading(
  root: string,
  page: string,
  value: number,
  at: Date,
  fallsPerHour?: number
): undefined {
  pageThere(root, page)
  mergeUncommitted(root, page, readingValues({ value, at: at.toISOString(), fallsPerHour }))
}

export function readingKept(root: string, page: string): Reading | null {
  const held = uncommittedIn(root, page)
  if (held === null) return null
  const value = held[LAST_VALUE]
  const at = held[LAST_VALUE_AT]
  if (value === undefined && at === undefined) return null
  if (typeof value !== "number" || typeof at !== "string") {
    throw new Error(
      `'${page}' sits beside a reading carrying only one of its two halves, so what it last ` +
        "read is unknown rather than nothing"
    )
  }
  return { value, at, fallsPerHour: fallsPerHourOn(held) }
}

export function readingOn(values: Readonly<Record<string, unknown>>): Reading | null {
  const value = values[LAST_VALUE]
  const at = values[LAST_VALUE_AT]
  if (typeof value !== "number" || typeof at !== "string") return null
  return { value, at, fallsPerHour: fallsPerHourOn(values) }
}

export function wentSilentAtOn(values: Readonly<Record<string, unknown>>): string | null {
  const held = values[WENT_SILENT_AT]
  return typeof held === "string" ? held : null
}

export function wentSilentAtKept(root: string, page: string): string | null {
  const held = uncommittedIn(root, page)
  return held === null ? null : wentSilentAtOn(held)
}

export function keepSilence(
  root: string,
  pages: readonly string[],
  silent: ReadonlySet<string>,
  at: Date
): readonly string[] {
  const wrote: string[] = []
  for (const page of pages) {
    const since = wentSilentAtKept(root, page)
    if (silent.has(page)) {
      if (since !== null) continue
      mergeUncommitted(root, page, { [WENT_SILENT_AT]: at.toISOString() })
      wrote.push(page)
      continue
    }
    if (since === null) continue
    dropUncommitted(root, page, [WENT_SILENT_AT])
    wrote.push(page)
  }
  return wrote
}
