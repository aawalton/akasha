import {
  type FileChange,
  gathered,
  pathsIn,
  refusing,
  type Said,
  type Splice,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { exportRenamed } from "akasha/change/modules/export-renaming/export-renaming.module.code.ts"
import { readFor } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  boundIn,
  keyOf,
  statedIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { carrying, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { placingOver } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { importingOf } from "akasha/page/index/modules/path-naming/path-naming.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import type { Named } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import { STEM_CEILING } from "akasha/page/naming/named-for/modules/page-stem/page-stem.module.code.ts"
import ts from "typescript"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const ID = "id"

const NAME = "name"

const ECHOES_NOT = new Set([SLUG, PAGE_TYPE, PAGE_TYPE_SLUG, ID, NAME])

export type Asked = {
  readonly at: string
  readonly to: string
  readonly name?: string
}

type Renaming = {
  readonly was: string
  readonly now: string
  readonly pageTypeSlug: string
}

function readdressed(said: string, one: Renaming): string | null {
  if (said === one.was) return one.now
  return said === `${one.pageTypeSlug}/${one.was}` ? `${one.pageTypeSlug}/${one.now}` : null
}

function spotIn(source: ts.SourceFile, node: ts.Expression, one: Renaming): readonly Splice[] {
  if (!ts.isStringLiteral(node)) return []
  const next = readdressed(node.text, one)
  if (next === null) return []
  return [{ from: node.getStart(source), to: node.getEnd(), put: JSON.stringify(next) }]
}

function valuedIn(source: ts.SourceFile, node: ts.Expression, one: Renaming): readonly Splice[] {
  if (!ts.isArrayLiteralExpression(node)) return spotIn(source, node, one)
  return node.elements.flatMap((held) => spotIn(source, held, one))
}

function addressedIn(
  path: string,
  text: string,
  slugs: ReadonlySet<string>,
  one: Renaming,
  declaring: (key: string) => string | null
): readonly Splice[] {
  const source = parsedAs(path, text)
  const found: Splice[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isPropertyAssignment(node)) {
      const key = keyOf(node)
      const said = key === null ? null : declaring(key)
      if (said !== null && slugs.has(said)) {
        found.push(...valuedIn(source, node.initializer, one))
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

function namingIn(namers: readonly Named[]): ReadonlyMap<string, ReadonlySet<string>> {
  const found = new Map<string, Set<string>>()
  for (const one of namers) {
    const held = found.get(one.path) ?? new Set<string>()
    held.add(one.propertySlug)
    found.set(one.path, held)
  }
  return found
}

function restatedAt(source: ts.SourceFile, held: ts.StringLiteral, to: string): Splice {
  return { from: held.getStart(source), to: held.getEnd(), put: JSON.stringify(to) }
}

export function slugRenamed(world: World, given: Asked): Said {
  if (!given.at.endsWith(TYPED)) return refusing(`\`${given.at}\` is no \`.ts\` file`)
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const said = statedIn(source)
  const slug = said.get(SLUG)
  const pageType = said.get(PAGE_TYPE) ?? said.get(PAGE_TYPE_SLUG)
  const id = said.get(ID)
  if (slug === undefined) return refusing(`\`${given.at}\` states no \`${SLUG}\``)
  if (pageType === undefined) return refusing(`\`${given.at}\` states no \`${PAGE_TYPE_SLUG}\``)
  if (id === undefined) return refusing(`\`${given.at}\` states no \`${ID}\``)
  const bound = exportedAs(slug.text)
  if (boundIn(source) !== bound) {
    return refusing(`\`${given.at}\` exports no \`${bound}\`, the name its slug makes`)
  }
  if (!KEBAB.test(given.to)) {
    return refusing(`\`${given.to}\` is no slug, a slug being lower kebab case`)
  }
  if (given.to.length > STEM_CEILING) {
    return refusing(
      `\`${given.to}\` runs to ${given.to.length} characters, past the ${STEM_CEILING} a page's slug holds`
    )
  }
  if (given.to === slug.text) return refusing(`\`${given.to}\` is the slug it already carries`)
  const namers = world.index.namersOf(id.text)
  if (world.index.slugsOfType(pageType.text).includes(given.to)) {
    return refusing(`a \`${pageType.text}\` carries the slug \`${given.to}\` already`)
  }
  const name = said.get(NAME)
  if (given.name !== undefined && name === undefined) {
    return refusing(`\`${given.at}\` states no text under \`${NAME}\``)
  }
  const one = { was: slug.text, now: given.to, pageTypeSlug: pageType.text }
  const texts = new Map<string, string>([[given.at, text]])
  const spots = new Map<string, Splice[]>()
  const put = (path: string, held: readonly Splice[]): undefined => {
    spots.set(path, [...(spots.get(path) ?? []), ...held])
  }
  put(given.at, [restatedAt(source, slug, given.to)])
  if (name !== undefined && given.name !== undefined && given.name !== name.text) {
    put(given.at, [restatedAt(source, name, given.name)])
  }
  for (const [key, held] of said) {
    if (ECHOES_NOT.has(key) || held.text !== slug.text) continue
    put(given.at, [restatedAt(source, held, given.to)])
  }
  for (const [path, slugs] of namingIn(namers)) {
    let body = texts.get(path)
    if (body === undefined) {
      const read = world.textOf(path)
      if (read === null) return refusing(`\`${path}\` names this page and could not be read`)
      texts.set(path, read)
      body = read
    }
    const naming = readFor(world, path)
    if ("refused" in naming) return refusing(naming.refused)
    const declaring = (key: string): string | null => naming.known.slugOfKeyIn(naming.value, key)
    put(path, addressedIn(path, body, slugs, one, declaring))
  }
  const restating: FileChange[] = []
  for (const [path, held] of spots) {
    restating.push(...splicedIn(path, texts.get(path) ?? "", held))
  }
  const importers = importingOf(world.index, new Map([[given.at, given.at]]))
  const before = stating(restating)
  const seen = carrying(world, before)
  const placed = placingOver(pathsIn(seen.over), seen.textOf)
  const spelled = exportRenamed(
    seen.root,
    given.at,
    [given.at, ...importers],
    bound,
    exportedAs(given.to),
    seen.textOf,
    placed
  )
  if (spelled.refused !== null) return spelled
  return gathered([before, spelled])
}
