import { parsedAs } from "@akasha/code/code-source"
import type { Named } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages/page-export-name"
import { slugFor } from "@akasha/pages/page-property-key"
import ts from "typescript"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import {
  answered,
  gathered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  reach,
  type World,
  worldOver,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { boundIn, keyOf, statedIn } from "../../../modules/page-literal/page-literal.module.code.ts"

const CHANGE_PAGE_PROPERTY = "change-mechanical/change-page-property"

const RESPELL_EXPORT = "change-mechanical/respell-export"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const PLURAL_SLUG = "pluralSlug"

const ID = "id"

export type RenamePageSlugAsked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
}

type Spot = {
  readonly start: number
  readonly end: number
  readonly put: string
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

function spotIn(source: ts.SourceFile, node: ts.Expression, one: Renaming): readonly Spot[] {
  if (!ts.isStringLiteral(node)) return []
  const next = readdressed(node.text, one)
  if (next === null) return []
  return [{ start: node.getStart(source), end: node.getEnd(), put: JSON.stringify(next) }]
}

function valuedIn(source: ts.SourceFile, node: ts.Expression, one: Renaming): readonly Spot[] {
  if (!ts.isArrayLiteralExpression(node)) return spotIn(source, node, one)
  return node.elements.flatMap((held) => spotIn(source, held, one))
}

export function addressedIn(
  path: string,
  text: string,
  slugs: ReadonlySet<string>,
  one: Renaming
): readonly Spot[] {
  const source = parsedAs(path, text)
  const found: Spot[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isPropertyAssignment(node)) {
      const key = keyOf(node)
      if (key !== null && slugs.has(slugFor(key))) {
        found.push(...valuedIn(source, node.initializer, one))
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export function splicedIn(text: string, spots: readonly Spot[]): string {
  const seen = new Set<number>()
  let body = text
  for (const one of [...spots].sort((here, there) => there.start - here.start)) {
    if (seen.has(one.start)) continue
    seen.add(one.start)
    body = body.slice(0, one.start) + one.put + body.slice(one.end)
  }
  return body
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
  const pageType = said.get(PAGE_TYPE_SLUG)
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
  if (given.to === slug.text) return refusing(`\`${given.to}\` is the slug it already carries`)
  const reached = reachOf(world, id.text, pageType.text)
  if ("unread" in reached) return refusing(reached.unread)
  if (reached.slugs.includes(given.to)) {
    return refusing(`a \`${pageType.text}\` carries the slug \`${given.to}\` already`)
  }
  const one = { was: slug.text, now: given.to, pageTypeSlug: pageType.text }
  const texts = new Map<string, string>([[given.at, text]])
  const spots = new Map<string, Spot[]>()
  const put = (path: string, held: readonly Spot[]): undefined => {
    spots.set(path, [...(spots.get(path) ?? []), ...held])
  }
  put(given.at, [
    { start: slug.getStart(source), end: slug.getEnd(), put: JSON.stringify(given.to) },
  ])
  for (const [path, slugs] of namingIn(reached.namers)) {
    let body = texts.get(path)
    if (body === undefined) {
      const read = world.textOf(path)
      if (read === null) return refusing(`\`${path}\` names this page and could not be read`)
      texts.set(path, read)
      body = read
    }
    put(path, addressedIn(path, body, slugs, one))
  }
  const restating: Edit[] = []
  for (const [path, held] of spots) {
    const body = texts.get(path) ?? ""
    const next = splicedIn(body, held)
    if (next === body) continue
    restating.push(writing(path, body, next))
  }
  const answers: Answer[] = [answered(restating)]
  if (given.plural !== undefined) {
    const before = gathered(answers)
    if (before.refused !== null) return before
    const stated = await reach(worldOver(world, before), CHANGE_PAGE_PROPERTY, {
      at: given.at,
      key: PLURAL_SLUG,
      to: given.plural,
    })
    if (stated.said.refused !== null) return stated.said
    answers.push(stated.said)
  }
  const reading = importingOf(world.index, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const folded = gathered(answers)
  if (folded.refused !== null) return folded
  const spelled = await reach(worldOver(world, folded), RESPELL_EXPORT, {
    at: given.at,
    over: [given.at, ...reading.importers],
    of: bound,
    to: exportedAs(given.to),
  })
  if (spelled.said.refused !== null) return spelled.said
  answers.push(spelled.said)
  return gathered(answers)
}

export async function runChange(world: World, given: RenamePageSlugAsked): Promise<Answer> {
  return await renameSlug(world, given)
}
