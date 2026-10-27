import { expect, test } from "bun:test"
import type { WorkTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.code.ts"
import { activeOnly } from "akasha/code/editor/extension/modules/work-tree-reading/work-tree-reading.module.code.ts"

function row(
  kind: WorkTreeRow["kind"],
  key: string,
  color: string | null,
  children: readonly WorkTreeRow[] = []
): WorkTreeRow {
  return { kind, key, label: key, at: null, color, detail: null, note: null, children }
}

function keysOf(rows: readonly WorkTreeRow[]): readonly string[] {
  return rows.flatMap((one) => [one.key, ...keysOf(one.children)])
}

test("showing only the active initiatives shows an initiative colored as an active seat", () => {
  const roots = [
    row("root", "top", null, [
      row("initiative", "blue", "blue"),
      row("initiative", "green", "green"),
      row("initiative", "purple", "purple"),
      row("initiative", "red", "red"),
      row("initiative", "none", null),
    ]),
  ]
  expect(keysOf(activeOnly(roots))).toEqual(["top", "blue", "green", "purple"])
})

test("an initiative not active is shown where an active initiative hangs under it", () => {
  const roots = [
    row("root", "top", null, [
      row("initiative", "above", null, [
        row("intent", "above#1", null),
        row("initiative", "below", "green"),
      ]),
    ]),
  ]
  expect(keysOf(activeOnly(roots))).toEqual(["top", "above", "above#1", "below"])
})

test("an initiative shown keeps its intents", () => {
  const roots = [
    row("root", "top", null, [
      row("initiative", "one", "blue", [
        row("intent", "one#1", null),
        row("intent", "one#2", null),
      ]),
    ]),
  ]
  expect(keysOf(activeOnly(roots))).toEqual(["top", "one", "one#1", "one#2"])
})

test("a top row left with no initiative shown is not drawn", () => {
  const roots = [row("root", "top", null, [row("initiative", "idle", null)])]
  expect(activeOnly(roots)).toEqual([])
})
