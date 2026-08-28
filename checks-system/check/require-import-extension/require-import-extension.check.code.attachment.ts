import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import ts from "typescript"
import { onceInCall } from "../../../during-call/during-call.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { carriesCode, specifiersIn } from "../../imports/imports.ts"
import type { Check } from "../check-shape.ts"

const CONFIG = /^tsconfig(\..+)?\.json$/

const DEFAULT_CONFIG = "tsconfig.json"

/**
 * The endings a relative specifier may be written with.
 *
 * TAKEN FROM WHAT THE REPOSITORY ACTUALLY IMPORTS, not from what TypeScript will resolve. A
 * specifier is judged on its text alone, so a stem carrying a period of its own — `./page.server`,
 * `./types.generated` — reads as bare and is one, the file behind it being `page.server.ts`.
 */
const EXTENSIONS: readonly string[] = [".ts", ".tsx", ".js", ".json", ".css"]

type Emit = {
  readonly noEmit?: boolean
  readonly emitDeclarationOnly?: boolean
}

/**
 * One answer per scan, for as long as the call that asked for it runs.
 *
 * A FILE CHECK IS ASKED ABOUT EVERY FILE, and the project owning one is found by walking its
 * directories to the nearest config and reading that config's whole `extends` chain. Over a tree
 * this size that is the same handful of directories and the same three hundred configs read again
 * for every file, which is what left an audit running with nothing to show for it.
 */
function heldBy<T>(name: string): Map<string, T> {
  return onceInCall(`require-import-extension:${name}`, () => new Map<string, T>())
}

function bodyAt(path: string): string | undefined {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return undefined
  }
}

// READ THROUGH TYPESCRIPT rather than `JSON.parse`, a tsconfig being allowed comments and at least
// one here carrying them; parsing it as plain JSON throws and the project reads as owning nothing.
function configAt(path: string): Record<string, unknown> | null {
  const said = ts.readConfigFile(path, bodyAt)
  if (said.error !== undefined) return null
  const held = said.config as unknown
  if (held === null || typeof held !== "object") return null
  return held as Record<string, unknown>
}

function pointedAt(from: string, said: string): string | null {
  const at = resolve(dirname(from), said)
  if (existsSync(at)) return statSync(at).isDirectory() ? join(at, DEFAULT_CONFIG) : at
  return existsSync(`${at}.json`) ? `${at}.json` : null
}

function mergedOver(base: Emit, said: Emit): Emit {
  return {
    noEmit: said.noEmit ?? base.noEmit,
    emitDeclarationOnly: said.emitDeclarationOnly ?? base.emitDeclarationOnly,
  }
}

function namedParents(config: Record<string, unknown>): readonly string[] {
  const said = config["extends"]
  if (typeof said === "string") return [said]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

/**
 * What a config settles about emit, its `extends` chain counted in.
 *
 * WHAT A CONFIG INHERITS IS WHAT IT COMPILES UNDER. Reading only a config's own text gets both
 * directions wrong here: `temper/addons/tsconfig.base.json` writes `noEmit: false` and forty-seven
 * addon projects extending it emit JavaScript without writing a word about it, while
 * `shared/design-system/tsconfig.build.json` writes `noEmit: false` over an `emitDeclarationOnly`
 * it inherits and emits declarations alone. TypeScript agrees: TS5096 stands against the first and
 * says nothing about the second.
 */
function optionsOf(path: string, seen: Set<string>): Emit {
  if (seen.has(path)) return {}
  seen.add(path)
  const config = configAt(path)
  if (config === null) return {}
  let base: Emit = {}
  for (const one of namedParents(config)) {
    if (!one.startsWith(".")) continue
    const at = pointedAt(path, one)
    if (at !== null) base = mergedOver(base, optionsOf(at, seen))
  }
  const own = config["compilerOptions"]
  if (own === null || typeof own !== "object") return base
  return mergedOver(base, own as Emit)
}

function emitsJavaScript(path: string): boolean {
  const held = heldBy<boolean>("config")
  const said = held.get(path)
  if (said !== undefined) return said
  const options = optionsOf(path, new Set<string>())
  const made = options.noEmit === false && options.emitDeclarationOnly !== true
  held.set(path, made)
  return made
}

function configsIn(dir: string): readonly string[] {
  const held = heldBy<readonly string[]>("directory")
  const said = held.get(dir)
  if (said !== undefined) return said
  let made: readonly string[] = []
  try {
    made = readdirSync(dir)
      .filter((one) => CONFIG.test(one))
      .map((one) => join(dir, one))
  } catch {
    made = []
  }
  held.set(dir, made)
  return made
}

/**
 * The config of the project nearest above a file, where that project emits JavaScript.
 *
 * THE NEAREST CONFIG SETTLES IT AND THE WALK STOPS THERE, as it does for the typecheck. A
 * directory holding several configs is one project to a file under it, and any one of them
 * emitting is enough: the file is built by that one and cannot carry an extension TypeScript
 * refuses alongside emit.
 */
function emittingProject(root: string, path: string): string | null {
  const stop = resolve(root)
  let dir = dirname(resolve(path))
  for (;;) {
    const found = configsIn(dir)
    if (found.length > 0) return found.find(emitsJavaScript) ?? null
    if (dir === stop) return null
    const up = dirname(dir)
    if (up === dir) return null
    dir = up
  }
}

function missingExtension(specifier: string): boolean {
  if (!specifier.startsWith(".")) return false
  return !EXTENSIONS.some((one) => specifier.endsWith(one))
}

export const requireImportExtension = {
  slug: "require-import-extension",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    if (!carriesCode(path)) return []
    const text = decodeUtf8(body)
    if (text === null) return []
    const bare = specifiersIn(text).filter(missingExtension)
    if (bare.length === 0) return []
    if (emittingProject(root, path) !== null) return []
    return bare.map((one) => `\`${one}\` is written without the extension of the file it names`)
  },
} satisfies Check

export default requireImportExtension
