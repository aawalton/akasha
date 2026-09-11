import { dirname } from "node:path"
import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  anchorIn,
  type Carried,
  importsIn,
  lineFor,
  namedIn,
  namesIn,
  namingOf,
  openedIn,
  withoutOne,
} from "akasha/changes/modules/import-lines/import-lines.module.code.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"
import {
  landingOf,
  specifierFor,
} from "akasha/code-system/code-specifier/code-specifier.module.code.ts"
import { reachingOf } from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"
import ts from "typescript"

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

type Carrying = Carried & { readonly naming: string }

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

function textOfNode(text: string, one: ts.Node): string {
  return text.slice(one.getStart(one.getSourceFile()), one.getEnd())
}

function namingsIn(source: ts.SourceFile): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    if (bound === null) continue
    for (const each of bound.elements) found.set(each.name.text, namingOf(each))
  }
  return found
}

function carriedIn(declared: Held): ReadonlyMap<string, Carrying> {
  const source = declared.getSourceFile()
  const held = importsIn(source)
  const naming = namingsIn(source)
  const found = new Map<string, Carrying>()
  for (const name of namesIn(declared)) {
    const named = held.get(name)
    if (named !== undefined) found.set(name, { ...named, naming: naming.get(name) ?? name })
  }
  return found
}

function namedAs(name: string, one: Carrying): string {
  return one.naming === name ? name : `${one.naming} as ${name}`
}

function spelledFor(given: Asked, from: string): string {
  if (!from.startsWith(BESIDE)) return from
  const held = landingOf(given.from, from)
  return held === null ? from : specifierFor(dirname(given.to), held)
}

function ownIn(given: Asked, from: string): boolean {
  return from.startsWith(BESIDE) && landingOf(given.from, from) === given.to
}

function bodyFor(carried: ReadonlyMap<string, Carrying>, passage: string, given: Asked): string {
  const lines = [...carried]
    .filter(([, named]) => !ownIn(given, named.from))
    .sort((one, two) => one[1].from.localeCompare(two[1].from))
    .map(([name, one]) => lineFor(namedAs(name, one), spelledFor(given, one.from), one.type))
  const held = `${passage.replace(/^\n+/, "").trimEnd()}${LINE}`
  return lines.length === 0 ? held : `${lines.join(LINE)}${LINE}${LINE}${held}`
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
    if (bound === null) continue
    const gone = bound.elements.find((each) => each.name.text === named)
    if (gone === undefined) continue
    if (bound.elements.length > 1) {
      return { at, old: textOfNode(text, one), new: withoutOne(text, one, bound, gone) }
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
  const each = bound.elements.find((held) => namingOf(held) === given.of)
  if (each === undefined) return textOfNode(text, one)
  const type = one.importClause?.isTypeOnly === true || each.isTypeOnly
  const naming = each.propertyName === undefined ? given.of : `${given.of} as ${each.name.text}`
  const line = `import ${type ? "type " : ""}{ ${naming} } from ${landing}`
  return `${withoutOne(text, one, bound, each)}${LINE}${line}`
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
    if (!bound.elements.some((each) => namingOf(each) === given.of)) continue
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
    if (at === given.to) continue
    const held = world.textOf(at)
    if (held === null) return { refused: `\`${at}\` names what moved and could not be read` }
    const one = repointedAt(held, at, given, naming)
    if (one !== null) found.push(one)
  }
  return { found }
}

function ontoFor(
  given: Asked,
  whole: string,
  carried: ReadonlyMap<string, Carrying>,
  passage: string
): Passage | Refused {
  const first = parsedAs(given.to, whole)
  const gone = droppedFor(whole, first, given.to, given.of)
  const landed = gone === null ? whole : whole.replace(gone.old, gone.new)
  const source = parsedAs(given.to, landed)
  const held = importsIn(source)
  const lines: string[] = []
  for (const [name, one] of carried) {
    if (ownIn(given, one.from)) continue
    const spelled = spelledFor(given, one.from)
    const there = held.get(name)
    if (there === undefined) {
      lines.push(lineFor(namedAs(name, one), spelled, one.type))
      continue
    }
    if (there.from !== spelled) {
      return { refused: `\`${given.to}\` already names \`${name}\` from \`${there.from}\`` }
    }
  }
  const opened = openedIn(landed, source, lines)
  const trimmed = passage.replace(/^\n+/, "").trimEnd()
  return { at: given.to, old: whole, new: `${opened.trimEnd()}${LINE}${LINE}${trimmed}${LINE}` }
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

function unexportedIn(source: ts.SourceFile, declared: Held, of: string): string | null {
  const held = importsIn(source)
  for (const name of namesIn(declared)) {
    if (name === of || held.has(name)) continue
    const one = declaredIn(source, name)
    if (one !== null && !exported(one)) return name
  }
  return null
}

function planned(world: World, given: Asked): Plan | Refused {
  if (given.from === given.to) return { refused: `\`${given.to}\` is the path it already sits at` }
  const text = world.textOf(given.from)
  if (text === null) return { refused: `\`${given.from}\` could not be read` }
  const landed = world.textOf(given.to)
  const source = parsedAs(given.from, text)
  const declared = declaredIn(source, given.of)
  if (declared === null) {
    return { refused: `\`${given.from}\` declares nothing named \`${given.of}\`` }
  }
  if (!exported(declared)) return { refused: `\`${given.of}\` is declared under no export` }
  const behind = unexportedIn(source, declared, given.of)
  if (behind !== null) {
    const held = `\`${behind}\`, which \`${given.from}\` declares under no export`
    return { refused: `\`${given.of}\` names ${held}` }
  }
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
