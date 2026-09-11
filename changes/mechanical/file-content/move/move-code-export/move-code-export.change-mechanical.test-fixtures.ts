import { runChange as changeFileContent } from "akasha/changes/mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export const FROM = "akasha/one/one.held.ts"

export const TO = "akasha/one/two.held.ts"

export const USES = "akasha/one/uses.held.ts"

export const FAR = "akasha/one/deeper/far.held.ts"

export const ELSEWHERE = "akasha/two/two.held.ts"

export const NAMED_AT = "akasha/one/package.json"

export const NAMED = `{
  "name": "@held/one",
  "exports": { "./one": "./one.held.ts" }
}
`

export const ROOT_AT = "package.json"

export const ROOT = `{
  "name": "tree",
  "exports": { "./*": "./*" }
}
`

export const DEEP = `import type { Deep } from "./deep.held.ts"`

export const HELD = `${DEEP}

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly name: string
}
`

export const SHARED = `${DEEP}

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly deep: Deep
}
`

export const STILL = `${DEEP}

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly kept: Kept
}
`

export const LANDED = `${DEEP}

export type Kept = {
  readonly deep: Deep
}
`

export const LANDED_FAR = `import type { Deep } from "../one/deep.held.ts"

export type Kept = {
  readonly deep: Deep
}
`

export const TAKEN = `

export type Kept = {
  readonly deep: Deep
}`

export const BACK_ALREADY = `import type { Deep } from "./two.held.ts"

export function keptOf(one: Deep): Deep {
  return one
}

export function alsoOf(one: Deep): Deep {
  return keptOf(one)
}
`

export const USING = `import type { Kept } from "./one.held.ts"

export type Wraps = {
  readonly kept: Kept
}
`

export const FAR_USING = `import type { Kept } from "../one.held.ts"

export type Holds = {
  readonly kept: Kept
}
`

export const VALUED = `import { join } from "node:path"

export const AT = join("a", "b")

export type Other = {
  readonly name: string
}
`

export const TWO_CARRIED = `import { dirname, join } from "node:path"

export const AT = join(dirname("a"), "b")

export const KEPT = dirname("c")
`

export const OTHER_PATH = `import { dirname } from "node:path"

export const OTHER = dirname("x")
`

export const VALUE_USING = `import { AT } from "./one.held.ts"

export const held = AT
`

export const VALUE_LANDED = `import { join } from "node:path"

export const AT = join("a", "b")
`

export const FUNCTIONED = `import { join } from "node:path"

export function at(one: string): string {
  return join(one, "b")
}
`

export const SIBLING = `export function childOf(one: number): number {
  return one
}

export function searchOf(one: number): number {
  return childOf(one)
}
`

export const SIBLING_LANDED = `import { childOf } from "./one.held.ts"

export function searchOf(one: number): number {
  return childOf(one)
}
`

export const SIBLING_BACK = `${SIBLING}
export const FIRST = searchOf(1)
`

export const ALREADY = `import { join } from "node:path"

export const OTHER = join("x", "y")
`

export const BARE = `export const OTHER = 1
`

export const CLASHES = `import { join } from "./other.held.ts"

export const OTHER = join("x", "y")
`

export const IMPORTS_IT = `import { AT } from "./one.held.ts"

export const OTHER = AT
`

export const OWN_USING = `import type { Reached } from "../two/two.held.ts"

export function reaches(): Reached {
  return { absent: true }
}
`

export const NAMES_LANDING = `import { childOf } from "tree/${TO}"

export function searchOf(one: number): number {
  return childOf(one)
}
`

export const PRIVATE = `function bodiedOf(one: string): string {
  return one
}

export function changeOf(one: string): string {
  return bodiedOf(one)
}
`

type Passage = { at: string; old: string; new: string }

type Adding = { at: string; body: string }

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/change-file-content") {
    return Promise.resolve(changeFileContent(world, given as Passage))
  }
  if (at === "change-mechanical/add-file-code") {
    const asked = given as Adding
    return Promise.resolve(stating([{ kind: "add", path: asked.at, content: asked.body }]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function indexOf(importers: readonly string[]): World["index"] {
  return {
    importersOf: () => importers,
    fileKeysAt: () => new Map(),
    manifestsBeside: () => [NAMED_AT, ROOT_AT],
  } as never
}

export function worldOf(
  held: Readonly<Record<string, string>>,
  importers: readonly string[] = []
): World {
  return {
    root: "/nowhere",
    index: indexOf(importers),
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: RUNS,
  }
}

export function addedAt(said: Answer, path: string): string {
  const found = said.edits.flatMap((one) => (one.kind === "add" && one.path === path ? [one] : []))
  return found[0]?.content ?? ""
}

export function puttingAt(said: Answer, path: string): readonly string[] {
  return said.edits.flatMap((one) =>
    one.kind === "replace" && one.path === path ? [one.contentTo] : []
  )
}

export function takenAt(said: Answer, path: string): readonly string[] {
  return said.edits.flatMap((one) =>
    one.kind === "replace" && one.path === path ? [one.contentFrom] : []
  )
}
