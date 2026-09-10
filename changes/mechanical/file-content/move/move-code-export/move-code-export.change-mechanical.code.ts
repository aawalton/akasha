import { dirname } from "node:path"
import { parsedAs } from "@akasha/code/code-source"
import { landingOf, specifierFor } from "@akasha/code/code-specifier"
import { reachingOf } from "@akasha/indexes/package-reaching"
import ts from "typescript"
import { refusing, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer, FileChange } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const ADD_FILE_CODE = "change-mechanical/add-file-code"

const CHANGE_FILE_CONTENT = "change-mechanical-file-content/change-file-content"

const LINE = "\n"

const EVERY = "*"

const BESIDE = "."

export type Asked = {
  readonly from: string
  readonly to: string
  readonly of: string
}

type Passage = {
  readonly at: string
  readonly old: string
  readonly new: string
}

type Plan = {
  readonly taken: Passage
  readonly body: string
  readonly adding: boolean
  readonly onto: Passage | null
  readonly after: readonly Passage[]
}

type Refused = { readonly refused: string }

type Held =
  | ts.TypeAliasDeclaration
  | ts.InterfaceDeclaration
  | ts.FunctionDeclaration
  | ts.VariableStatement

function declaresOne(one: ts.VariableStatement, of: string): boolean {
  return one.declarationList.declarations.some(
    (each) => ts.isIdentifier(each.name) && each.name.text === of
  )
}

function declaredIn(source: ts.SourceFile, of: string): Held | null {
  for (const one of source.statements) {
    if (ts.isTypeAliasDeclaration(one) && one.name.text === of) return one
    if (ts.isInterfaceDeclaration(one) && one.name.text === of) return one
    if (ts.isFunctionDeclaration(one) && one.name?.text === of) return one
    if (ts.isVariableStatement(one) && declaresOne(one, of)) return one
  }
  return null
}

function exported(declared: Held): boolean {
  return (declared.modifiers ?? []).some((one) => one.kind === ts.SyntaxKind.ExportKeyword)
}

function typed(declared: Held): boolean {
  return ts.isTypeAliasDeclaration(declared) || ts.isInterfaceDeclaration(declared)
}

function spelt(one: ts.Identifier): boolean {
  const up = one.parent
  if (ts.isImportSpecifier(up) || ts.isImportClause(up) || ts.isNamespaceImport(up)) return true
  if (ts.isPropertyAccessExpression(up) && up.name === one) return true
  if (ts.isPropertyAssignment(up) && up.name === one) return true
  return ts.isPropertySignature(up) && up.name === one
}

function namesIn(held: ts.Node): readonly string[] {
  const found: string[] = []
  const walked = (one: ts.Node): undefined => {
    if (ts.isTypeReferenceNode(one) && ts.isIdentifier(one.typeName)) found.push(one.typeName.text)
    if (ts.isIdentifier(one) && !spelt(one)) found.push(one.text)
    return ts.forEachChild(one, walked)
  }
  walked(held)
  return found
}

function namedIn(one: ts.ImportDeclaration): ts.NamedImports | null {
  const bound = one.importClause?.namedBindings
  return bound !== undefined && ts.isNamedImports(bound) ? bound : null
}

function textOfNode(text: string, one: ts.Node): string {
  return text.slice(one.getStart(one.getSourceFile()), one.getEnd())
}

type Carried = {
  readonly from: string
  readonly type: boolean
}

function importsIn(source: ts.SourceFile): ReadonlyMap<string, Carried> {
  const found = new Map<string, Carried>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    const named = one.moduleSpecifier
    if (bound === null || !ts.isStringLiteral(named)) continue
    const whole = one.importClause?.isTypeOnly === true
    for (const each of bound.elements) {
      found.set(each.name.text, { from: named.text, type: whole || each.isTypeOnly })
    }
  }
  return found
}

function carriedIn(declared: Held): ReadonlyMap<string, Carried> {
  const held = importsIn(declared.getSourceFile())
  const found = new Map<string, Carried>()
  for (const name of namesIn(declared)) {
    const named = held.get(name)
    if (named !== undefined) found.set(name, named)
  }
  return found
}

function lineFor(name: string, spelled: string, type: boolean): string {
  return `import ${type ? "type " : ""}{ ${name} } from ${JSON.stringify(spelled)}`
}

function spelledFor(given: Asked, from: string): string {
  if (!from.startsWith(BESIDE)) return from
  const held = landingOf(given.from, from)
  return held === null ? from : specifierFor(dirname(given.to), held)
}

