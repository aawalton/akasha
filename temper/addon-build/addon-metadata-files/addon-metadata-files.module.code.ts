import { existsSync } from "node:fs"
import { join, relative } from "node:path"
import { bindings } from "akasha/code-system/eso-addons/properties/bindings.file-property.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { readEsoAddonPage } from "akasha/temper/addon-build/addon-compiler-config/addon-compiler-config.module.code.ts"

export const GAME_METADATA_DIR = "metadata"

export const BINDINGS_FILE_NAME = bindings.fileName

export const LUA_MODULE_SUFFIX = ".lua-module.lua.lua"

export function metadataFileIn(dir: string, named: string): string | null {
  const beside = join(dir, named)
  if (existsSync(beside)) return beside
  const game = join(dir, GAME_METADATA_DIR, named)
  return existsSync(game) ? game : null
}

export async function addonBindingsPathIn(repoRoot: string, dir: string): Promise<string | null> {
  const found = metadataFileIn(dir, BINDINGS_FILE_NAME)
  if (found !== null) return found
  const page = readEsoAddonPage(repoRoot, dir)
  if (page === null || page.bindings === null) return null
  throw new Error(
    `addonBindingsPathIn: the page in ${dir} claims a ${BINDINGS_FILE_NAME}, and no such file is beside that page or under ${GAME_METADATA_DIR}/`
  )
}

const DOCUMENT_KINDS = [
  {
    pageTypeSlug: "eso-interface",
    pageSuffix: ".eso-interface.ts",
    fileSuffix: ".eso-interface.markup.xml",
  },
  { pageTypeSlug: "lua-module", pageSuffix: ".lua-module.ts", fileSuffix: LUA_MODULE_SUFFIX },
] as const

type Loaded = {
  readonly entry: string
  readonly name: string
  readonly pagePath: string
  readonly filePath: string
}

function loadedUnder(repoRoot: string, dir: string): readonly Loaded[] {
  const under = relative(repoRoot, dir)
  const found: Loaded[] = []
  for (const kind of DOCUMENT_KINDS) {
    for (const one of valuesOfType(repoRoot, kind.pageTypeSlug)) {
      const head = `${under}/`
      if (!one.path.startsWith(head)) continue
      const rest = one.path.slice(head.length).split("/")
      const entry = rest[0]
      if (rest.length !== 2 || entry === undefined) continue
      if (rest[1] !== `${entry}${kind.pageSuffix}`) continue
      const name = one.value.loadedAs
      if (typeof name !== "string") continue
      found.push({
        entry,
        name,
        pagePath: join(repoRoot, one.path),
        filePath: join(dir, entry, `${entry}${kind.fileSuffix}`),
      })
    }
  }
  return found.sort((one, two) => (one.entry < two.entry ? -1 : one.entry > two.entry ? 1 : 0))
}

export function loadedDocumentPathsIn(repoRoot: string, dir: string): ReadonlyMap<string, string> {
  const answer = new Map<string, string>()
  for (const one of loadedUnder(repoRoot, dir)) {
    if (!existsSync(one.filePath)) {
      throw new Error(
        `loadedDocumentPathsIn: the page at ${one.pagePath} is loaded as "${one.name}", and ${one.filePath} is not there`
      )
    }
    const already = answer.get(one.name)
    if (already !== undefined) {
      throw new Error(
        `loadedDocumentPathsIn: two pages under ${dir} are both loaded as "${one.name}", ${already} and ${one.filePath}`
      )
    }
    answer.set(one.name, one.filePath)
  }
  return answer
}

export function namedFilePathOrNull(repoRoot: string, dir: string, one: string): string | null {
  const found = metadataFileIn(dir, one)
  if (found !== null) return found
  return loadedDocumentPathsIn(repoRoot, dir).get(one) ?? null
}

export function namedFilePathsIn(
  repoRoot: string,
  dir: string,
  named: readonly string[]
): ReadonlyMap<string, string> {
  const answer = new Map<string, string>()
  const unreached: string[] = []
  let stated: ReadonlyMap<string, string> | null = null
  for (const one of named) {
    if (answer.has(one)) continue
    const found = metadataFileIn(dir, one)
    if (found !== null) {
      answer.set(one, found)
      continue
    }
    stated ??= loadedDocumentPathsIn(repoRoot, dir)
    const held = stated.get(one)
    if (held === undefined) {
      unreached.push(one)
      continue
    }
    answer.set(one, held)
  }
  if (unreached.length > 0) {
    const names = [...(stated ?? new Map()).keys()]
    throw new Error(
      `namedFilePathsIn: the manifest in ${dir} loads ${String(unreached.length)} file(s) nothing there holds (${unreached.join(", ")}); none is beside the page, none is under ${GAME_METADATA_DIR}/, and the pages beside it are loaded as ${names.length === 0 ? "no name at all" : names.join(", ")}`
    )
  }
  return answer
}
