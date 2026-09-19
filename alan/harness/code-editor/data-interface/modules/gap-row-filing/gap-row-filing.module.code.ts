import {
  type Gapped,
  gapsIn,
  gapsOn,
} from "akasha/alan/harness/code-editor/data-interface/modules/gap-tree-assemble/gap-tree-assemble.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { diskAt } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageShaped, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"

const ROWS_AT =
  "alan/harness/code-editor/data-interface/pages/gap-tree/" +
  "gap-tree.code-editor-data-interface.rows.uncommitted.jsonl"

export type Kept = {
  readonly gaps: readonly Gapped[]
  readonly edits: readonly FileChange[]
}

export function gapRowsAt(): string {
  return ROWS_AT
}

function heldIn(body: string): Map<string, Gapped[]> {
  const held = new Map<string, Gapped[]>()
  for (const line of body.split("\n")) {
    if (line === "") continue
    const one = JSON.parse(line) as Gapped
    const said = held.get(one.at)
    if (said === undefined) held.set(one.at, [one])
    else said.push(one)
  }
  return held
}

function patched(held: Map<string, Gapped[]>, change: Change): readonly Gapped[] {
  for (const path of change.changed) {
    if (!pageShaped(path)) continue
    const parted = partedIn(path)
    if (parted === null || parted.sections.length > 0) continue
    const body = textOf(change.after(path))
    const value = body === null ? null : valueIn(body)
    const said = value === null ? [] : [...gapsOn(path, value)]
    if (said.length === 0) held.delete(path)
    else held.set(path, said)
  }
  return [...held.values()].flat()
}

function byRow(one: Gapped, two: Gapped): number {
  if (one.at !== two.at) return one.at < two.at ? -1 : 1
  return one.place - two.place
}

export function gapsKept(change: Change, reading: Reading): Kept {
  const was = textOf(diskAt(change.root, ROWS_AT))
  const found = was === null ? gapsIn(reading) : patched(heldIn(was), change)
  const gaps = [...found].sort(byRow)
  const body = gaps.map((one) => `${JSON.stringify(one)}\n`).join("")
  if ((was ?? "") === body) return { gaps, edits: [] }
  return {
    gaps,
    edits: [
      was === null
        ? { kind: "add", path: ROWS_AT, content: body }
        : { kind: "replace", path: ROWS_AT, contentFrom: was, contentTo: body },
    ],
  }
}