function bodyFor(carried: ReadonlyMap<string, Carried>, passage: string, given: Asked): string {
  const lines = [...carried]
    .sort((one, two) => one[1].from.localeCompare(two[1].from))
    .map(([name, named]) => lineFor(name, spelledFor(given, named.from), named.type))
  const held = `${passage.replace(/^\n+/, "").trimEnd()}${LINE}`
  return lines.length === 0 ? held : `${lines.join(LINE)}${LINE}${LINE}${held}`
}

function withoutName(
  text: string,
  one: ts.ImportDeclaration,
  bound: ts.NamedImports,
  named: string
): string {
  const source = one.getSourceFile()
  const kept = bound.elements
    .filter((each) => each.name.text !== named)
    .map((each) => text.slice(each.getStart(source), each.getEnd()))
  const head = text.slice(one.getStart(source), bound.getStart(source))
  const tail = text.slice(bound.getEnd(), one.getEnd())
  return `${head}{ ${kept.join(", ")} }${tail}`
}

function droppedFor(
  text: string,
  source: ts.SourceFile,
  at: string,
  named: string
): Passage | null {
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    if (bound === null || !bound.elements.some((each) => each.name.text === named)) continue
    if (bound.elements.length > 1) {
      return { at, old: textOfNode(text, one), new: withoutName(text, one, bound, named) }
    }
    const ended = one.getEnd()
    const from = one.getStart(source)
    return { at, old: text.slice(from, text[ended] === LINE ? ended + 1 : ended), new: "" }
  }
  return null
}

function droppedIn(
  text: string,
  source: ts.SourceFile,
  at: string,
  carried: ReadonlyMap<string, Carried>
): readonly Passage[] {
  const still = new Set(namesIn(source))
  const found: Passage[] = []
  for (const named of carried.keys()) {
    if (still.has(named)) continue
    const dropped = droppedFor(text, source, at, named)
    if (dropped !== null) found.push(dropped)
  }
  return found
}

function anchorIn(text: string, source: ts.SourceFile): string | null {
  let found: string | null = null
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    found = textOfNode(text, one)
  }
  return found
}

function leftBy(text: string, gone: readonly Passage[]): string {
  let held = text
  for (const one of gone) held = held.replace(one.old, one.new)
  return held
}

function backIn(text: string, source: ts.SourceFile, given: Asked, type: boolean): Passage | null {
  if (!namesIn(source).includes(given.of)) return null
  const line = lineFor(given.of, specifierFor(dirname(given.from), given.to), type)
  const anchor = anchorIn(text, source)
  if (anchor === null) return { at: given.from, old: text, new: `${line}${LINE}${LINE}${text}` }
  return { at: given.from, old: anchor, new: `${anchor}${LINE}${line}` }
}

function pointedAt(
  text: string,
  one: ts.ImportDeclaration,
  bound: ts.NamedImports,
  given: Asked,
  landing: string
): string {
  const source = one.getSourceFile()
  const named = one.moduleSpecifier
  if (bound.elements.length === 1) {
    const head = text.slice(one.getStart(source), named.getStart(source))
    return `${head}${landing}${text.slice(named.getEnd(), one.getEnd())}`
  }
  const each = bound.elements.find((held) => held.name.text === given.of)
  const type = one.importClause?.isTypeOnly === true || each?.isTypeOnly === true
  const line = `import ${type ? "type " : ""}{ ${given.of} } from ${landing}`
  return `${withoutName(text, one, bound, given.of)}${LINE}${line}`
}

function rootedIn(naming: ReadonlyMap<string, string>): string | null {
  for (const [specifier, path] of naming) {
    if (path === EVERY && specifier.endsWith(`/${EVERY}`)) return specifier.slice(0, -EVERY.length)
  }
  return null
}

function landingFor(
  at: string,
  spelled: string,
  given: Asked,
  naming: ReadonlyMap<string, string>
): string | null {
  if (spelled.startsWith(BESIDE)) {
    if (landingOf(at, spelled) !== given.from) return null
    return JSON.stringify(specifierFor(dirname(at), given.to))
  }
  const rooted = rootedIn(naming)
  if (rooted === null) return null
  const names = naming.get(spelled) === given.from || spelled === `${rooted}${given.from}`
  return names ? JSON.stringify(`${rooted}${given.to}`) : null
}

function repointedAt(
  text: string,
  at: string,
  given: Asked,
  naming: ReadonlyMap<string, string>
): Passage | null {
  const source = parsedAs(at, text)
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    const named = one.moduleSpecifier
    if (bound === null || !ts.isStringLiteral(named)) continue
    if (!bound.elements.some((each) => each.name.text === given.of)) continue
    const landing = landingFor(at, named.text, given, naming)
    if (landing === null) continue
    return { at, old: textOfNode(text, one), new: pointedAt(text, one, bound, given, landing) }
  }
  return null
}

