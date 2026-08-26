import { existsSync, readdirSync } from "node:fs"
import type { PageAt } from "../page-at.ts"
import type { Source } from "./entry.ts"
import { fileFor, indexRoot } from "./place.ts"
import { sourcesAt } from "./store.ts"

export type { Source }

export function sourcesFor(relation: string, to: PageAt): readonly Source[] {
  return sourcesAt(relation, to.stem, to.type)
}

export function relationsHere(): readonly string[] {
  const at = indexRoot()
  if (!existsSync(at)) return []
  return readdirSync(at, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => one.name)
    .sort()
}

export function pointingAt(to: PageAt): ReadonlyMap<string, readonly Source[]> {
  const found = new Map<string, readonly Source[]>()
  for (const relation of relationsHere()) {
    if (!existsSync(fileFor(relation, to.stem, to.type))) continue
    const sources = sourcesAt(relation, to.stem, to.type)
    if (sources.length > 0) found.set(relation, sources)
  }
  return found
}
