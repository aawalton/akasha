import type { WorkTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.code.ts"
import {
  type Holding,
  heldGone,
  heldWithout,
  intentLabelsIn,
} from "akasha/code/editor/extension/modules/work-tree-holding/work-tree-holding.module.code.ts"

export function rowOf(kind: WorkTreeRow["kind"], key: string, label: string): WorkTreeRow {
  return { kind, key, label, at: null, color: null, detail: null, note: null, children: [] }
}

export const TREE: readonly WorkTreeRow[] = [
  {
    ...rowOf("initiative", "held", "held"),
    children: [
      rowOf("intent", "held#1", "first"),
      rowOf("intent", "held#2", "second"),
      rowOf("intent", "held#3", "third"),
      rowOf("initiative", "below", "below"),
    ],
  },
  rowOf("initiative", "other", "other"),
]

export const GONE = heldGone(undefined)

export function holding(
  labels: readonly string[],
  without: readonly string[] = [],
  waiting = 1
): Holding {
  return { kind: "intents", labels, without, waiting }
}

export function colored(color: string, waiting = 1): Holding {
  return { kind: "color", color, seat: "amy", waiting }
}

export function fileOf(labels: readonly string[]): readonly WorkTreeRow[] {
  return [
    {
      ...rowOf("initiative", "held", "held"),
      children: labels.map((label, at) => rowOf("intent", `held#${String(at + 1)}`, label)),
    },
    rowOf("initiative", "other", "other"),
  ]
}

export function fileColored(color: string | null): readonly WorkTreeRow[] {
  return [{ ...rowOf("initiative", "held", "held"), color }, rowOf("initiative", "other", "other")]
}

export function deleting(
  holds: Map<string, Holding>,
  shown: readonly WorkTreeRow[],
  statement: string
): undefined {
  const left = heldWithout(holds.get("held"), intentLabelsIn(shown, "held"), statement)
  if (left !== null) holds.set("held", left)
  return undefined
}
