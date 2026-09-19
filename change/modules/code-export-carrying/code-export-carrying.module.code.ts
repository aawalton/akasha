import { dirname } from "node:path"
import { shadowedIn } from "akasha/change/modules/bound-names/bound-names.module.code.ts"
import type {
  Asked,
  Carrying,
  Going,
  Held,
  Landing,
  Passage,
  Plan,
  Refused,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.types.ts"
import {
  repointedIn,
  spelledAt,
} from "akasha/change/modules/code-export-repointing/code-export-repointing.module.code.ts"
import {
  anchorIn,
  everyIn,
  importsIn,
  linesOf,
  namedAs,
  namesIn,
  namingsIn,
  openedIn,
  type Taken,
  type Taking,
  withName,
  withoutNames,
} from "akasha/change/modules/import-lines/import-lines.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import {
  landingOf,
  type Naming,
  specifierFor,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { reachingOf } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import ts from "typescript"

const LINE = "\n"

const PARTED = "\n\n"

const OPENING = /^\n+/

const BESIDE = "."

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

function carriedIn(
  declared: Held,
  of: ReadonlySet<string>,
  beside: string
): ReadonlyMap<string, Carrying> {
  const source = declared.getSourceFile()
  const held = importsIn(source)
  const every = everyIn(source)
  const naming = namingsIn(source)
  const found = new Map<string, Carrying>()
  for (const name of namesIn(declared)) {
    const named = held.get(name) ?? every.get(name)
    if (named !== undefined) {
      found.set(name, { ...named, naming: naming.get(name) ?? name, every: every.has(name) })
      continue
    }
    const one = of.has(name) ? null : declaredIn(source, name)
    if (one === null) continue
    found.set(name, { from: beside, type: typed(one), naming: name, every: false })
  }
  return found
}

function unionOf(going: readonly Going[]): ReadonlyMap<string, Carrying> {
  const found = new Map<string, Carrying>()
  for (const one of going) {
    for (const [name, held] of one.carried) found.set(name, held)
  }
  return found
}

function takingOf(name: string, spelled: string, one: Carrying): Taking {
  return { name: namedAs(name, one.naming), from: spelled, type: one.type, every: one.every }
}

function spelledFor(given: Asked, from: string): string {
  if (!from.startsWith(BESIDE)) return from
  const held = landingOf(given.from, from)
  return held === null ? from : specifierFor(dirname(given.to), held)
}

function ownIn(given: Asked, from: string, naming: Naming): boolean {
  return landingOf(given.from, from, naming) === given.to
}

function joinedOf(written: readonly Going[]): string {
  const passages = written.map((one) => one.passage.replace(OPENING, "").trimEnd())
  return `${passages.join(PARTED)}${LINE}`
}

function bodyFor(
  carried: ReadonlyMap<string, Carrying>,
  written: readonly Going[],
  given: Asked,
  naming: Naming
): string {
  const lines = linesOf(
    [...carried]
      .filter(([, named]) => !ownIn(given, named.from, naming))
      .sort((one, two) => one[1].from.localeCompare(two[1].from))
      .map(([name, one]) => takingOf(name, spelledFor(given, one.from), one))
  )
  const held = joinedOf(written)
  return lines.length === 0 ? held : `${lines.join(LINE)}${PARTED}${held}`
}

function droppedIn(
  text: string,
  source: ts.SourceFile,
  at: string,
  carried: ReadonlyMap<string, Carrying>
): readonly Passage[] {
  const still = new Set(namesIn(source))
  const gone = [...carried.keys()].filter((named) => !still.has(named))
  return withoutNames(text, source, gone).map((one) => ({ at, ...one }))
}

function leftBy(text: string, gone: readonly Taken[]): string {
  let held = text
  for (const one of gone) held = held.replace(one.old, one.new)
  return held
}

function takenOf(one: Going, spelled: string): Taking {
  return { name: one.name, from: spelled, type: typed(one.declared), every: false }
}

function backIn(
  text: string,
  source: ts.SourceFile,
  given: Asked,
  still: readonly Going[],
  naming: Naming
): Passage | null {
  if (still.length === 0) return null
  const spelled = spelledAt(given, given.to, naming)
  let held = text
  let read = source
  let opened: string | null = null
  let shut = ""
  for (const one of still) {
    const joined = withName(held, read, spelled, one.name, typed(one.declared))
    if (joined === null) continue
    opened = opened ?? joined.old
    shut = joined.new
    held = held.replace(joined.old, joined.new)
    read = parsedAs(given.from, held)
  }
  if (opened !== null) return { at: given.from, old: opened, new: shut }
  if ([...importsIn(source).values()].some((one) => one.from === spelled)) return null
  const line = linesOf(still.map((one) => takenOf(one, spelled))).join(LINE)
  const anchor = anchorIn(text, source)
  if (anchor === null) return { at: given.from, old: text, new: `${line}${PARTED}${text}` }
  return { at: given.from, old: anchor, new: `${anchor}${LINE}${line}` }
}

function namingAt(source: ts.SourceFile, of: ReadonlySet<string>): ts.Statement | null {
  for (const one of source.statements) {
    if (ts.isImportDeclaration(one)) continue
    if (namesIn(one).some((named) => of.has(named))) return one
  }
  return null
}

function laidIn(opened: string, given: Asked, written: readonly Going[]): string {
  const held = joinedOf(written).trimEnd()
  const source = parsedAs(given.to, opened)
  const first = namingAt(source, new Set(written.map((one) => one.name)))
  if (first === null) return `${opened.trimEnd()}${PARTED}${held}${LINE}`
  const head = opened.slice(0, first.getFullStart()).trimEnd()
  const laid = `${held}${PARTED}${opened.slice(first.getFullStart()).trimStart()}`
  return head === "" ? laid : `${head}${PARTED}${laid}`
}

function ontoFor(
  given: Asked,
  whole: string,
  written: readonly Going[],
  carried: ReadonlyMap<string, Carrying>,
  naming: Naming
): Passage | Refused {
  const first = parsedAs(given.to, whole)
  const landed = leftBy(
    whole,
    withoutNames(
      whole,
      first,
      written.map((one) => one.name)
    )
  )
  const source = parsedAs(given.to, landed)
  for (const one of written) {
    const shadowed = shadowedIn(source, one.declared)
    if (shadowed === null) continue
    const said = `which \`${given.to}\` already declares`
    return { refused: `\`${one.name}\` binds \`${shadowed}\`, ${said}` }
  }
  const there = new Map([...importsIn(source), ...everyIn(source)])
  const taking: Taking[] = []
  let text = landed
  let read = source
  for (const [name, one] of carried) {
    if (ownIn(given, one.from, naming)) continue
    const spelled = spelledFor(given, one.from)
    const already = there.get(name)
    if (already !== undefined) {
      if (already.from === spelled) continue
      return { refused: `\`${given.to}\` already names \`${name}\` from \`${already.from}\`` }
    }
    const named = namedAs(name, one.naming)
    const joined = one.every ? null : withName(text, read, spelled, named, one.type)
    if (joined === null) {
      taking.push(takingOf(name, spelled, one))
      continue
    }
    text = text.replace(joined.old, joined.new)
    read = parsedAs(given.to, text)
  }
  const opened = openedIn(text, read, linesOf(taking))
  return { at: given.to, old: whole, new: laidIn(opened, given, written) }
}

function namesBack(rest: ts.SourceFile, given: Asked, naming: Naming): boolean {
  return rest.statements.some((one) => {
    if (!ts.isImportDeclaration(one)) return false
    const named = one.moduleSpecifier
    return ts.isStringLiteral(named) && landingOf(given.from, named.text, naming) === given.to
  })
}

function leftOf(text: string, going: readonly Going[]): string {
  let held = ""
  let at = 0
  for (const one of going) {
    held = `${held}${text.slice(at, one.declared.getFullStart())}`
    at = one.declared.getEnd()
  }
  return `${held}${text.slice(at)}`
}

function planFor(
  given: Asked,
  text: string,
  going: readonly Going[],
  written: readonly Going[],
  repointed: readonly Passage[],
  landing: Landing
): Plan | Refused {
  const left = leftOf(text, going)
  const source = parsedAs(given.from, left)
  const gone = droppedIn(left, source, given.from, unionOf(going))
  const rest = leftBy(left, gone)
  const after = parsedAs(given.from, rest)
  const still = new Set(namesIn(after))
  const kept = going.filter((one) => still.has(one.name))
  const back = backIn(rest, after, given, kept, landing.naming)
  if (back !== null || namesBack(after, given, landing.naming)) {
    const beside = spelledAt(given, given.from, landing.naming)
    for (const one of written) {
      const first = [...one.carried].find(([, held]) => held.from === beside && !held.type)
      if (first === undefined) continue
      const said = `\`${first[0]}\` from \`${given.from}\`, which would name \`${given.to}\` back`
      return { refused: `\`${one.name}\` names ${said}` }
    }
  }
  const carried = unionOf(written)
  const onto =
    landing.onto === null ? null : ontoFor(given, landing.onto, written, carried, landing.naming)
  if (onto !== null && "refused" in onto) return onto
  return {
    taken: going.map((one) => ({ at: given.from, old: one.passage, new: "" })),
    body: bodyFor(carried, written, given, landing.naming),
    adding: landing.adding,
    onto,
    after: [...gone, ...(back === null ? [] : [back]), ...repointed],
  }
}

function unexportedIn(source: ts.SourceFile, one: Held, of: ReadonlySet<string>): string | null {
  const held = importsIn(source)
  for (const name of namesIn(one)) {
    if (of.has(name) || held.has(name)) continue
    const found = declaredIn(source, name)
    if (found !== null && !exported(found)) return name
  }
  return null
}

function goingIn(
  at: string,
  text: string,
  of: ReadonlySet<string>,
  beside: string
): readonly Going[] | Refused {
  const source = parsedAs(at, text)
  const held: Going[] = []
  for (const name of of) {
    const declared = declaredIn(source, name)
    if (declared === null) return { refused: `\`${at}\` declares nothing named \`${name}\`` }
    if (!exported(declared)) return { refused: `\`${name}\` is declared under no export` }
    const behind = unexportedIn(source, declared, of)
    if (behind !== null) {
      const said = `\`${behind}\`, which \`${at}\` declares under no export`
      return { refused: `\`${name}\` names ${said}` }
    }
    const passage = text.slice(declared.getFullStart(), declared.getEnd())
    held.push({ name, declared, passage, carried: carriedIn(declared, of, beside) })
  }
  return held.sort((one, two) => one.declared.getFullStart() - two.declared.getFullStart())
}

export function passagesOf(made: Plan): readonly Passage[] {
  return [...made.taken, ...(made.onto === null ? [] : [made.onto]), ...made.after]
}

export function plannedCarrying(world: World, given: Asked): Plan | Refused {
  if (given.from === given.to) return { refused: `\`${given.to}\` is the path it already sits at` }
  const text = world.textOf(given.from)
  if (text === null) return { refused: `\`${given.from}\` could not be read` }
  const of = new Set(given.of)
  const naming = reachingOf(world.index.manifestsBeside(world.index.fileKeysAt()), world.textOf)
  const going = goingIn(given.from, text, of, spelledAt(given, given.from, naming))
  if ("refused" in going) return going
  const repointed = repointedIn(world, given, of, naming)
  if ("refused" in repointed) return repointed
  const landed = world.textOf(given.to)
  const there = landed === null ? null : parsedAs(given.to, landed)
  const written = going.filter((one) => there === null || declaredIn(there, one.name) === null)
  const onto = landed !== null && written.length > 0 ? landed : null
  const landing = { adding: landed === null, onto, naming }
  return planFor(given, text, going, written, repointed, landing)
}
