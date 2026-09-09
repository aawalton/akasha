import type { Adding, Replacing } from "@akasha/changes/change-answer/types"
import { formattedBody } from "@akasha/code/code-format"
import type { Change } from "@akasha/pages/change"
import { mappedFor } from "../address-mapping/address-mapping.module.code.ts"
import { unexportableIn } from "../export-naming/export-naming.module.code.ts"
import type { FileEdit, Refused } from "../landing/landing.module.code.ts"
import { changeOf } from "../landing/landing.module.code.ts"
import { lockingFor } from "../manifest-locking/manifest-locking.module.code.ts"
import type { FileMove } from "../path-moving/path-moving.module.code.ts"
import { globbedFor } from "../source-globbing/source-globbing.module.code.ts"
import { steppedFor } from "../spacing-stepping/spacing-stepping.module.code.ts"
import { workedFor } from "../worked-typing/worked-typing.module.code.ts"

export type Formatting = {
  readonly changes: readonly FileEdit[]
  readonly formatted: readonly string[]
}

export function formattingIn(root: string, changes: readonly FileEdit[]): Formatting {
  const held: FileEdit[] = []
  const formatted: string[] = []
  for (const one of changes) {
    if (one.body === null) {
      held.push(one)
      continue
    }
    const said = formattedBody(root, one.path, one.body)
    if (!said.changed) {
      held.push(one)
      continue
    }
    held.push({ ...one, body: said.body })
    formatted.push(one.path)
  }
  return { changes: held, formatted }
}

const BYTES = new TextEncoder()

function bodiedFrom(rows: readonly (Adding | Replacing)[]): readonly FileEdit[] {
  return rows.map((one) => ({
    path: one.path,
    body: BYTES.encode(one.kind === "add" ? one.content : one.contentTo),
  }))
}

export type Prepared = {
  readonly formatting: Formatting
  readonly changes: readonly FileEdit[]
  readonly said: readonly string[]
  readonly over: Change | null
}

export function preparing(
  root: string,
  base: string,
  changes: readonly FileEdit[],
  moves: readonly FileMove[] = []
): Prepared | Refused {
  const formatting = formattingIn(root, changes)
  const unexportable = unexportableIn(formatting.changes)
  if (unexportable.length > 0) return { refusals: unexportable }
  const locking = lockingFor(root, base, formatting.changes, moves)
  const change = changeOf(root, { base, edits: formatting.changes, moves })
  const worked = workedFor(change)
  const mapped = mappedFor(change)
  const stepped = steppedFor(change)
  const globbed = globbedFor(change)
  const added = [
    ...locking.edits,
    ...worked.edits,
    ...mapped.edits,
    ...bodiedFrom(stepped.edits),
    ...globbed.edits,
  ]
  return {
    formatting,
    changes: added.length === 0 ? formatting.changes : [...formatting.changes, ...added],
    said: [...locking.said, ...worked.said, ...mapped.said, ...stepped.said, ...globbed.said],
    over: added.length === 0 ? change : null,
  }
}
