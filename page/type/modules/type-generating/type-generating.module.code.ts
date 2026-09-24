import type { Adding, Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { formattedBodies } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { type Shadow, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

const BYTES = new TextEncoder()

type Generating = (root: string, shadow: Shadow, change: Change) => readonly Adding[]

export type Typed = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING_TYPED: Typed = { edits: [], said: [] }

type Kept = {
  readonly path: string
  readonly slug: string
  readonly body: Uint8Array
  readonly was: string | null
}

function writtenOver(root: string, kept: readonly Kept[]): Typed {
  if (kept.length === 0) return NOTHING_TYPED
  const decoder = new TextDecoder()
  const done = formattedBodies(root, new Map(kept.map((one) => [one.path, one.body])))
  const edits: (Adding | Replacing)[] = []
  const said: string[] = []
  for (const one of kept) {
    const made = done.get(one.path)
    const now = decoder.decode(made === undefined ? one.body : made.body)
    if (one.was === now) continue
    edits.push(
      one.was === null
        ? { kind: "add", path: one.path, content: now }
        : { kind: "replace", path: one.path, contentFrom: one.was, contentTo: now }
    )
    said.push(`\`${one.path}\` was written again by the change generator \`${one.slug}\``)
  }
  return { edits, said }
}

export function typedOn(
  change: Change,
  shadow: Shadow,
  slug: string,
  generating: Generating
): Typed {
  const kept: Kept[] = []
  for (const one of generating(change.root, shadow, change)) {
    const was = textOf(change.after(one.path))
    if (was === one.content) continue
    kept.push({ path: one.path, slug, body: BYTES.encode(one.content), was })
  }
  return writtenOver(change.root, kept)
}

export function typedWith(change: Change, slug: string, generating: Generating): Typed {
  const cast = shadowFor(change)
  if ("refused" in cast) return NOTHING_TYPED
  return typedOn(change, cast.shadow, slug, generating)
}
