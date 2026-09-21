import {
  type Answer,
  type FileChange,
  missing,
  refusing,
  splicedTo,
  splicing,
  stating,
  untaken,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { leftAloneIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import ts from "typescript"

const MOST = "most"

const BUT = "but"

const AMBIENT = "ambient-types"

const SECTION = "d"

const HELD = "ts"

const LINE = "\n"

const GAP = "\n\n"

export type Spanned = {
  readonly name: string
  readonly from: number
  readonly to: number
}

export type Declaring = ReadonlyMap<string, readonly string[]>

function mergingName(one: ts.Statement): ts.Identifier | null {
  if (ts.isInterfaceDeclaration(one)) return one.name
  if (ts.isFunctionDeclaration(one)) return one.name ?? null
  if (ts.isModuleDeclaration(one) && ts.isIdentifier(one.name)) return one.name
  return null
}

export function mergingIn(path: string, text: string): readonly Spanned[] {
  const source = parsedAs(path, text)
  const found: Spanned[] = []
  for (const one of source.statements) {
    const named = mergingName(one)
    if (named === null) continue
    found.push({ name: named.text, from: one.getStart(source), to: one.getEnd() })
  }
  return found
}

export function declaringIn(world: World): Declaring {
  const found = new Map<string, string[]>()
  const carried = world.index.carryingOf(AMBIENT)
  if ("refused" in carried) return found
  for (const listed of carried.carrying) {
    const path = besideAt(listed.path, SECTION, HELD)
    if (path === null) continue
    const text = world.textOf(path)
    if (text === null) continue
    for (const one of mergingIn(path, text)) {
      const held = found.get(one.name)
      if (held === undefined) found.set(one.name, [path])
      else if (!held.includes(path)) held.push(path)
    }
  }
  return found
}

function firstOf(paths: readonly string[]): string {
  let best = paths[0] ?? ""
  for (const one of paths) {
    if (one.length < best.length) best = one
    else if (one.length === best.length && one < best) best = one
  }
  return best
}

export function homesIn(declaring: Declaring): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [name, paths] of declaring) {
    if (paths.length > 1) found.set(name, firstOf(paths))
  }
  return found
}

function emptiedIn(
  world: World,
  declaring: Declaring,
  homes: ReadonlyMap<string, string>
): ReadonlySet<string> {
  const found = new Set<string>()
  const every = new Set<string>()
  for (const paths of declaring.values()) for (const one of paths) every.add(one)
  for (const path of every) {
    const text = world.textOf(path)
    if (text === null) continue
    const source = parsedAs(path, text)
    const stays = source.statements.some((one) => {
      const named = mergingName(one)
      if (named === null) return true
      return (homes.get(named.text) ?? path) === path
    })
    if (!stays) found.add(path)
  }
  return found
}

function tidied(text: string): string {
  const held = text.trim()
  return held === "" ? "" : `${held}${LINE}`
}

function withoutIn(path: string, text: string, going: ReadonlySet<number>): string {
  const source = parsedAs(path, text)
  let now = ""
  let at = 0
  for (const one of source.statements) {
    const to = one.getEnd()
    if (!going.has(one.getStart(source))) now = `${now}${text.slice(at, to)}`
    at = to
  }
  return `${now}${text.slice(at)}`
}

function namesIn(
  declaring: Declaring,
  homes: ReadonlyMap<string, string>,
  emptied: ReadonlySet<string>,
  most: number,
  but: ReadonlySet<string>
): readonly string[] {
  const found: string[] = []
  for (const name of [...homes.keys()].sort()) {
    if (found.length >= most) break
    const paths = declaring.get(name) ?? []
    if (paths.some((one) => but.has(one) || emptied.has(one))) continue
    found.push(name)
  }
  return found
}

export function gatherMergingDeclarations(
  world: World,
  most: number,
  but: ReadonlySet<string> = new Set()
): Answer {
  const declaring = declaringIn(world)
  const homes = homesIn(declaring)
  const emptied = emptiedIn(world, declaring, homes)
  const leaving = new Map<string, Set<number>>()
  const arriving = new Map<string, string[]>()
  for (const name of namesIn(declaring, homes, emptied, most, but)) {
    const home = homes.get(name) ?? ""
    for (const path of [...(declaring.get(name) ?? [])].sort()) {
      if (path === home) continue
      const text = world.textOf(path)
      if (text === null) continue
      for (const one of mergingIn(path, text)) {
        if (one.name !== name) continue
        const going = leaving.get(path)
        if (going === undefined) leaving.set(path, new Set([one.from]))
        else going.add(one.from)
        const put = arriving.get(home)
        if (put === undefined) arriving.set(home, [text.slice(one.from, one.to)])
        else put.push(text.slice(one.from, one.to))
      }
    }
  }
  const edits: FileChange[] = []
  for (const path of [...new Set([...leaving.keys(), ...arriving.keys()])].sort()) {
    const was = world.textOf(path)
    if (was === null) continue
    const going = leaving.get(path)
    const held = going === undefined ? was : withoutIn(path, was, going)
    const blocks = arriving.get(path)
    const put = blocks === undefined ? "" : `${LINE}${blocks.join(GAP)}`
    const now = tidied(`${tidied(held)}${put}`)
    if (now === was) continue
    edits.push(...splicing(path, was, [splicedTo(was, now)]))
  }
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [MOST, BUT]

export function runChange(world: World, given: Asked): Answer {
  for (const key of Object.keys(given)) {
    if (key !== MOST && key !== BUT) return refusing(untaken(key, takes))
  }
  const said = given[MOST]
  if (said === undefined) return refusing(missing(MOST))
  const most = Number(said)
  if (!Number.isInteger(most) || most < 1) {
    return refusing(`\`${said}\` is no count of interfaces to gather`)
  }
  return gatherMergingDeclarations(world, most, leftAloneIn(given[BUT]))
}
