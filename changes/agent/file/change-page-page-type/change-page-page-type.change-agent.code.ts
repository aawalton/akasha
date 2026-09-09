import { partedIn } from "@akasha/pages/page-file-name"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const CHANGE_IMPORTS = "change-mechanical-file-content/change-imports"

const CHANGE_PAGE_PAGE_TYPE = "change-mechanical-file-content/change-page-page-type"

const RENAME_PAGE_ADDRESS = "change-mechanical-file-content/rename-page-address"

const MOVE_FILE = "change-mechanical-file/move-file"

const AT = "at"

const TO = "to"

export type ChangePagePageTypeAsked = {
  readonly at: string
  readonly to: string
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
    if (world.bodyOf(held) !== null) return `\`${held}\` is a body already`
    said.set(one, held)
  }
  return said
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
  if (world.bodyOf(given.to) === null) {
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
  const movedOver = Object.fromEntries(moved)
  const carried: Answer[] = []
  let over = world
  const addressed = await reach(over, RENAME_PAGE_ADDRESS, {
    was: `${said.pageType}/${said.slug}`,
    now: `${type.slug}/${said.slug}`,
  })
  if (addressed.said.refused !== null) return addressed.said
  carried.push(addressed.said)
  over = addressed.world
  for (const [one, next] of moved) {
    if (over.bodyOf(one) === null) return refusing(`\`${one}\` could not be read`)
    const carrying = await reach(over, MOVE_FILE, { from: one, to: next })
    if (carrying.said.refused !== null) return carrying.said
    carried.push(carrying.said)
    over = carrying.world
    const answer = await reach(over, CHANGE_IMPORTS, { was: one, now: next, moved: movedOver })
    if (answer.said.refused !== null) return answer.said
    carried.push(answer.said)
    over = answer.world
  }
  const restated = await reach(over, CHANGE_PAGE_PAGE_TYPE, { at, to: given.to })
  if (restated.said.refused !== null) return restated.said
  carried.push(restated.said)
  over = restated.world
  for (const path of reading.importers) {
    if (moved.has(path)) continue
    const text = over.textOf(path)
    if (text === null) {
      return refusing(`\`${path}\` names a path that moved and could not be read`)
    }
    const answer = await reach(over, CHANGE_IMPORTS, { was: path, now: path, moved: movedOver })
    if (answer.said.refused !== null) return answer.said
    carried.push(answer.said)
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
