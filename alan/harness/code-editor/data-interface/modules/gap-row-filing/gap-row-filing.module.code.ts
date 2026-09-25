import { join } from "node:path"
import {
  type Gapped,
  gapsIn,
  gapsOn,
} from "akasha/alan/harness/code-editor/data-interface/modules/gap-tree-assemble/gap-tree-assemble.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { textOnDisk } from "akasha/file/system/modules/text-on-disk/text-on-disk.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageShaped, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { z } from "zod"

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

function filedIn(root: string): string | null {
  return textOnDisk(join(root, ROWS_AT))
}

export function gapCountIn(root: string): number {
  const was = filedIn(root)
  if (was === null) return gapsIn(root).length
  return was.split("\n").filter((line) => line !== "").length
}

const GAPPED: z.ZodType<Gapped> = z.object({
  at: z.string(),
  domain: z.string(),
  place: z.number(),
  said: z.string(),
})

function gappedLine(line: string): Gapped | null {
  try {
    return GAPPED.safeParse(JSON.parse(line)).data ?? null
  } catch {
    return null
  }
}

function heldIn(body: string): Map<string, Gapped[]> | null {
  const held = new Map<string, Gapped[]>()
  for (const line of body.split("\n")) {
    if (line === "") continue
    const one = gappedLine(line)
    if (one === null) return null
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

const UNSHAPED: Gapped = { at: "", domain: "", place: 0, said: "" }

export function gapRowsBodied(lines: readonly string[]): string {
  return lines
    .map((line) => ({ line, one: gappedLine(line) ?? UNSHAPED }))
    .sort((one, two) => byRow(one.one, two.one))
    .map((one) => `${one.line}\n`)
    .join("")
}

export function gapsKept(change: Change, reading: Reading): Kept {
  const was = filedIn(change.root)
  const filed = was === null ? null : heldIn(was)
  const found = filed === null ? gapsIn(reading) : patched(filed, change)
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
