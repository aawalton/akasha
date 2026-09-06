import type { PageCondition, PageWhere } from "@akasha/pages-core/page-types"
import type { Test } from "@akasha/pages-service/asking"

function textOf(value: unknown): string | null {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return null
}

function textsOf(values: readonly unknown[]): readonly string[] | null {
  const out: string[] = []
  for (const one of values) {
    const said = textOf(one)
    if (said === null) return null
    out.push(said)
  }
  return out
}

export type Lowered = { readonly key: string; readonly test: Test } | { readonly refused: string }

// EVERY CONDITION IS LOWERED OR THE WRITE IS REFUSED. Nothing here drops a condition it cannot
// carry. The road this replaces narrowed through `askableNarrows`, which strips a condition on a
// key the repository settles rather than lowering it, so a scoped read widened to every account's
// rows instead of matching none — see
// `finding/lifting-the-shape-tombstone-uncovers-a-read-that-crosses-accounts`. On a write that
// same strip would reach pages the caller never named, so a narrow this cannot carry refuses.
export function loweredFrom(condition: PageCondition): Lowered {
  if ("or" in condition) {
    return {
      refused:
        "an `or` of conditions, and a question asked of `@akasha/pages-service` tests each key on its own",
    }
  }
  const key = condition.key
  const noScalar = { refused: `\`${key}\` is tested against what is no string, number or boolean` }
  const noList = { refused: `\`${key}\` is tested against a list holding what is no string` }
  if ("eq" in condition) {
    if (condition.eq === null) return { key, test: { empty: true } }
    const one = textOf(condition.eq)
    return one === null ? noScalar : { key, test: { is: one } }
  }
  if ("isNull" in condition) return { key, test: { empty: true } }
  if ("isEmpty" in condition) return { key, test: { empty: true } }
  if ("isNotEmpty" in condition) return { key, test: { empty: false } }
  if ("in" in condition) {
    const many = textsOf(condition.in)
    return many === null ? noList : { key, test: { in: many } }
  }
  if ("notIn" in condition) {
    const many = textsOf(condition.notIn)
    return many === null ? noList : { key, test: { "not-in": many } }
  }
  if ("neq" in condition) {
    const one = textOf(condition.neq)
    return one === null ? noScalar : { key, test: { "not-in": [one] } }
  }
  if ("contains" in condition) return { key, test: { contains: condition.contains } }
  if ("includes" in condition) {
    const one = textOf(condition.includes)
    return one === null ? noScalar : { key, test: { has: one } }
  }
  if ("lt" in condition) {
    const one = textOf(condition.lt)
    return one === null ? noScalar : { key, test: { before: one } }
  }
  if ("lte" in condition) {
    const one = textOf(condition.lte)
    return one === null ? noScalar : { key, test: { "at-or-before": one } }
  }
  if ("gt" in condition) {
    const one = textOf(condition.gt)
    return one === null ? noScalar : { key, test: { after: one } }
  }
  if ("gte" in condition) {
    const one = textOf(condition.gte)
    return one === null ? noScalar : { key, test: { "at-or-after": one } }
  }
  return {
    refused: `\`${key}\` is tested by something \`@akasha/pages-service\` runs no test for`,
  }
}

export type Narrowed =
  | { readonly where: Readonly<Record<string, Test>> }
  | { readonly refused: string }

export function narrowedFrom(where: PageWhere): Narrowed {
  const held: Record<string, Test> = {}
  for (const condition of where) {
    const lowered = loweredFrom(condition)
    if ("refused" in lowered) return lowered
    const already = held[lowered.key]
    if (already === undefined) {
      held[lowered.key] = lowered.test
      continue
    }
    const name = Object.keys(lowered.test)[0] as string
    if (name in already) {
      return {
        refused: `\`${lowered.key}\` is tested by \`${name}\` twice, and one key carries one test of each name`,
      }
    }
    held[lowered.key] = { ...already, ...lowered.test }
  }
  return { where: held }
}
