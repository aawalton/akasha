import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { jsonEqual } from "akasha/code/type/narrowing/modules/json-equal/json-equal.module.code.ts"
import type { Reading } from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import {
  applied,
  memoryTold,
  type Over,
  overlaid,
} from "akasha/command/pages/story/turn/modules/turn-memory/turn-memory.module.code.ts"
import {
  loreBack,
  type Unplaying,
} from "akasha/command/pages/story/turn/modules/turn-unplaying/turn-unplaying.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"

type Refused = { readonly refused: string }

export type Remembered = {
  readonly texts: ReadonlyMap<string, string | null>
  readonly report: readonly string[]
}

export type Folding = (naming: Naming) => readonly Asking[] | Refused

export type Remembering = {
  readonly unplaying: Unplaying
  readonly telling: Reading
  readonly fold: Folding
}

function without(list: readonly Memory[], others: readonly Memory[]): readonly Memory[] {
  return list.filter((one) => !others.some((two) => jsonEqual(one, two)))
}

export function rememberedOn(
  reach: Remembering,
  old: readonly Memory[],
  now: readonly Memory[],
  others: readonly Memory[]
): Remembered | Refused {
  const dropped = without(old, now)
  const added = without(now, old)
  const over: Over = { texts: new Map(), listed: new Map() }
  const back = loreBack(reach.unplaying, dropped, [...others, ...now])
  if ("refused" in back) return back
  for (const at of back.removed) over.texts.set(at, null)
  for (const naming of back.namings) {
    const folded = reach.fold(naming)
    if ("refused" in folded) return folded
    for (const one of folded) applied(over, overlaid(reach.telling, over), one)
  }
  const told = memoryTold(added, overlaid(reach.telling, over))
  if ("refused" in told) return told
  for (const one of told) applied(over, overlaid(reach.telling, over), one)
  const telling = added.map((one) => `told\t${one.page}\t${one.fact}`)
  return { texts: over.texts, report: [...back.report, ...telling] }
}
