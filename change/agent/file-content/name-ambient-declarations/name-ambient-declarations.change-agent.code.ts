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
import { openedIn } from "akasha/change/modules/import-lines/import-lines.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { leftAloneIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import {
  bindingOf,
  declaredIn,
  globallyReached,
  identifiersIn,
  referencing,
  typeParameterOf,
} from "akasha/code/reading/modules/code-binding/code-binding.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { specifiersIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { typed } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const AT = "at"

const MOST = "most"

const BUT = "but"

const AMBIENT = "ambient-types"

const SECTION = "d"

const HELD = "ts"

const UNDER = "akasha"

const PARTED = "/"

const DECLARED = ".d.ts"

export function declaringIn(world: World): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  const carried = world.index.carryingOf(AMBIENT)
  if ("refused" in carried) return found
  for (const listed of carried.carrying) {
    const at = besideAt(listed.path, SECTION, HELD)
    if (at === null) continue
    const text = world.textOf(at)
    if (text === null) continue
    for (const name of declaredIn(parsedAs(at, text)).keys()) {
      const held = found.get(name)
      if (held === undefined) found.set(name, [at])
      else held.push(at)
    }
  }
  return found
}

function sharedWith(one: string, two: string): number {
  const said = one.split(PARTED)
  const held = two.split(PARTED)
  let at = 0
  while (at < said.length && at < held.length && said[at] === held[at]) at += 1
  return at
}

function closestTo(path: string, held: readonly string[]): string {
  let best = held[0] ?? ""
  let near = sharedWith(path, best)
  for (const one of held) {
    const found = sharedWith(path, one)
    if (found > near) {
      best = one
      near = found
    }
  }
  return best
}

function namesIn(
  declaring: ReadonlyMap<string, readonly string[]>,
  at: string,
  text: string
): readonly string[] {
  const found = new Set<string>()
  for (const one of identifiersIn(parsedAs(at, text))) {
    if (!declaring.has(one.text)) continue
    if (!globallyReached(one)) {
      if (!referencing(one)) continue
      if (bindingOf(one) !== null || typeParameterOf(one) !== null) continue
    }
    found.add(one.text)
  }
  return [...found]
}

export function wantedIn(
  world: World,
  declaring: ReadonlyMap<string, readonly string[]>,
  path: string,
  text: string,
  reaching: Map<string, readonly string[]> = new Map()
): readonly string[] {
  const already = new Set(specifiersIn(path, text))
  const found = new Set<string>()
  const rest = [...namesIn(declaring, path, text)]
  while (rest.length > 0) {
    const name = rest.pop()
    const held = name === undefined ? undefined : declaring.get(name)
    if (held === undefined) continue
    const at = closestTo(path, held)
    if (found.has(at)) continue
    found.add(at)
    let names = reaching.get(at)
    if (names === undefined) {
      const body = world.textOf(at)
      names = body === null ? [] : namesIn(declaring, at, body)
      reaching.set(at, names)
    }
    rest.push(...names)
  }
  return [...found]
    .map((one) => `${UNDER}${PARTED}${one}`)
    .filter((one) => !already.has(one))
    .sort()
}

function namedIn(
  world: World,
  declaring: ReadonlyMap<string, readonly string[]>,
  path: string,
  reaching: Map<string, readonly string[]>
): readonly FileChange[] {
  const text = world.textOf(path)
  if (text === null) return []
  const wanted = wantedIn(world, declaring, path, text, reaching)
  if (wanted.length === 0) return []
  const lines = wanted.map((one) => `import ${JSON.stringify(one)}`)
  const now = openedIn(text, parsedAs(path, text), lines)
  if (now === text) return []
  return splicing(path, text, [splicedTo(text, now)])
}

export function nameAmbientDeclarations(
  world: World,
  at: string,
  most: number,
  but: ReadonlySet<string> = new Set()
): Answer {
  const declaring = declaringIn(world)
  const reaching = new Map<string, readonly string[]>()
  const edits: FileChange[] = []
  let named = 0
  for (const path of [...world.under(at)].sort()) {
    if (named >= most) break
    if (!typed(path) || path.endsWith(DECLARED) || but.has(path)) continue
    const found = namedIn(world, declaring, path, reaching)
    if (found.length === 0) continue
    edits.push(...found)
    named += 1
  }
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, MOST, BUT]

export function runChange(world: World, given: Asked): Answer {
  for (const key of Object.keys(given)) {
    if (key !== AT && key !== MOST && key !== BUT) return refusing(untaken(key, takes))
  }
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const said = given[MOST]
  if (said === undefined) return refusing(missing(MOST))
  const most = Number(said)
  if (!Number.isInteger(most) || most < 1) {
    return refusing(`\`${said}\` is no count of files to name declarations in`)
  }
  return nameAmbientDeclarations(world, at, most, leftAloneIn(given[BUT]))
}
