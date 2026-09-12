import { leftAt } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Adding,
  FileChange,
  Moving,
  Replacing,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { textIn } from "akasha/code/body-text/body-text.module.code.ts"
import { formattedBody } from "akasha/code/format/code-format.module.code.ts"
import { unexportableIn } from "akasha/commands/modules/export-naming/export-naming.module.code.ts"
import { bodiesFor } from "akasha/commands/modules/group-writing/group-writing.module.code.ts"
import type { Refused } from "akasha/commands/modules/landing/landing.module.code.ts"
import { changeOf } from "akasha/commands/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { lockingFor } from "akasha/commands/modules/manifest-locking/manifest-locking.module.code.ts"
import type { FileMove } from "akasha/commands/modules/path-moving/path-moving.module.code.ts"
import { globbedFor } from "akasha/commands/modules/source-globbing/source-globbing.module.code.ts"
import { steppedFor } from "akasha/commands/modules/spacing-stepping/spacing-stepping.module.code.ts"
import { typesFor } from "akasha/commands/modules/type-generating/type-generating.module.code.ts"
import { bodyAt } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"

export type Formatting = {
  readonly edits: readonly Replacing[]
  readonly formatted: readonly string[]
}

const BYTES = new TextEncoder()

const FATAL = new TextDecoder("utf-8", { fatal: true })

export const NO_TEXT =
  "spells no text, so its body is edited by nothing; a move or a removal takes it"

function textFrom(bytes: Uint8Array): string | null {
  try {
    return FATAL.decode(bytes)
  } catch {
    return null
  }
}

export function bodyIn(one: Adding | Replacing): string {
  return one.kind === "add" ? one.content : one.contentTo
}

export function bodied(one: FileChange): one is Adding | Replacing {
  return one.kind === "add" || one.kind === "replace"
}

export type Stated = { readonly rows: readonly FileChange[] } | { readonly why: string }

export function rowsFrom(root: string, base: string, changes: readonly FileChange[]): Stated {
  const rows: FileChange[] = []
  for (const one of changes) {
    if (!bodied(one)) {
      rows.push(one)
      continue
    }
    const body = bodyIn(one)
    const held = bodyAt(root, base, one.path)
    if (held === null) {
      rows.push({ kind: "add", path: one.path, content: body })
      continue
    }
    const was = textFrom(held)
    if (was === null) return { why: `${one.path} ${NO_TEXT}` }
    if (was === body) continue
    rows.push({ kind: "replace", path: one.path, contentFrom: was, contentTo: body })
  }
  return { rows }
}

export function formattingIn(
  root: string,
  changes: readonly FileChange[],
  already: ReadonlySet<string> = new Set()
): Formatting {
  const edits: Replacing[] = []
  const formatted: string[] = []
  for (const one of changes) {
    if (!bodied(one)) continue
    if (already.has(one.path)) continue
    const body = BYTES.encode(bodyIn(one))
    const said = formattedBody(root, one.path, body)
    if (!said.changed) continue
    edits.push({
      kind: "replace",
      path: one.path,
      contentFrom: textIn(body),
      contentTo: textIn(said.body),
    })
    formatted.push(one.path)
  }
  return { edits, formatted }
}

function foldedOver(...runs: readonly (readonly FileChange[])[]): readonly FileChange[] {
  const held = new Map<string, FileChange>()
  const ended: FileChange[] = []
  for (const run of runs) {
    for (const one of run) {
      if (one.kind === "append") ended.push(one)
      else held.set(leftAt(one), one)
    }
  }
  return [...held.values(), ...ended]
}

export function sequenced(
  changes: readonly FileChange[],
  rows: readonly (Adding | Replacing)[]
): readonly FileChange[] {
  return rows.length === 0 ? changes : foldedOver(changes, rows)
}

export type Prepared = {
  readonly formatting: Formatting
  readonly authored: readonly FileChange[]
  readonly changes: readonly FileChange[]
  readonly said: readonly string[]
  readonly over: Change | null
}

export function preparing(
  root: string,
  base: string,
  changes: readonly FileChange[],
  moves: readonly FileMove[] = [],
  already: ReadonlySet<string> = new Set()
): Prepared | Refused {
  const formatting = formattingIn(root, changes, already)
  const folded = foldedOver(changes, formatting.edits)
  const stated = rowsFrom(root, base, folded)
  if ("why" in stated) return { refusals: [stated.why] }
  const moved: readonly Moving[] = moves.map((one) => ({
    kind: "move",
    pathFrom: one.from,
    pathTo: one.to,
  }))
  const rows = [...moved, ...stated.rows]
  const unexportable = unexportableIn(rows)
  if (unexportable.length > 0) return { refusals: unexportable }
  const locking = lockingFor(root, base, rows)
  const change = changeOf(root, base, rows)
  const stepped = steppedFor(change)
  const globbed = globbedFor(change)
  const typed = typesFor(change)
  const written = bodiesFor(change)
  const added = [
    ...locking.edits,
    ...stepped.edits,
    ...globbed.edits,
    ...typed.edits,
    ...written.edits,
  ]
  return {
    formatting,
    authored: rows,
    changes: [...rows, ...added],
    said: [...locking.said, ...stepped.said, ...globbed.said, ...typed.said, ...written.said],
    over: added.length === 0 ? change : null,
  }
}
