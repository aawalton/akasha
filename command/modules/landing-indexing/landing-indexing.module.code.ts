import { textIn, textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Keeping } from "akasha/command/modules/gate-building/gate-building.module.code.ts"
import type {
  Bodied,
  Settled,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"

export function reindexed(
  root: string,
  changed: readonly Bodied[],
  moves: readonly FileMove[],
  before: ReadonlyMap<string, Uint8Array | null>,
  keeping: Keeping
): undefined {
  const held = keeping(root)
  const named = new Set(changed.map((one) => one.path))
  for (const one of changed) {
    const was = textOf(one.body)
    const back = before.get(one.path) ?? null
    if (back === null) held.took(one.path, was)
    else held.wrote(one.path, textIn(back), was)
  }
  for (const one of moves) {
    const back = before.get(one.from) ?? null
    if (!named.has(one.to)) held.took(one.to, textOf(back))
    if (back !== null) held.wrote(one.from, textIn(back), null)
  }
  held.settle()
}

export function indexed(
  root: string,
  changed: readonly Bodied[],
  moves: readonly FileMove[],
  before: ReadonlyMap<string, Uint8Array | null>,
  keeping: Keeping,
  settled: Settled | null,
  base: string
): readonly string[] {
  const held = keeping(root, settled?.base === base ? settled.settling : null)
  const named = new Set(changed.map((one) => one.path))
  for (const one of changed) {
    const was = textOf(before.get(one.path) ?? null)
    if (one.body === null) held.took(one.path, was)
    else held.wrote(one.path, textIn(one.body), was)
  }
  for (const one of moves) {
    const body = before.get(one.from) ?? null
    held.took(one.from, textOf(body))
    if (named.has(one.to) || body === null) continue
    held.wrote(one.to, textIn(body), textOf(before.get(one.to) ?? null))
  }
  return held.settle()
}
