import type { Found, Linted } from "../../../code-system/code-lint/code-lint.module.code.ts"
import { lintedOver } from "../../../code-system/code-lint/code-lint.module.code.ts"
import { worldOf } from "../../../code-system/code-tests/code-tests.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"

const TS = ".ts"

const WORLD = "the world this change was stood up in"

const UNLOOKED = "A linter that could not look has verified nothing, so this change is not judged."

export function carriedIn(leaving: Leaving): readonly string[] {
  const held = new Set<string>()
  for (const one of leaving.changed) {
    if (!one.endsWith(TS)) continue
    if (leaving.at(one) === null) continue
    held.add(one)
  }
  return [...held].sort()
}

export function outsideOf(said: string, root: string): string {
  return said.replaceAll(`${root}/`, "").replaceAll(root, WORLD)
}

export function reasonOf(one: Found): string {
  return `\`${one.rule}\` at line ${one.line}, column ${one.column} — ${one.said}`
}

export function judgedOf(linted: Linted, first: string, root: string): readonly Judged[] {
  if (linted.failed !== null) {
    return [{ path: first, reason: `${outsideOf(linted.failed, root)}. ${UNLOOKED}` }]
  }
  return linted.found.map((one) => ({
    path: one.path,
    reason: outsideOf(reasonOf(one), root),
  }))
}

export function lintClean(leaving: Leaving): readonly Judged[] {
  const carried = carriedIn(leaving)
  const first = carried[0]
  if (first === undefined) return []
  const world = worldOf(leaving.root, carried, leaving.at)
  try {
    return judgedOf(lintedOver(world.root, carried), first, world.root)
  } finally {
    world.sweep()
  }
}
