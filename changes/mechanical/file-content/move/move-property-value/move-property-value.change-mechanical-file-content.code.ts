import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { refusing, spliced, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

export type Given = {
  readonly at: string
  readonly key: string
  readonly from: number
  readonly to: number
}

type Framed = {
  readonly lead: string
  readonly values: readonly string[]
  readonly seams: readonly string[]
  readonly tail: string
}

export function placesOf(count: number, from: number, to: number): readonly number[] {
  const held: number[] = []
  for (let at = 0; at < count; at += 1) {
    if (at !== from - 1) held.push(at)
  }
  held.splice(to - 1, 0, from - 1)
  return held
}

function placeSaid(key: string, count: number, place: number): string | null {
  if (Number.isInteger(place) && place >= 1 && place <= count) return null
  return `\`${key}\` holds ${count} values, and place ${place} is none of them`
}

function framedIn(
  text: string,
  source: ts.SourceFile,
  holding: ts.ArrayLiteralExpression
): Framed | null {
  const first = holding.elements[0]
  const last = holding.elements[holding.elements.length - 1]
  if (first === undefined || last === undefined) return null
  const values: string[] = []
  const seams: string[] = []
  let past = first.getStart(source)
  for (const one of holding.elements) {
    const opened = one.getStart(source)
    if (values.length > 0) seams.push(text.slice(past, opened))
    values.push(text.slice(opened, one.getEnd()))
    past = one.getEnd()
  }
  return {
    lead: text.slice(holding.getStart(source) + 1, first.getStart(source)),
    values,
    seams,
    tail: text.slice(last.getEnd(), holding.getEnd() - 1),
  }
}

function laidOut(framed: Framed, places: readonly number[]): string {
  let said = framed.lead
  for (const [at, place] of places.entries()) {
    if (at > 0) said += framed.seams[at - 1] ?? ""
    said += framed.values[place] ?? ""
  }
  return said + framed.tail
}

export function movedValue(path: string, text: string, given: Given): Said {
  const source = parsedAs(path, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${path}\` exports no object`)
  const one = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
  )
  if (one === undefined || !ts.isPropertyAssignment(one)) {
    return refusing(`\`${path}\` states no \`${given.key}\``)
  }
  const holding = one.initializer
  if (!ts.isArrayLiteralExpression(holding)) {
    return refusing(`\`${given.key}\` holds one value, so that value has nowhere to go`)
  }
  const count = holding.elements.length
  const away = placeSaid(given.key, count, given.from)
  if (away !== null) return refusing(away)
  const onto = placeSaid(given.key, count, given.to)
  if (onto !== null) return refusing(onto)
  if (given.from === given.to) {
    return refusing(`place ${given.to} of \`${given.key}\` is where that value sits already`)
  }
  const framed = framedIn(text, source, holding)
  if (framed === null) return refusing(`\`${given.key}\` holds no value to carry`)
  return stating(
    spliced(path, text, {
      from: holding.getStart(source) + 1,
      to: holding.getEnd() - 1,
      put: laidOut(framed, placesOf(count, given.from, given.to)),
    })
  )
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so nothing is carried`)
  return movedValue(given.at, text, given)
}
