import { basename, dirname } from "node:path"
import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { refusing, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer, FileChange } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const ADD_FILE_CODE = "change-mechanical/add-file-code"

const CHANGE_FILE_CONTENT = "change-mechanical-file-content/change-file-content"

const LINE = "\n"

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
  readonly after: readonly Passage[]
}

type Refused = { readonly refused: string }

function aliasIn(source: ts.SourceFile, of: string): ts.TypeAliasDeclaration | null {
  for (const one of source.statements) {
    if (ts.isTypeAliasDeclaration(one) && one.name.text === of) return one
  }
  return null
}

function exported(declared: ts.TypeAliasDeclaration): boolean {
  return (declared.modifiers ?? []).some((one) => one.kind === ts.SyntaxKind.ExportKeyword)
}

function namesIn(held: ts.Node): readonly string[] {
  const found: string[] = []
  const walked = (one: ts.Node): undefined => {
    if (ts.isTypeReferenceNode(one) && ts.isIdentifier(one.typeName)) found.push(one.typeName.text)
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

function importsIn(source: ts.SourceFile): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    const named = one.moduleSpecifier
    if (bound === null || !ts.isStringLiteral(named)) continue
    for (const each of bound.elements) found.set(each.name.text, named.text)
  }
  return found
}

function carriedIn(declared: ts.TypeAliasDeclaration): ReadonlyMap<string, string> {
  const held = importsIn(declared.getSourceFile())
  const found = new Map<string, string>()
  for (const name of namesIn(declared.type)) {
    const named = held.get(name)
    if (named !== undefined) found.set(name, named)
  }
  return found
}

function bodyFor(carried: ReadonlyMap<string, string>, passage: string): string {
  const lines = [...carried]
    .sort((one, two) => one[1].localeCompare(two[1]))
    .map(([name, named]) => `import type { ${name} } from ${JSON.stringify(named)}`)
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
  carried: ReadonlyMap<string, string>
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

function anchorIn(text: string, source: ts.SourceFile, gone: readonly Passage[]): string | null {
  let found: string | null = null
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const whole = textOfNode(text, one)
    if (gone.some((each) => each.old.includes(whole))) continue
    found = whole
  }
  return found
}

function backIn(
  text: string,
  source: ts.SourceFile,
  given: Asked,
  gone: readonly Passage[]
): Passage | null {
  if (!namesIn(source).includes(given.of)) return null
  const line = `import type { ${given.of} } from ${JSON.stringify(`./${basename(given.to)}`)}`
  const anchor = anchorIn(text, source, gone)
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
  const line = `import type { ${given.of} } from ${landing}`
  return `${withoutName(text, one, bound, given.of)}${LINE}${line}`
}

function landingIn(spelled: string, given: Asked): string {
  const stem = basename(given.from)
  return JSON.stringify(`${spelled.slice(0, -stem.length)}${basename(given.to)}`)
}

function repointedAt(text: string, at: string, given: Asked): Passage | null {
  const source = parsedAs(at, text)
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    const named = one.moduleSpecifier
    if (bound === null || !ts.isStringLiteral(named)) continue
    if (!named.text.startsWith(".") || !named.text.endsWith(basename(given.from))) continue
    if (!bound.elements.some((each) => each.name.text === given.of)) continue
    const landing = landingIn(named.text, given)
    return { at, old: textOfNode(text, one), new: pointedAt(text, one, bound, given, landing) }
  }
  return null
}

function repointedIn(world: World, given: Asked): { readonly found: readonly Passage[] } | Refused {
  const found: Passage[] = []
  for (const at of world.index.importersOf(given.from)) {
    const held = world.textOf(at)
    if (held === null) return { refused: `\`${at}\` names what moved and could not be read` }
    const one = repointedAt(held, at, given)
    if (one !== null) found.push(one)
  }
  return { found }
}

function planFor(
  given: Asked,
  text: string,
  declared: ts.TypeAliasDeclaration,
  repointed: readonly Passage[],
  adding: boolean
): Plan {
  const passage = text.slice(declared.getFullStart(), declared.getEnd())
  const left = text.slice(0, declared.getFullStart()) + text.slice(declared.getEnd())
  const carried = carriedIn(declared)
  const source = parsedAs(given.from, left)
  const gone = droppedIn(left, source, given.from, carried)
  const back = backIn(left, source, given, gone)
  return {
    taken: { at: given.from, old: passage, new: "" },
    body: bodyFor(carried, passage),
    adding,
    after: [...gone, ...(back === null ? [] : [back]), ...repointed],
  }
}

function exportedIn(at: string, text: string, of: string): boolean {
  const declared = aliasIn(parsedAs(at, text), of)
  return declared !== null && exported(declared)
}

function planned(world: World, given: Asked): Plan | Refused {
  if (given.from === given.to) return { refused: `\`${given.to}\` is the path it already sits at` }
  if (dirname(given.from) !== dirname(given.to)) {
    return { refused: `\`${given.to}\` sits in another folder than \`${given.from}\`` }
  }
  const text = world.textOf(given.from)
  if (text === null) return { refused: `\`${given.from}\` could not be read` }
  const landed = world.textOf(given.to)
  if (landed !== null && !exportedIn(given.to, landed, given.of)) {
    return { refused: `\`${given.to}\` is a body declaring no exported type named \`${given.of}\`` }
  }
  const declared = aliasIn(parsedAs(given.from, text), given.of)
  if (declared === null) {
    return { refused: `\`${given.from}\` declares no type named \`${given.of}\`` }
  }
  if (!exported(declared)) return { refused: `\`${given.of}\` is declared under no export` }
  const repointed = repointedIn(world, given)
  if ("refused" in repointed) return repointed
  return planFor(given, text, declared, repointed.found, landed === null)
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
  }
  for (const one of made.after) {
    const said = await reach(seen, CHANGE_FILE_CONTENT, one)
    if (said.said.refused !== null) return said.said
    edits.push(...said.said.edits)
    seen = said.world
  }
  return stating(edits)
}
