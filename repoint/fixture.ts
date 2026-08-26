import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { ownRepoRoot } from "../repo/roots/roots.ts"

const SCRATCH = "/var/tmp"

export interface Fixture {
  readonly root: string
  put(relPath: string, body: string): void
  dispose(): void
}

export function fixture(): Fixture {
  const root = mkdtempSync(`${SCRATCH}/repoint-root-`)
  const home = mkdtempSync(`${SCRATCH}/repoint-home-`)
  const priorHome = process.env.HOME
  process.env.HOME = home
  return {
    root,
    put: (relPath, body) => {
      mkdirSync(dirname(`${root}/${relPath}`), { recursive: true })
      writeFileSync(`${root}/${relPath}`, body, "utf8")
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
  }
}
