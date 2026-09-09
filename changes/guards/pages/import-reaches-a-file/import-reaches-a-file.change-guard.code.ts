import { dirname, extname, join } from "node:path"
import { landingOf, placedIn } from "@akasha/code/code-specifier"
import { objectIn } from "@akasha/code/package-manifest"
import {
  holdsAfter,
  textAfter,
  writtenIn,
} from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

const CODE = new Set([".ts", ".tsx"])

const ENDINGS = ["", ".ts", ".tsx", ".d.ts"]

const CONFIG = "tsconfig.json"

const OPTIONS = "compilerOptions"

const ROOT_DIRS = "rootDirs"

const HERE = "."

export type Roots = readonly string[]

export function rootDirsIn(text: string, folder: string): Roots {
  const held = objectIn(text)
  const options = held === null ? null : held[OPTIONS]
  if (options === null || typeof options !== "object") return []
  const said = (options as Record<string, unknown>)[ROOT_DIRS]
  if (!Array.isArray(said)) return []
  const found: string[] = []
  for (const one of said) {
    if (typeof one !== "string") continue
    const at = join(folder, one)
    found.push(at === HERE ? "" : at)
  }
  return found
}

export function rerootedIn(landed: string, roots: Roots): Roots {
  const deepest = [...roots].sort((one, two) => two.length - one.length)
  const root = deepest.find((one) => one === "" || landed.startsWith(`${one}/`))
  if (root === undefined) return []
  const rest = root === "" ? landed : landed.slice(root.length + 1)
  return roots.filter((one) => one !== root).map((one) => (one === "" ? rest : `${one}/${rest}`))
}

function kept(known: Map<string, Roots>, folders: readonly string[], found: Roots): Roots {
  for (const one of folders) known.set(one, found)
  return found
}

function rootsAt(given: Guarding, known: Map<string, Roots>, folder: string): Roots {
  const climbed: string[] = []
  let at = folder
  for (;;) {
    const had = known.get(at)
    if (had !== undefined) return kept(known, climbed, had)
    climbed.push(at)
    const text = textAfter(given, join(at, CONFIG))
    if (text !== null) return kept(known, climbed, rootDirsIn(text, at))
    const up = dirname(at)
    if (up === at) return kept(known, climbed, [])
    at = up
  }
}

function holdsAny(given: Guarding, at: string): boolean {
  return ENDINGS.some((ending) => holdsAfter(given, `${at}${ending}`))
}

function reachingIn(
  given: Guarding,
  known: Map<string, Roots>,
  path: string,
  body: string
): string | null {
  for (const one of placedIn(path, body)) {
    const landed = landingOf(path, one.text)
    if (landed === null || holdsAny(given, landed)) continue
    const roots = rootsAt(given, known, dirname(path))
    if (rerootedIn(landed, roots).some((said) => holdsAny(given, said))) continue
    return `\`${path}\` imports \`${one.text}\`, and \`${landed}\` holds no body`
  }
  return null
}

export function importReachesAFile(given: Guarding): string | null {
  const known = new Map<string, Roots>()
  for (const [path, body] of writtenIn(given)) {
    if (!CODE.has(extname(path))) continue
    const why = reachingIn(given, known, path, body)
    if (why !== null) return why
  }
  return null
}

export const runGuard: Guard = importReachesAFile
