import {
  refusing,
  spliced,
  splicedIn,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { without } from "akasha/changes/modules/literal-splicing/literal-splicing.module.code.ts"
import { afterIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  listIn,
  literalIn,
  matchingIn,
} from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import {
  editsOver,
  type Page,
  placeOf,
  type Written,
} from "akasha/changes/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { typeSlugIn } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import { identityOf } from "akasha/pages/types/modules/declared-properties/declared-properties.module.code.ts"
import ts from "typescript"

const PROPERTIES = "properties"

const PAGE_PROPERTY = "pageProperty"

const REQUIRED = "required"

const MANY = "many"

const MAX_COUNT = "maxCount"

const NOTHING = "null"

export type Asked = {
  readonly at: string
  readonly property: string
  readonly required: boolean
  readonly many: boolean
  readonly maxCount?: string
  readonly default?: string
}

type Turned = { readonly path: string; readonly many: boolean }

type Carried = { readonly puts: readonly Page[]; readonly turned: readonly Turned[] }

function placedIn(
  text: string,
  source: ts.SourceFile,
  record: ts.ObjectLiteralExpression,
  after: string,
  put: string
): Splice {
  const anchor =
    record.properties[placeOf(record, after)] ?? record.properties[record.properties.length - 1]
  if (anchor === undefined) {
    const opened = record.getStart(source) + 1
    return { from: opened, to: opened, put: ` ${put},` }
  }
  const started = anchor.getStart(source)
  const indent = text.slice(text.lastIndexOf("\n", started) + 1, started)
  const ended = anchor.getEnd()
  if (indent.trim() !== "") return { from: ended, to: ended, put: `, ${put}` }
  return { from: ended, to: ended, put: `,\n${indent}${put}` }
}

function fieldIn(
  text: string,
  source: ts.SourceFile,
  record: ts.ObjectLiteralExpression,
  key: string,
  put: string,
  after: string
): Splice {
  const held = record.properties[placeOf(record, key)]
  if (held === undefined || !ts.isPropertyAssignment(held)) {
    return placedIn(text, source, record, after, `${key}: ${put}`)
  }
  return { from: held.initializer.getStart(source), to: held.initializer.getEnd(), put }
}

function statedAnew(
  text: string,
  source: ts.SourceFile,
  record: ts.ObjectLiteralExpression,
  given: Asked
): readonly Splice[] {
  const found: Splice[] = [
    fieldIn(text, source, record, REQUIRED, String(given.required), PAGE_PROPERTY),
    fieldIn(text, source, record, MANY, String(given.many), REQUIRED),
  ]
  if (given.many) {
    found.push(fieldIn(text, source, record, MAX_COUNT, given.maxCount ?? NOTHING, MANY))
    return found
  }
  const at = placeOf(record, MAX_COUNT)
  if (at >= 0) found.push(without(text, source, record, record.properties, at))
  return found
}

function declaredAnew(world: World, given: Asked): readonly FileChange[] | string {
  const text = world.textOf(given.at)
  if (text === null) return `\`${given.at}\` could not be read`
  const source = parsedAs(given.at, text)
  const list = listIn(source, PROPERTIES)
  if (list === null) return `\`${given.at}\` states no \`${PROPERTIES}\``
  const at = matchingIn(list, PAGE_PROPERTY, given.property)[0]
  const record = at === undefined ? undefined : list.elements[at]
  if (record === undefined || !ts.isObjectLiteralExpression(record)) {
    return `\`${given.at}\` declares no \`${given.property}\``
  }
  return splicedIn(given.at, text, statedAnew(text, source, record, given))
}

function defaultIn(
  world: World,
  given: Asked,
  value: Value,
  key: string,
  path: string
): readonly Page[] | string {
  if (!given.required) return []
  const said = given.default
  if (said === undefined) {
    return `\`${path}\` states no \`${key}\`, and \`${key}\` becomes required with no default said`
  }
  const after = afterIn(world, value, key)
  const put = given.many ? `[${said}]` : said
  const written: Written =
    after === null
      ? { written: "put", key, value: put }
      : { written: "put", key, value: put, after }
  return [{ path, written: [written] }]
}

function carriedIn(world: World, given: Asked, slug: string, key: string): Carried | string {
  const puts: Page[] = []
  const turned: Turned[] = []
  for (const kind of world.index.kindsUnder(slug)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      const held = value[key]
      if (held === undefined) {
        const made = defaultIn(world, given, value, key, path)
        if (typeof made === "string") return made
        puts.push(...made)
        continue
      }
      if (Array.isArray(held)) {
        if (given.many) continue
        if (held.length !== 1) {
          return `\`${path}\` states ${held.length} values under \`${key}\`, and \`${key}\` holds one`
        }
        turned.push({ path, many: false })
        continue
      }
      if (given.many) turned.push({ path, many: true })
    }
  }
  return { puts, turned }
}

function wrappedIn(source: ts.SourceFile, value: ts.Expression, many: boolean): string | null {
  if (many) return `[${value.getText(source)}]`
  if (!ts.isArrayLiteralExpression(value) || value.elements.length !== 1) return null
  const only = value.elements[0]
  return only === undefined ? null : only.getText(source)
}

function turnedAt(world: World, one: Turned, key: string): readonly FileChange[] | string {
  const text = world.textOf(one.path)
  if (text === null) return `\`${one.path}\` could not be read`
  const source = parsedAs(one.path, text)
  const owner = literalIn(source)
  if (owner === null) return `\`${one.path}\` exports no object`
  const held = owner.properties[placeOf(owner, key)]
  if (held === undefined || !ts.isPropertyAssignment(held)) {
    return `\`${one.path}\` states no \`${key}\``
  }
  const value = held.initializer
  const put = wrappedIn(source, value, one.many)
  if (put === null) return `\`${one.path}\` holds under \`${key}\` what no list unwraps`
  return spliced(one.path, text, {
    from: value.getStart(source),
    to: value.getEnd(),
    put,
  })
}

export function changePropertyOnPageType(world: World, given: Asked): Said {
  const slug = typeSlugIn(given.at)
  if (slug === null) {
    return refusing(`\`${given.at}\` names no page type, so no declaration is stated anew`)
  }
  const carried = world.index.propertiesIfNamed(slug)
  if (carried === null) return refusing(`\`${slug}\` names no page type`)
  const one = carried.find((each) => identityOf(each) === given.property)
  if (one === undefined) return refusing(`a \`${slug}\` carries no \`${given.property}\``)
  const own = declaredAnew(world, given)
  if (typeof own === "string") return refusing(own)
  const held = carriedIn(world, given, slug, one.key)
  if (typeof held === "string") return refusing(held)
  const made = editsOver(world, held.puts)
  if (typeof made === "string") return refusing(made)
  const edits: FileChange[] = [...own, ...made]
  for (const turn of held.turned) {
    const answer = turnedAt(world, turn, one.key)
    if (typeof answer === "string") return refusing(answer)
    edits.push(...answer)
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return changePropertyOnPageType(world, given)
}