function repointedIn(world: World, given: Asked): { readonly found: readonly Passage[] } | Refused {
  const found: Passage[] = []
  const naming = reachingOf(world.index.manifestsBeside(world.index.fileKeysAt()), world.textOf)
  for (const at of world.index.importersOf(given.from)) {
    const held = world.textOf(at)
    if (held === null) return { refused: `\`${at}\` names what moved and could not be read` }
    const one = repointedAt(held, at, given, naming)
    if (one !== null) found.push(one)
  }
  return { found }
}

function openedIn(landed: string, source: ts.SourceFile, lines: readonly string[]): string {
  if (lines.length === 0) return landed
  const anchor = anchorIn(landed, source)
  if (anchor === null) return `${lines.join(LINE)}${LINE}${LINE}${landed}`
  return landed.replace(anchor, `${anchor}${LINE}${lines.join(LINE)}`)
}

function ontoFor(
  given: Asked,
  landed: string,
  carried: ReadonlyMap<string, Carried>,
  passage: string
): Passage | Refused {
  const source = parsedAs(given.to, landed)
  const held = importsIn(source)
  const lines: string[] = []
  for (const [name, one] of carried) {
    const spelled = spelledFor(given, one.from)
    const there = held.get(name)
    if (there === undefined) {
      lines.push(lineFor(name, spelled, one.type))
      continue
    }
    if (there.from !== spelled) {
      return { refused: `\`${given.to}\` already names \`${name}\` from \`${there.from}\`` }
    }
  }
  const opened = openedIn(landed, source, lines)
  const trimmed = passage.replace(/^\n+/, "").trimEnd()
  return { at: given.to, old: landed, new: `${opened.trimEnd()}${LINE}${LINE}${trimmed}${LINE}` }
}

function planFor(
  given: Asked,
  text: string,
  declared: Held,
  repointed: readonly Passage[],
  landing: { readonly adding: boolean; readonly onto: string | null }
): Plan | Refused {
  const passage = text.slice(declared.getFullStart(), declared.getEnd())
  const left = text.slice(0, declared.getFullStart()) + text.slice(declared.getEnd())
  const carried = carriedIn(declared)
  const source = parsedAs(given.from, left)
  const gone = droppedIn(left, source, given.from, carried)
  const rest = leftBy(left, gone)
  const back = backIn(rest, parsedAs(given.from, rest), given, typed(declared))
  const onto = landing.onto === null ? null : ontoFor(given, landing.onto, carried, passage)
  if (onto !== null && "refused" in onto) return onto
  return {
    taken: { at: given.from, old: passage, new: "" },
    body: bodyFor(carried, passage, given),
    adding: landing.adding,
    onto,
    after: [...gone, ...(back === null ? [] : [back]), ...repointed],
  }
}

function exportedIn(at: string, text: string, of: string): boolean {
  const declared = declaredIn(parsedAs(at, text), of)
  return declared !== null && exported(declared)
}

function planned(world: World, given: Asked): Plan | Refused {
  if (given.from === given.to) return { refused: `\`${given.to}\` is the path it already sits at` }
  const text = world.textOf(given.from)
  if (text === null) return { refused: `\`${given.from}\` could not be read` }
  const landed = world.textOf(given.to)
  const declared = declaredIn(parsedAs(given.from, text), given.of)
  if (declared === null) {
    return { refused: `\`${given.from}\` declares nothing named \`${given.of}\`` }
  }
  if (!exported(declared)) return { refused: `\`${given.of}\` is declared under no export` }
  const repointed = repointedIn(world, given)
  if ("refused" in repointed) return repointed
  const there = landed !== null && exportedIn(given.to, landed, given.of)
  const landing = { adding: landed === null, onto: there ? null : landed }
  return planFor(given, text, declared, repointed.found, landing)
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const made = planned(world, given)
  if ("refused" in made) return refusing(made.refused)
  const taken = await reach(world, CHANGE_FILE_CONTENT, made.taken)
  if (taken.said.refused !== null) return taken.said
  const edits: FileChange[] = [...taken.said.edits]
  let seen = taken.world
  if (made.adding) {
    const added = await reach(seen, ADD_FILE_CODE, { at: given.to, body: made.body })
    if (added.said.refused !== null) return added.said
    edits.push(...added.said.edits)
    seen = added.world
  } else if (made.onto !== null) {
    const put = await reach(seen, CHANGE_FILE_CONTENT, made.onto)
    if (put.said.refused !== null) return put.said
    edits.push(...put.said.edits)
    seen = put.world
  }
  for (const one of made.after) {
    const said = await reach(seen, CHANGE_FILE_CONTENT, one)
    if (said.said.refused !== null) return said.said
    edits.push(...said.said.edits)
    seen = said.world
  }
  return stating(edits)
}
