import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import type { Roots } from "../page/page.ts"
import { AKASHA, ownRepoRoot, REPOS } from "../repo/roots/roots.ts"
import { type Moves, surveyRename } from "./repoint.ts"

const SCRATCH = "/var/tmp"

export interface Fixture {
  readonly root: string
  put: (relPath: string, body: string) => void
  dispose: () => void
}

function stage(root: string, relPath: string): void {
  Bun.spawnSync({ cmd: ["git", "add", "-f", "--", relPath], cwd: root })
}

export function fixture(): Fixture {
  const root = mkdtempSync(`${SCRATCH}/repoint-root-`)
  const home = mkdtempSync(`${SCRATCH}/repoint-home-`)
  const priorHome = process.env.HOME
  process.env.HOME = home
  Bun.spawnSync({ cmd: ["git", "init", "-q", "-b", "main", "."], cwd: root })
  return {
    root,
    put: (relPath, body) => {
      mkdirSync(dirname(`${root}/${relPath}`), { recursive: true })
      writeFileSync(`${root}/${relPath}`, body, "utf8")
      stage(root, relPath)
    },
    dispose: () => {
      if (priorHome === undefined) delete process.env.HOME
      else process.env.HOME = priorHome
      rmSync(root, { recursive: true, force: true })
      rmSync(home, { recursive: true, force: true })
    },
  }
}

export function installPages(root: string, relPaths: readonly string[]): void {
  const live = ownRepoRoot()
  for (const relPath of relPaths) {
    mkdirSync(dirname(`${root}/${relPath}`), { recursive: true })
    cpSync(`${live}/${relPath}`, `${root}/${relPath}`)
    stage(root, relPath)
  }
}

const BESIDE: readonly string[] = REPOS.filter((one) => one !== AKASHA)

export function rootsAt(at: string): Roots {
  const roots: Record<string, string> = { [AKASHA]: at, target: AKASHA }
  for (const repo of BESIDE) {
    const root = `${at}/empty-${repo}`
    mkdirSync(root, { recursive: true })
    roots[repo] = root
  }
  return roots as Roots
}

export function landed(root: string, pairs: Moves, relPath: string): string | null {
  return surveyRename(pairs, rootsAt(root)).entries.find((e) => e.relPath === relPath)?.body ?? null
}
