import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { diskAt } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { type Filed, filedIn, filedOf } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageShaped, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"

const ROWS_AT =
  "alan/harness/code-editor/data-interface/pages/domain-tree/" +
  "domain-tree.code-editor-data-interface.rows.uncommitted.jsonl"

export type Kept = {
  readonly rows: readonly Filed[]
  readonly edits: readonly FileChange[]
}

export function rowsAt(): string {
  return ROWS_AT
}

function heldIn(body: string): Map<string, Filed> {
  const held = new Map<string, Filed>()
  for (const line of body.split("\n")) {
    if (line === "") continue
    const one = JSON.parse(line) as Filed
    held.set(one.path, one)
  }
  return held
}

function byPath(one: Filed, two: Filed): number {
  return one.path < two.path ? -1 : one.path > two.path ? 1 : 0
}

function bodyOf(rows: readonly Filed[]): string {
  return [...rows]
    .sort(byPath)
    .map((one) => `${JSON.stringify(one)}\n`)
    .join("")
}

function drawnByKind(held: ReadonlyMap<string, Filed>): ReadonlyMap<string, boolean> {
  const kinds = new Map<string, boolean>()
  for (const one of held.values()) {
    const parted = partedIn(one.path)
    if (parted === null) continue
    if (one.drawn || !kinds.has(parted.pageType)) kinds.set(parted.pageType, one.drawn)
  }
  return kinds
}

function patched(held: ReadonlyMap<string, Filed>, change: Change): readonly Filed[] | null {
  const kinds = drawnByKind(held)
  const made = new Map(held)
  for (const path of change.changed) {
    if (!pageShaped(path)) continue
    const parted = partedIn(path)
    if (parted === null) continue
    const drawn = kinds.get(parted.pageType)
    if (drawn === undefined) return null
    const body = textOf(change.after(path))
    const value = body === null ? null : valueIn(body)
    const one = value === null ? null : filedOf(path, value, drawn)
    if (one === null) made.delete(path)
    else made.set(path, one)
  }
  return [...made.values()]
}

export function keptFor(change: Change, reading: Reading, afresh: boolean): Kept {
  const was = textOf(diskAt(change.root, ROWS_AT))
  const held = was === null || afresh ? null : patched(heldIn(was), change)
  const rows = held ?? filedIn(reading)
  const body = bodyOf(rows)
  if ((was ?? "") === body) return { rows, edits: [] }
  return {
    rows,
    edits: [
      was === null
        ? { kind: "add", path: ROWS_AT, content: body }
        : { kind: "replace", path: ROWS_AT, contentFrom: was, contentTo: body },
    ],
  }
}
