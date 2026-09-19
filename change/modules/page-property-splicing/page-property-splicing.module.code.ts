import {
  type FileChange,
  type Splice,
  splicedIn,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  inOrder,
  without,
  withProperty,
  withRecord,
  withValue,
} from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  keyOf,
  literalIn,
  matchingIn,
  recordsIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

export type Written =
  | {
      readonly written: "put"
      readonly key: string
      readonly value: string
      readonly after?: string
      readonly insteadOf?: string
    }
  | { readonly written: "dropped"; readonly key: string }
  | {
      readonly written: "listed"
      readonly key: string
      readonly value: string
      readonly after?: string
      readonly sorted?: boolean
    }
  | { readonly written: "valueGone"; readonly key: string; readonly values: readonly string[] }
  | {
      readonly written: "recorded"
      readonly key: string
      readonly record: string
      readonly after?: string
    }
  | {
      readonly written: "recordGone"
      readonly key: string
      readonly where: string
      readonly is: string
    }

export type Page = {
  readonly path: string
  readonly written: readonly Written[]
}

export function placeOf(owner: ts.ObjectLiteralExpression, key: string): number {
  return owner.properties.findIndex((one) => ts.isPropertyAssignment(one) && keyOf(one) === key)
}

function putIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  one: Written & { readonly written: "put" }
): Splice | string {
  const put = `${one.key}: ${one.value}`
  if (one.insteadOf === undefined) return withProperty(text, source, owner, put, one.after)
  const was = owner.properties[placeOf(owner, one.insteadOf)]
  if (was === undefined) return `\`${one.insteadOf}\` is stated nowhere, so \`${put}\` has no place`
  return { from: was.getStart(source), to: was.getEnd(), put }
}

function heldIn(owner: ts.ObjectLiteralExpression, key: string): ts.Expression | null {
  const one = owner.properties[placeOf(owner, key)]
  return one === undefined || !ts.isPropertyAssignment(one) ? null : one.initializer
}

function listedIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  one: Written & { readonly written: "listed" }
): Splice | string {
  const holding = heldIn(owner, one.key)
  if (holding === null) {
    return withProperty(text, source, owner, `${one.key}: [${one.value}]`, one.after)
  }
  if (!ts.isArrayLiteralExpression(holding)) {
    return `\`${one.key}\` holds one value, so \`${one.value}\` is a restatement`
  }
  if (holding.elements.some((each) => each.getText(source) === one.value)) {
    return `\`${one.key}\` holds \`${one.value}\` already`
  }
  return one.sorted === true
    ? inOrder(source, holding, one.value)
    : withValue(source, holding, one.value)
}

function valueGoneIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  one: Written & { readonly written: "valueGone" }
): Splice | string {
  const said = one.values.join("` or `")
  const holding = heldIn(owner, one.key)
  if (holding === null || !ts.isArrayLiteralExpression(holding)) {
    return `\`${one.key}\` holds no list, so \`${said}\` goes from nothing`
  }
  for (const value of one.values) {
    const at = holding.elements.findIndex((each) => ts.isStringLiteral(each) && each.text === value)
    if (at >= 0) return without(text, source, holding, holding.elements, at)
  }
  return `\`${one.key}\` holds no \`${said}\``
}

function recordedIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  one: Written & { readonly written: "recorded" }
): Splice | string {
  const holding = heldIn(owner, one.key)
  if (holding === null) {
    return withProperty(text, source, owner, `${one.key}: [${one.record}]`, one.after)
  }
  if (!ts.isArrayLiteralExpression(holding)) {
    return `\`${one.key}\` holds one value, so a record is a restatement`
  }
  if (holding.elements.some((each) => each.getText(source) === one.record)) {
    return `\`${one.key}\` holds that record already`
  }
  return withRecord(text, source, holding, one.record)
}

function recordGoneIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  one: Written & { readonly written: "recordGone" }
): Splice | string {
  const holding = heldIn(owner, one.key)
  if (
    holding === null ||
    !ts.isArrayLiteralExpression(holding) ||
    recordsIn(holding).length === 0
  ) {
    return `no record is stated under \`${one.key}\``
  }
  const said = `under \`${one.key}\` states \`${one.is}\` under \`${one.where}\``
  const found = matchingIn(holding, one.where, one.is)
  const at = found[0]
  if (at === undefined) return `no record ${said}`
  if (found.length > 1) return `${found.length} records ${said}, and one change works one`
  return without(text, source, holding, holding.elements, at)
}

function spliceFor(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  one: Written
): Splice | string | null {
  if (one.written === "dropped") {
    const held = placeOf(owner, one.key)
    return held < 0 ? null : without(text, source, owner, owner.properties, held)
  }
  if (one.written === "listed") return listedIn(text, source, owner, one)
  if (one.written === "valueGone") return valueGoneIn(text, source, owner, one)
  if (one.written === "recorded") return recordedIn(text, source, owner, one)
  if (one.written === "recordGone") return recordGoneIn(text, source, owner, one)
  if (placeOf(owner, one.key) >= 0) {
    return `\`${one.key}\` is stated already, so \`${one.value}\` is a restatement`
  }
  return putIn(text, source, owner, one)
}

export function splicesIn(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  written: readonly Written[]
): readonly Splice[] | string {
  const found: Splice[] = []
  for (const one of written) {
    const made = spliceFor(text, source, owner, one)
    if (typeof made === "string") return made
    if (made !== null) found.push(made)
  }
  return found
}

export function editsFor(world: World, one: Page): readonly FileChange[] | string {
  const text = world.textOf(one.path)
  if (text === null) return `\`${one.path}\` could not be read`
  const source = parsedAs(one.path, text)
  const owner = literalIn(source)
  if (owner === null) return `\`${one.path}\` exports no object`
  const spots = splicesIn(text, source, owner, one.written)
  if (typeof spots === "string") return `\`${one.path}\` is refused, and ${spots}`
  return splicedIn(one.path, text, spots)
}

export function editsOver(world: World, pages: readonly Page[]): readonly FileChange[] | string {
  const found: FileChange[] = []
  for (const one of pages) {
    const made = editsFor(world, one)
    if (typeof made === "string") return made
    found.push(...made)
  }
  return found
}
