import { mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import type { Typing } from "./code-typing.module.code.ts"
import { insideOf, typingOver } from "./code-typing.module.code.ts"

export const PACKAGED = "node_modules/@akasha"

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
  const typing = typingOver(root, paths, (at) => {
    const rel = insideOf(root, at)
    return rel === null ? onDisk(at) : said[rel]
  })
  return { root, typing }
}

export function linked(said: Readonly<Record<string, string>>, slug: string): string {
  const root = scratch.rootFor("akasha-manifest-")
  wrote(root, said)
  mkdirSync(join(root, PACKAGED), { recursive: true })
  symlinkSync(join(root, "akasha", slug), join(root, PACKAGED, slug))
  return root
}
