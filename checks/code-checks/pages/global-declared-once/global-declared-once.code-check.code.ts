import { compiled } from "@akasha/code/code-typing"
import type { Change } from "@akasha/pages/change"
import { besideAt } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, input, textIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  clashesIn,
  DECLARED,
  judgedOf,
  SPELT,
} from "./global-declared-once.code-check.decision.code.ts"

const AMBIENT = "ambient-types"

const AMBIENT_KEY = "d"

const AMBIENT_KIND = "ts"

function declaringIn(shadow: Shadow): readonly string[] | null {
  const carried = shadow.index.carryingOf(AMBIENT)
  if ("refused" in carried) return null
  const found: string[] = []
  for (const one of carried.carrying) {
    const beside = besideAt(one.path, AMBIENT_KEY, AMBIENT_KIND)
    if (beside !== null) found.push(beside)
  }
  return found
}

function declaringAmong(changed: readonly string[]): boolean {
  return changed.some((one) => one.endsWith(DECLARED))
}

function carryingIn(change: Change): boolean {
  if (declaringAmong(change.changed)) return true
  for (const path of change.changed) {
    if (!compiled(path)) continue
    const text = textIn(change, path)
    if (text?.includes(SPELT)) return true
  }
  return false
}

export function readingIn(change: Change, shadow: Shadow): readonly string[] {
  const narrow = declaringAmong(change.changed) ? null : declaringIn(shadow)
  const reach = narrow ?? shadow.index.everyPath()
  const held = new Set<string>()
  for (const one of [...reach, ...change.changed]) {
    if (compiled(one) && change.after(one) !== null) held.add(one)
  }
  return [...held].sort()
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  if (!carryingIn(change)) return []
  const clashes = clashesIn(readingIn(change, shadow), (path) => textIn(change, path))
  const carried = new Set(change.changed)
  const found = clashes.filter(({ one, held }) => carried.has(one.path) || carried.has(held.path))
  return judgedOf(found)
}

const GLOBALS: Selector<Body> = {
  named: "the TypeScript akasha compiles",
  isInput: (path) => compiled(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => compiled(one.path)),
}

export const globalDeclaredOnce = input(GLOBALS, refusalsIn)
