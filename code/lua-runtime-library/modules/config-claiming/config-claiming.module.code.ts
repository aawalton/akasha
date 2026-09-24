import { dirname, join } from "node:path"
import { lua50Config } from "akasha/code/lua-runtime-library/properties/lua50-config.file-property.ts"
import { universalConfig } from "akasha/code/lua-runtime-library/properties/universal-config.file-property.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { namedUnder } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const LIBRARY = "lua-runtime-library"

export const CONFIGS: readonly string[] = [universalConfig.fileName, lua50Config.fileName]

type Reader = (path: string) => string | null

type Included = {
  readonly include?: readonly string[]
}

type Configured = {
  readonly at: string
  readonly claims: readonly RegExp[]
}

export type Library = {
  readonly page: string
  readonly configs: readonly Configured[]
}

export function matching(one: string): RegExp {
  const held = one.replace(/[.+^${}()|[\]\\]/g, "\\$&")
  const said = held.replace(/\*\*\/|\*/g, (each) => (each === "*" ? "[^/]*" : "(?:.*/)?"))
  return new RegExp(`^${said}$`)
}

function pagesOver(paths: readonly string[], read: Reader, index: Answering): readonly string[] {
  const held = new Set(index.everyOfType(LIBRARY).map((one) => one.path))
  const under = new Set([LIBRARY])
  for (const one of paths) if (namedUnder(one, under) !== null) held.add(one)
  return [...held].filter((one) => read(one) !== null)
}

function configuredAt(at: string, text: string): Configured {
  const folder = dirname(at)
  const said = JSON.parse(text) as Included
  return { at, claims: (said.include ?? []).map((each) => matching(join(folder, each))) }
}

export function librariesIn(
  paths: readonly string[],
  read: Reader,
  index: Answering
): readonly Library[] {
  const found: Library[] = []
  for (const page of pagesOver(paths, read, index)) {
    const configs: Configured[] = []
    for (const name of CONFIGS) {
      const at = join(dirname(page), name)
      const text = read(at)
      if (text !== null) configs.push(configuredAt(at, text))
    }
    found.push({ page, configs })
  }
  return found
}

export function claims(library: Library, path: string): boolean {
  return library.configs.some((one) => one.claims.some((each) => each.test(path)))
}

export function claimingOver(
  paths: readonly string[],
  read: Reader,
  index: Answering
): (path: string) => boolean {
  const found = librariesIn(paths, read, index)
  return (path) => found.some((one) => claims(one, path))
}
