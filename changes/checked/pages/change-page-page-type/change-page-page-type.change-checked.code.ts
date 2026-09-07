import { dirname } from "node:path"
import { partedIn } from "@akasha/pages/page-file-name"
import { typedAs } from "../../../../pages/export-name/page-export-name.module.code.ts"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { specifierFor } from "../../../mechanical/pages/repoint-imports/repoint-imports.change-mechanical.code.ts"
import {
  answered,
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const CHANGE_FILE = "change-mechanical/change-file"

const REPOINT_IMPORTS = "change-mechanical/repoint-imports"

const TYPE_KEY = "pageTypeSlug"

const AT = "at"

const TO = "to"

export type ChangePagePageTypeAsked = {
  readonly at: string
  readonly to: string
}

function importingFor(name: string): RegExp {
  return new RegExp(`^import type \\{ ${name} \\} from "[^"]*"$`, "m")
}

function renamedInto(
  world: World,
  was: string,
  now: string,
  beside: readonly string[]
): ReadonlyMap<string, string> | string {
  const said = new Map<string, string>()
  for (const one of beside) {
    const held = one.replace(`.${was}.`, `.${now}.`)
    if (held === one) return `\`${one}\` states no \`${was}\` in its name, so the page type stands`
    if (world.textOf(held) !== null) return `\`${held}\` is a body already`
    said.set(one, held)
  }
  return said
}

function restating(over: World, at: string, was: string): string | null {
  const text = over.textOf(at)
  if (text === null) return `\`${at}\` holds no body once the page is carried`
  const name = typedAs(was)
  if (importingFor(name).exec(text) === null) {
    return `\`${at}\` imports no type named \`${name}\`, so the page type is not restated`
  }
  return null
}

export async function changePagePageType(
  world: World,
  given: ChangePagePageTypeAsked
): Promise<Answer> {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return refusing(`\`${given.at}\` reads as no page file, so no page type is changed`)
  }
  const type = partedIn(given.to)
  if (type === null) {
    return refusing(`\`${given.to}\` reads as no page file, so no page type is named`)
  }
  if (world.textOf(given.to) === null) {
    return refusing(`\`${given.to}\` holds no body, so no page type is named`)
  }
  if (type.slug === said.pageType) {
    return refusing(`\`${said.pageType}\` is the page type the page already is`)
  }
  const value = pageIn(world, given.at)
  if (value === null) return refusing(`\`${given.at}\` names no page, so no page type is changed`)
  let beside: readonly string[]
  try {
    beside = claimedIn(world, given.at, value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so the files beside \`${given.at}\` were not worked out`)
  }
  const moved = renamedInto(world, said.pageType, type.slug, beside)
  if (typeof moved === "string") return refusing(moved)
  const reading = importingOf(world.index, moved)
  if ("unread" in reading) return refusing(reading.unread)
  const at = moved.get(given.at)
  if (at === undefined) return refusing(`\`${given.at}\` names no file the page type moves`)
  const wasName = typedAs(said.pageType)
  const nowName = typedAs(type.slug)
  const movedOver = Object.fromEntries(moved)
  const carried: Answer[] = []
  let over = world
  for (const [one, next] of moved) {
    if (over.textOf(one) === null) return refusing(`\`${one}\` could not be read`)
    const answer = await reach(over, REPOINT_IMPORTS, { was: one, now: next, moved: movedOver })
    if (answer.said.refused !== null) return answer.said
    carried.push(answer.said)
    over = answer.world
  }
  const unstated = restating(over, at, said.pageType)
  if (unstated !== null) return refusing(unstated)
  const line = importingFor(wasName).exec(over.textOf(at) ?? "")
  const imported = `import type { ${nowName} } from ${JSON.stringify(specifierFor(dirname(at), given.to))}`
  const passages = [
    [line === null ? "" : line[0], imported],
    [`satisfies ${wasName}`, `satisfies ${nowName}`],
    [`${TYPE_KEY}: ${JSON.stringify(said.pageType)}`, `${TYPE_KEY}: ${JSON.stringify(type.slug)}`],
  ]
  for (const [old, spelled] of passages) {
    const answer = await reach(over, CHANGE_FILE, { at, old, new: spelled })
    if (answer.said.refused !== null) return answer.said
    carried.push(answer.said)
    over = answer.world
  }
  for (const path of reading.importers) {
    if (moved.has(path)) continue
    const text = over.textOf(path)
    if (text === null) {
      return refusing(`\`${path}\` names a path that moved and could not be read`)
    }
    const answer = await reach(over, REPOINT_IMPORTS, { was: path, now: path, moved: movedOver })
    if (answer.said.refused !== null) return answer.said
    carried.push(answered(answer.said.edits.filter((one) => one.body !== text)))
    over = answer.world
  }
  return gathered(carried)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await changePagePageType(world, { at, to })
}
