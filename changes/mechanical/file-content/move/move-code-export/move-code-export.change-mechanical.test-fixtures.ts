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
