import {
  refusing,
  spliced,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { listIn } from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

export type Asked = {
  readonly pageType: string
  readonly key: string
  readonly atMost?: number | null
}

export type Carried = {
  readonly path: string
  readonly carried: readonly string[]
}

export function keptInOrder(values: readonly string[]): ReadonlySet<number> {
  const longest = values.map(() => 1)
  for (let at = 1; at < values.length; at += 1) {
    for (let above = 0; above < at; above += 1) {
      if ((values[above] ?? "") > (values[at] ?? "")) continue
      const held = (longest[above] ?? 0) + 1
      if (held > (longest[at] ?? 0)) longest[at] = held
    }
  }
  let want = 0
  for (const one of longest) if (one > want) want = one
  const kept = new Set<number>()
  let after: string | null = null
  for (let at = values.length - 1; at >= 0; at -= 1) {
    if ((longest[at] ?? 0) !== want) continue
    const one = values[at] ?? ""
    if (after !== null && one > after) continue
    kept.add(at)
    after = one
    want -= 1
  }
  return kept
}

export function carriedIn(values: readonly string[]): readonly string[] {
  const kept = keptInOrder(values)
  return values.filter((_one, at) => !kept.has(at))
}

export function valuesIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  const found: string[] = []
  for (const one of held) {
    if (typeof one !== "string") return null
    found.push(one)
  }
  return found
}

export function outOfOrderIn(world: World, given: Asked): readonly Carried[] | string {
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return `\`${given.pageType}\` names no page type`
  }
  const found: Carried[] = []
  const atMost = given.atMost ?? null
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (atMost !== null && found.length >= atMost) return found
      const values = valuesIn(value[given.key])
      if (values === null) continue
      const carried = carriedIn(values)
      if (carried.length === 0) continue
      found.push({ path, carried })
    }
  }
  return found
}

export function sortedOrder(spellings: readonly string[]): readonly number[] {
  const order = spellings.map((_one, at) => at)
  order.sort((here, there) => {
    const one = spellings[here] ?? ""
    const two = spellings[there] ?? ""
    if (one < two) return -1
    return one > two ? 1 : here - there
  })
  return order
}

export function orderedIn(
  source: ts.SourceFile,
  text: string,
  holding: ts.ArrayLiteralExpression
): Splice | null {
  const held: string[] = []
  for (const one of holding.elements) {
    if (!ts.isStringLiteral(one)) return null
    held.push(one.text)
  }
  const first = holding.elements[0]
  const last = holding.elements[holding.elements.length - 1]
  if (first === undefined || last === undefined) return null
  const order = sortedOrder(held)
  let put = ""
  let at = first.getStart(source)
  for (let where = 0; where < holding.elements.length; where += 1) {
    const slot = holding.elements[where]
    const said = holding.elements[order[where] ?? where]
    if (slot === undefined || said === undefined) return null
    put = `${put}${text.slice(at, slot.getStart(source))}${said.getText(source)}`
    at = slot.getEnd()
  }
  return { from: first.getStart(source), to: last.getEnd(), put }
}

export function editsFor(world: World, given: Asked, at: string): readonly FileChange[] | string {
  const text = world.textOf(at)
  if (text === null) return `\`${at}\` could not be read`
  const source = parsedAs(at, text)
  const holding = listIn(source, given.key)
  if (holding === null) return `\`${at}\` states no list under \`${given.key}\``
  const splice = orderedIn(source, text, holding)
  if (splice === null) return `\`${at}\` holds under \`${given.key}\` what no order sorts`
  return spliced(at, text, splice)
}

export function sortPropertyValuesOnEveryPage(world: World, given: Asked): Said {
  const held = outOfOrderIn(world, given)
  if (typeof held === "string") return refusing(held)
  if (held.length === 0) {
    return refusing(`no \`${given.pageType}\` holds \`${given.key}\` out of the order it sorts in`)
  }
  const edits: FileChange[] = []
  for (const one of held) {
    const made = editsFor(world, given, one.path)
    if (typeof made === "string") return refusing(made)
    edits.push(...made)
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return sortPropertyValuesOnEveryPage(world, given)
}
