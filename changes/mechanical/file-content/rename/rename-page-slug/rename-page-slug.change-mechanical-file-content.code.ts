import { parsedAs } from "@akasha/code/code-source"
import type { Named } from "@akasha/indexes"
import { STEM_CEILING } from "@akasha/pages/naming/named-for/page-stem"
import { exportedAs } from "@akasha/pages/page-export-name"
import ts from "typescript"
import { importingOf } from "../../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import {
  gathered,
  refusing,
  splicedIn,
  stating,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
  Said,
  Splice,
} from "../../../../modules/change-answer/change-answer.module.types.ts"
import {
  addedTo,
  isLedger,
  reach,
  type World,
  worldOver,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { readFor } from "../../../../modules/page-knowing/page-knowing.module.code.ts"
import {
  boundIn,
  keyOf,
  statedIn,
} from "../../../../modules/page-literal/page-literal.module.code.ts"

const CHANGE_PAGE_PROPERTY = "change-mechanical-file-content/change-page-page-property"

const RENAME_EXPORT = "change-mechanical-file-content/rename-export"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const PLURAL_SLUG = "pluralSlug"

const ID = "id"

export type RenamePageSlugAsked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
}

type Renaming = {
  readonly was: string
  readonly now: string
  readonly pageTypeSlug: string
}

type Reach =
  | { readonly namers: readonly Named[]; readonly slugs: readonly string[] }
  | { readonly unread: string }

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

export function addressedIn(
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

function reachOf(world: World, id: string, pageTypeSlug: string): Reach {
  try {
    return { namers: world.index.namersOf(id), slugs: world.index.slugsOfType(pageTypeSlug) }
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { unread: `${why}, so no slug was restated` }
  }
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

export async function renameSlug(world: World, given: RenamePageSlugAsked): Promise<Answer> {
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
  const plural = said.get(PLURAL_SLUG)
  if (plural !== undefined && given.plural === undefined) {
    return refusing(`\`${given.at}\` states a \`${PLURAL_SLUG}\`, so the plural it becomes is said`)
  }
  if (plural === undefined && given.plural !== undefined) {
    return refusing(`\`${given.at}\` states no \`${PLURAL_SLUG}\`, so no plural is said`)
  }
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
  const reached = reachOf(world, id.text, pageType.text)
  if ("unread" in reached) return refusing(reached.unread)
  if (reached.slugs.includes(given.to)) {
    return refusing(`a \`${pageType.text}\` carries the slug \`${given.to}\` already`)
  }
  const one = { was: slug.text, now: given.to, pageTypeSlug: pageType.text }
  const texts = new Map<string, string>([[given.at, text]])
  const spots = new Map<string, Splice[]>()
  const put = (path: string, held: readonly Splice[]): undefined => {
    spots.set(path, [...(spots.get(path) ?? []), ...held])
  }
  put(given.at, [{ from: slug.getStart(source), to: slug.getEnd(), put: JSON.stringify(given.to) }])
  for (const [path, slugs] of namingIn(reached.namers)) {
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
  const answers: Answer[] = [stating(restating)]
  const before = gathered(answers)
  if (before.refused !== null) return before
  let seen = isLedger(world) ? addedTo(world, before) : worldOver(world, before)
  if (given.plural !== undefined) {
    const stated = await reach(seen, CHANGE_PAGE_PROPERTY, {
      at: given.at,
      key: PLURAL_SLUG,
      to: given.plural,
    })
    if (stated.said.refused !== null) return stated.said
    answers.push(stated.said)
    seen = stated.world
  }
  const reading = importingOf(world.index, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const folded = gathered(answers)
  if (folded.refused !== null) return folded
  const spelled = await reach(seen, RENAME_EXPORT, {
    at: given.at,
    over: [given.at, ...reading.importers],
    of: bound,
    to: exportedAs(given.to),
  })
  if (spelled.said.refused !== null) return spelled.said
  answers.push(spelled.said)
  return gathered(answers)
}

export async function runChange(world: World, given: RenamePageSlugAsked): Promise<Said> {
  return await renameSlug(world, given)
}
