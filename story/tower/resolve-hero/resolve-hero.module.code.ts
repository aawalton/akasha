import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import {
  type ChapterEntry,
  type Illustration,
  parseIllustrations,
} from "../core/tower-state/tower-state.module.code.ts"

export async function loadIllustrations(statePath: string): Promise<readonly Illustration[]> {
  const path = join(dirname(statePath), "illustrations.json")
  let raw: string
  try {
    raw = await readFile(path, "utf8")
  } catch {
    return []
  }
  return parseIllustrations(raw)
}

export function resolveHeroSrc(
  entry: ChapterEntry,
  illustrations: readonly Illustration[]
): string | null {
  const heroBeat = entry.heroBeat
  if (heroBeat === undefined || heroBeat.length === 0) return null
  const match = illustrations.find((ill) => ill.anchor === heroBeat)
  return match?.src ?? null
}
