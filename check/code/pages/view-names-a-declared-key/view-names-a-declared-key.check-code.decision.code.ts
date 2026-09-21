import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  headOf,
  type Keying,
  listedBy,
  viewKeying,
  viewKinds,
} from "akasha/page/view/modules/key-naming/key-naming.module.code.ts"

export type Viewing = {
  readonly path: string
  readonly value: Value
}

export type Naming = {
  readonly key: string
  readonly at: string
}

export function viewsIn(shadow: Shadow): readonly Viewing[] {
  const found: Viewing[] = []
  for (const kind of viewKinds(shadow.index)) {
    for (const one of shadow.index.everyOfType(kind)) {
      const value = shadow.pageOf(one.path)
      if (value !== null) found.push({ path: one.path, value })
    }
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}

function recordIn(held: unknown): Value | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return held as Value
}

function namingsAt(key: string, held: unknown, found: Naming[]): undefined {
  if (typeof held === "string") {
    found.push({ key: held, at: key })
    return
  }
  if (!Array.isArray(held)) return
  held.forEach((each, at) => {
    if (typeof each === "string") found.push({ key: each, at: `${key}[${at}]` })
  })
}

function namingsWithin(key: string, within: string, held: unknown, found: Naming[]): undefined {
  if (!Array.isArray(held)) return
  held.forEach((each, at) => {
    const record = recordIn(each)
    const said = record === null ? undefined : record[within]
    if (typeof said === "string") found.push({ key: said, at: `${key}[${at}].${within}` })
  })
}

export function namingsIn(value: Value, keying: readonly Keying[]): readonly Naming[] {
  const found: Naming[] = []
  for (const one of keying) {
    const within = one.within
    const held = value[one.key]
    if (within === null) namingsAt(one.key, held, found)
    else namingsWithin(one.key, within, held, found)
  }
  return found
}

function keysOf(shadow: Shadow, pageTypeSlug: string): ReadonlySet<string> | null {
  const carried = shadow.index.propertiesIfNamed(pageTypeSlug)
  return carried === null ? null : new Set(carried.map((one) => one.propertySlug))
}

function undeclared(at: string, key: string, listed: string, keys: ReadonlySet<string>): string {
  return (
    `names \`${key}\` at \`${at}\`, and the \`${listed}\` page type declares no such key` +
    ` — the keys are ${[...keys].sort().join(", ")}`
  )
}

export function refusalsOver(held: readonly Viewing[], shadow: Shadow): readonly Judged[] {
  const keying = viewKeying(shadow.index)
  if (keying.length === 0) return []
  const known = new Map<string, ReadonlySet<string> | null>()
  const said: Judged[] = []
  for (const one of held) {
    const listed = listedBy(one.value)
    if (listed === null) continue
    if (!known.has(listed)) known.set(listed, keysOf(shadow, listed))
    const keys = known.get(listed) ?? null
    if (keys === null) continue
    for (const naming of namingsIn(one.value, keying)) {
      const key = headOf(naming.key)
      if (keys.has(key)) continue
      said.push({ path: one.path, reason: undeclared(naming.at, key, listed, keys) })
    }
  }
  return said
}
