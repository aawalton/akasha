import {
  type Where,
  whereIn,
} from "akasha/page/service/modules/follow-narrowing/follow-narrowing.module.code.ts"

const BY: ReadonlySet<string> = new Set(["id", "slug"])

export type Follow = {
  readonly key: string
  readonly pageTypeSlug: string
  readonly by?: "id" | "slug"
  readonly values?: readonly string[]
  readonly where?: Where
}

function textsIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  const found: string[] = []
  for (const one of held) {
    if (typeof one !== "string" || one === "") return null
    found.push(one)
  }
  return found
}

function followIn(held: unknown): Follow | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const one = held as Readonly<Record<string, unknown>>
  if (typeof one.key !== "string" || one.key === "") return null
  if (typeof one.pageTypeSlug !== "string" || one.pageTypeSlug === "") return null
  const where = whereIn(one.where)
  if (where === null) return null
  const narrowing = where === undefined ? {} : { where }
  if (one.by === undefined) return { key: one.key, pageTypeSlug: one.pageTypeSlug, ...narrowing }
  if (typeof one.by !== "string" || !BY.has(one.by)) return null
  const values = textsIn(one.values)
  if (values === null) return null
  return {
    key: one.key,
    pageTypeSlug: one.pageTypeSlug,
    by: one.by as "id" | "slug",
    values,
    ...narrowing,
  }
}

export type Since = { readonly epoch: string; readonly mark: number }

type Asked =
  | { readonly stream: string; readonly follows: readonly Follow[]; readonly since?: Since }
  | { readonly refused: string }

function sinceIn(held: unknown): Since | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const one = held as Readonly<Record<string, unknown>>
  if (typeof one.epoch !== "string" || one.epoch === "") return null
  if (typeof one.mark !== "number" || !Number.isInteger(one.mark) || one.mark < 0) return null
  return { epoch: one.epoch, mark: one.mark }
}

export function askedIn(given: unknown): Asked {
  if (given === null || typeof given !== "object" || Array.isArray(given)) {
    return { refused: "a follow is asked for by a JSON object" }
  }
  const held = given as Readonly<Record<string, unknown>>
  if (typeof held.stream !== "string" || held.stream === "") {
    return { refused: "a follow names the stream it is for as `stream`" }
  }
  if (!Array.isArray(held.follows)) {
    return { refused: "a follow names what it follows as `follows`" }
  }
  const follows: Follow[] = []
  for (const one of held.follows) {
    const follow = followIn(one)
    if (follow === null) {
      return {
        refused:
          "each follow names a `key` and a `pageTypeSlug`, names pages only `by` `id` or `slug` with their `values`, and narrows only by a `where` a question could ask",
      }
    }
    follows.push(follow)
  }
  const since = sinceIn(held.since)
  return since === null ? { stream: held.stream, follows } : { stream: held.stream, follows, since }
}
