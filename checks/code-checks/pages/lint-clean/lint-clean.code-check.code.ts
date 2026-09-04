import type { Found, Linted } from "@akasha/code-system/code-lint"
import { lintedOver } from "@akasha/code-system/code-lint"
import { worldOf } from "@akasha/code-system/code-tests"
import type { Change } from "@akasha/pages-system/change"
import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, input } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const READ: readonly string[] = [".ts", ".tsx", ".css"]

const WORLD = "the world this change was stood up in"

const UNLOOKED = "A linter that could not look has verified nothing, so this change is not judged."

export function lookedAt(path: string): boolean {
  return READ.some((one) => path.endsWith(one))
}

const LOOKED: Selector<Body> = {
  named: "the files the linter reads",
  isInput: (path) => lookedAt(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => lookedAt(one.path)),
}

export function carriedIn(change: Change): readonly string[] {
  const held = new Set<string>()
  for (const one of change.changed) {
    if (!lookedAt(one)) continue
    if (change.after(one) === null) continue
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

function refusalsIn(change: Change): readonly Judged[] {
  const carried = carriedIn(change)
  const first = carried[0]
  if (first === undefined) return []
  const world = worldOf(change.root, carried, change.after, null)
  try {
    return judgedOf(lintedOver(world.root, carried), first, world.root)
  } finally {
    world.sweep()
  }
}

export const lintClean = input(LOOKED, refusalsIn)
