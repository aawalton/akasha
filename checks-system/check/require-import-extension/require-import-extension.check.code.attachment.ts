import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import ts from "typescript"
import { onceInCall } from "../../../during-call/during-call.ts"
import { isGeneratedFile } from "../../../generated-file/generated-file.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { carriesCode, specifiersIn } from "../../imports/imports.ts"
import type { Check } from "../check-shape.ts"

const CONFIG = /^tsconfig(\..+)?\.json$/

const DEFAULT_CONFIG = "tsconfig.json"

const EXTENSIONS: readonly string[] = [".ts", ".tsx", ".js", ".json", ".css"]

type Emit = {
  readonly noEmit?: boolean
  readonly emitDeclarationOnly?: boolean
}

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
    if (isGeneratedFile(relative(root, path), text)) return []
    if (emittingProject(root, path) !== null) return []
    return bare.map((one) => `\`${one}\` is written without the extension of the file it names`)
  },
} satisfies Check

export default requireImportExtension
