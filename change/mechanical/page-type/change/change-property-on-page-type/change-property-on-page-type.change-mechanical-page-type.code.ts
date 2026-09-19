import {
  type FileChange,
  refusing,
  type Said,
  type Splice,
  spliced,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { without } from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import { afterIn, holdsIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  listIn,
  literalIn,
  matchingIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  editsOver,
  type Page,
  placeOf,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { spelledAs } from "akasha/change/modules/value-spelling/value-spelling.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { typeSlugIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { identityOf } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import ts from "typescript"

const PROPERTIES = "properties"

const PAGE_PROPERTY = "pageProperty"

const REQUIRED = "required"

const MANY = "many"

const MAX_COUNT = "maxCount"

const DEFAULT = "default"

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

type Spelled = { readonly said: string | null; readonly held: string | null }

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

function besideAt(record: ts.ObjectLiteralExpression): number {
  const count = placeOf(record, MAX_COUNT)
  return count >= 0 ? count : placeOf(record, DEFAULT)
}

function wantedIn(given: Asked, said: string | null): readonly [string, string] | null {
  if (given.many) return [MAX_COUNT, given.maxCount ?? NOTHING]
  return said === null ? null : [DEFAULT, said]
}

function besideAnew(
  text: string,
  source: ts.SourceFile,
  record: ts.ObjectLiteralExpression,
  wanted: readonly [string, string] | null
): readonly Splice[] {
  const at = besideAt(record)
  if (wanted === null) {
    return at < 0 ? [] : [without(text, source, record, record.properties, at)]
  }
  const held = record.properties[at]
  const put = `${wanted[0]}: ${wanted[1]}`
  if (held === undefined) return [placedIn(text, source, record, MANY, put)]
  return [{ from: held.getStart(source), to: held.getEnd(), put }]
}

function statedAnew(
  text: string,
  source: ts.SourceFile,
  record: ts.ObjectLiteralExpression,
  given: Asked,
  said: string | null
): readonly Splice[] {
  return [
    fieldIn(text, source, record, REQUIRED, String(given.required), PAGE_PROPERTY),
    fieldIn(text, source, record, MANY, String(given.many), REQUIRED),
    ...besideAnew(text, source, record, wantedIn(given, said)),
  ]
}

function spelledFor(world: World, given: Asked, slug: string, key: string): Spelled | string {
  const said = given.default
  if (said === undefined) return { said: null, held: null }
  if (given.many) {
    return `\`${key}\` holds many values, and a declaration holding many states no default`
  }
  const holds = holdsIn(world, { type: slug }, key)
  const held = spelledAs(said, holds ?? undefined)
  if (held === null) return `\`${said}\` is no ${holds}, so \`${key}\` gains no default`
  return { said: JSON.stringify(said), held }
}

function declaredAnew(
  world: World,
  given: Asked,
  said: string | null
): readonly FileChange[] | string {
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
  return splicedIn(given.at, text, statedAnew(text, source, record, given, said))
}

function defaultIn(
  world: World,
  gains: string | null,
  value: Value,
  key: string,
  path: string
): readonly Page[] | string {
  if (gains === null) {
    return `\`${path}\` states no \`${key}\`, and \`${key}\` becomes required with no default said`
  }
  const after = afterIn(world, value, key)
  const written: Written =
    after === null
      ? { written: "put", key, value: gains }
      : { written: "put", key, value: gains, after }
  return [{ path, written: [written] }]
}

function carriedIn(
  world: World,
  given: Asked,
  slug: string,
  key: string,
  gains: string | null
): Carried | string {
  const puts: Page[] = []
  const turned: Turned[] = []
  for (const kind of world.index.kindsUnder(slug)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      const held = value[key]
      if (held === undefined) {
        if (!given.required) continue
        const made = defaultIn(world, gains, value, key, path)
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
  const spelled = spelledFor(world, given, slug, one.key)
  if (typeof spelled === "string") return refusing(spelled)
  const own = declaredAnew(world, given, spelled.said)
  if (typeof own === "string") return refusing(own)
  const held = carriedIn(world, given, slug, one.key, spelled.held)
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
