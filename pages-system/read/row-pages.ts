import type { Value, Values } from "../formula/formula.ts"
import type { Declared, Page } from "../query/query.ts"
import { type Repo, addressIn, notIn, pathOf } from "./address.ts"
import { sidecarsOf, textAt } from "./files.ts"
import { valuedAs } from "./held.ts"
import { rowsIn } from "./rows.ts"
import type { Unread } from "./pages.ts"

export type Where = {
  readonly at: string
  readonly key: string
}

const stemOf = (at: string): string => {
  const cut = at.lastIndexOf("/")
  const base = cut < 0 ? at : at.slice(cut + 1)
  const stop = base.indexOf(".")
  return stop < 0 ? base : base.slice(0, stop)
}

const valuesOf = (
  stated: Readonly<Record<string, unknown>>,
  declared: Declared,
  now: number
): Values => {
  const properties: Record<string, Value> = {}
  for (const [key, property] of Object.entries(declared.properties)) {
    properties[key] = valuedAs(stated[key], property.type)
  }
  return { now, properties }
}

function* walk(
  repo: Repo,
  where: Iterable<Where>,
  declared: Declared,
  now: number
): Generator<Page | Unread> {
  for (const one of where) {
    const path = pathOf(repo, one.at)
    if (path === null) {
      yield { at: one.at, unread: notIn(repo.repo) }
      continue
    }
    const holder = stemOf(path)
    for (const sidecar of sidecarsOf(repo.root, path, one.key)) {
      const text = textAt(repo.root, sidecar)
      if (text === null) continue
      for (const row of rowsIn(addressIn(repo.repo, sidecar), text, holder)) {
        if ("unread" in row) {
          yield row
          continue
        }
        yield { at: row.at, values: valuesOf(row.stated, declared, now) }
      }
    }
  }
}

export const rowPagesIn = (
  repo: Repo,
  where: Iterable<Where>,
  declared: Declared,
  now: number
): Iterable<Page | Unread> => ({
  [Symbol.iterator]: () => walk(repo, where, declared, now),
})
