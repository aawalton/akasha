import { join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { type Filed, filedIn, filedOf } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import { textOnDisk } from "akasha/file/system/modules/text-on-disk/text-on-disk.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageShaped, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { z } from "zod"

const ROWS_AT =
  "alan/harness/code-editor/data-interface/pages/domain-tree/" +
  "domain-tree.code-editor-data-interface.rows.uncommitted.jsonl"

export type Kept = {
  readonly rows: readonly Filed[]
  readonly edits: readonly FileChange[]
}

const FILED: z.ZodType<Filed> = z.object({
  path: z.string(),
  id: z.string(),
  parts: z.array(z.string()),
  champions: z.string().nullable(),
  drawn: z.boolean(),
})

function filedLine(line: string): Filed | null {
  try {
    return FILED.safeParse(JSON.parse(line)).data ?? null
  } catch {
    return null
  }
}

function heldIn(body: string): Map<string, Filed> | null {
  const held = new Map<string, Filed>()
  for (const line of body.split("\n")) {
    if (line === "") continue
    const one = filedLine(line)
    if (one === null) return null
    held.set(one.path, one)
  }
  return held
}

function byPath(one: Filed, two: Filed): number {
  return one.path < two.path ? -1 : one.path > two.path ? 1 : 0
}

export function domainRowsAt(): string {
  return ROWS_AT
}

const UNSHAPED: Filed = { path: "", id: "", parts: [], champions: null, drawn: false }

export function domainRowsBodied(lines: readonly string[]): string {
  return lines
    .map((line) => ({ line, one: filedLine(line) ?? UNSHAPED }))
    .sort((one, two) => byPath(one.one, two.one))
    .map((one) => `${one.line}\n`)
    .join("")
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
  const was = textOnDisk(join(change.root, ROWS_AT))
  const filed = was === null || afresh ? null : heldIn(was)
  const held = filed === null ? null : patched(filed, change)
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
