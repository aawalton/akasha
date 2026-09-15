import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  type Asked,
  asking,
  type Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

export const root = rootOf(import.meta.dir)

export function typesHeld(
  types: Readonly<Record<string, Record<string, unknown>>>
): Map<string, ReadonlyMap<string, Record<string, unknown>>> {
  const made = new Map<string, ReadonlyMap<string, Record<string, unknown>>>()
  made.set("page-type", new Map(Object.entries(types)))
  return made
}

export function rowsOf(asked: Asked): readonly Record<string, unknown>[] {
  if ("refused" in asked) throw new Error(`refused: ${asked.refused}`)
  return asked.rows
}

export function slugsOf(asked: Asked): readonly unknown[] {
  return rowsOf(asked).map((one) => one.slug)
}

export function over(where: unknown): Asked {
  return asking(root, {
    pageTypeSlug: "decision-kind",
    where: where as Query["where"],
    keys: ["slug"],
  })
}

export function persona(query: Omit<Query, "pageTypeSlug">): Asked {
  return asking(root, { pageTypeSlug: "persona", ...query })
}

export function levels(where: Query["where"]): readonly unknown[] {
  return slugsOf(persona({ where, keys: ["slug"] }))
}
