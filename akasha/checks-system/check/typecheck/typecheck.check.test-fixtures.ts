import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching.module.code.ts"
import { importIn } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  headOf,
  stampKept,
} from "../../../pages-system/indexes/index-stamp/index-stamp.module.code.ts"
import { gitIn } from "../../../testing-system/gitting.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"
import { typecheck } from "./typecheck.check.code.ts"

export const IMPORTS_AT = ".git/data/index/import/path"

export const scratch = scratchWorld()

function reaching(root: string, files: Readonly<Record<string, string>>): void {
  mkdirSync(join(root, IMPORTS_AT), { recursive: true })
  for (const [at, body] of Object.entries(files)) {
    for (const one of importIn(body, at, root)) {
      const held = join(root, ".git/data/index", one.at)
      mkdirSync(dirname(held), { recursive: true })
      appendFileSync(held, `${one.line}\n`)
    }
  }
}

function stamped(root: string): void {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@akasha"])
  gitIn(root, ["config", "user.name", "held"])
  writeFileSync(join(root, "seed"), "held\n")
  gitIn(root, ["add", "--", "seed"])
  gitIn(root, ["commit", "--quiet", "-m", "held", "--", "seed"])
  stampKept(join(root, ".git/data/index"), {
    commit: headOf(root) ?? "",
    tree: "akasha",
    settled: [],
  })
}

export function staged(files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-typecheck-")
  mkdirSync(join(root, "akasha"))
  for (const [at, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), body)
  }
  reaching(root, files)
  stamped(root)
  return root
}

export function leaving(
  root: string,
  over: Readonly<Record<string, string | null>>,
  base: Readonly<Record<string, string>> = {}
): Leaving {
  const held = new Map(Object.entries(over))
  const standing = new Map(Object.entries(base))
  const based = (path: string): Uint8Array | null => {
    const found = standing.get(path)
    if (found !== undefined) return new TextEncoder().encode(found)
    try {
      return readFileSync(join(root, path))
    } catch {
      return null
    }
  }
  return {
    root,
    changed: [...held.keys()].sort(),
    at: (path) => {
      if (held.has(path)) {
        const said = held.get(path)
        return said === undefined || said === null ? null : new TextEncoder().encode(said)
      }
      return based(path)
    },
    was: based,
  }
}

export function over(root: string, path: string, body: string | null): readonly Judged[] {
  return typecheck(leaving(root, { [path]: body }))
}
