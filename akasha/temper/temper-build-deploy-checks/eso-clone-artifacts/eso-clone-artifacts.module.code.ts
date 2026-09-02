import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import {
  parseEsoCloneProvenance,
  parseStampedApiVersion,
} from "@akasha/temper-eso-paths/eso-clone-stamp"
import type { StampedArtifact } from "../eso-doc-api-version/eso-doc-api-version.module.code.ts"

export const WALK_ROOT = "temper"

const SKIP_DIRS = new Set(["node_modules", "dist", ".git"])

export function isGeneratedByPath(relPath: string): boolean {
  const segments = relPath.split("/")
  const base = segments.at(-1)
  if (base === undefined) return false
  return segments.slice(0, -1).includes("generated") || base.includes(".generated.")
}

export function collectGeneratedFiles(dir: string, repoRoot: string): readonly string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) {
      out.push(...collectGeneratedFiles(path, repoRoot))
      continue
    }
    if (isGeneratedByPath(relative(repoRoot, path))) out.push(path)
  }
  return out
}

export interface Population {
  readonly artifacts: readonly StampedArtifact[]
  readonly filesScanned: number
}

export function buildEsoClonePopulation(repoRoot: string): Population {
  const artifacts: StampedArtifact[] = []
  let filesScanned = 0
  for (const path of collectGeneratedFiles(join(repoRoot, WALK_ROOT), repoRoot)) {
    const text = readFileSync(path, "utf8")
    filesScanned += 1
    const generator = parseEsoCloneProvenance(text)
    if (generator === null) continue
    artifacts.push({
      label: relative(repoRoot, path),
      version: parseStampedApiVersion(text),
      generator,
    })
  }
  return { artifacts, filesScanned }
}
