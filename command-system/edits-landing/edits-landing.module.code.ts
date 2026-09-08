import { formattedBody } from "@akasha/code/code-format"
import { notText, replayed } from "../../changes/modules/change-answer/change-answer.module.code.ts"
import type { Answer as Said } from "../../changes/modules/change-answer/change-answer.module.types.ts"
import { bytesOf } from "../../changes/modules/change-shadow/change-shadow.module.code.ts"
import { bodyIn } from "../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Bodies, Body } from "../drafting/drafting.module.code.ts"

const BYTES = new TextEncoder()

const NOT_TEXT_SAID = "is not text, so no body is worked out for it"

export function owingIn(said: Said): ReadonlyMap<string, boolean> {
  const owed = new Map<string, boolean>()
  for (const one of said.edits) {
    if (one.readersOweReading === undefined) continue
    const at = one.kind === "move" ? [one.pathFrom, one.pathTo] : [one.path]
    for (const path of at) owed.set(path, (owed.get(path) ?? false) || one.readersOweReading)
  }
  return owed
}

export function bodiesFrom(root: string, said: Said): Bodies | { readonly why: string } {
  const reads = bodyIn(root)
  const after = replayed(said, reads)
  if ("refused" in after) return { why: after.refused }
  const owed = owingIn(said)
  const held = new Map<string, Body>()
  for (const [path, body] of after) {
    if (notText(body)) return { why: `\`${path}\` ${NOT_TEXT_SAID}` }
    const done = body === null ? null : formattedBody(root, path, BYTES.encode(body))
    const owes = owed.get(path)
    held.set(path, {
      was: bytesOf(reads(path)),
      body: done === null ? null : done.body,
      ...(owes === undefined ? {} : { readersOweReading: owes }),
    })
  }
  return held
}
