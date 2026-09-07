import { mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import type { Typing } from "./code-typing.module.code.ts"
import { insideOf, placingOver, typingOver } from "./code-typing.module.code.ts"

export const PACKAGED = "node_modules/@akasha"

export const MANIFEST = '{ "name": "@akasha/one" }\n'

export const MANIFEST_AT = "akasha/one/package.json"

export const KEYS_SAID =
  "export function heldOf(said: readonly string[]): Held {\n  return { keyed: said }\n}\n"

export const scratch = scratchWorld()

export function wrote(root: string, said: Readonly<Record<string, string>>): string[] {
  for (const [path, text] of Object.entries(said)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, text)
  }
  return Object.keys(said)
}

function onDisk(at: string): string | undefined {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return undefined
  }
}

export function typed(said: Readonly<Record<string, string>>): {
  root: string
  typing: Typing
} {
  const root = scratch.rootFor("akasha-typing-")
  const paths = wrote(root, said)
  const placed = placingOver(paths, (at) => said[at] ?? null)
  const typing = typingOver(
    root,
    paths,
    (at) => {
      const rel = insideOf(root, at)
      return rel === null ? onDisk(at) : said[rel]
    },
    placed
  )
  return { root, typing }
}

export function linked(said: Readonly<Record<string, string>>, slug: string): string {
  const root = scratch.rootFor("akasha-manifest-")
  wrote(root, said)
  mkdirSync(join(root, PACKAGED), { recursive: true })
  symlinkSync(join(root, "akasha", slug), join(root, PACKAGED, slug))
  return root
}

export function unlinked(said: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-unlinked-")
  wrote(root, said)
  mkdirSync(join(root, PACKAGED), { recursive: true })
  return root
}
