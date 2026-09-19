import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import { restatedIn } from "akasha/change/modules/address-restating/address-restating.module.code.ts"
import { gathered, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { repointed } from "akasha/change/modules/import-repointing/import-repointing.module.code.ts"
import { claimedIn } from "akasha/change/modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { pageTypeRestated } from "akasha/change/modules/page-type-restating/page-type-restating.module.code.ts"
import {
  carrying,
  reach,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { importingOf } from "akasha/page/index/modules/path-naming/path-naming.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const MOVE_FILE = `${changeMechanicalFile.slug}/${moveFile.slug}` as const

export type Asked = {
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
    if (held === one) continue
    if (world.bodyOf(held) !== null) return `\`${held}\` is a body already`
    said.set(one, held)
  }
  return said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
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
  const importers = importingOf(world.index, moved)
  if (!moved.has(given.at)) return refusing(`\`${given.at}\` names no file the page type moves`)
  const movedOver = Object.fromEntries(moved)
  const carried: Answer[] = []
  let over = world
  const was = `${said.pageType}/${said.slug}`
  const addressed = restatedIn(over, new Map([[was, `${type.slug}/${said.slug}`]]))
  if (addressed.refused !== null) return addressed
  carried.push(addressed)
  over = carrying(over, addressed)
  const restated = pageTypeRestated(over, { at: given.at, to: given.to })
  if (restated.refused !== null) return restated
  carried.push(restated)
  over = carrying(over, restated)
  for (const [one, next] of moved) {
    if (over.bodyOf(one) === null) return refusing(`\`${one}\` could not be read`)
    const held = await reach(over, MOVE_FILE, { from: one, to: next })
    if (held.said.refused !== null) return held.said
    carried.push(held.said)
    over = held.world
    const answer = repointed(over, { was: one, now: next, moved: movedOver })
    if (answer.refused !== null) return answer
    carried.push(answer)
    over = carrying(over, answer)
  }
  for (const path of importers) {
    if (moved.has(path)) continue
    if (over.textOf(path) === null) {
      return refusing(`\`${path}\` names a path that moved and could not be read`)
    }
    const answer = repointed(over, { was: path, now: path, moved: movedOver })
    if (answer.refused !== null) return answer
    carried.push(answer)
    over = carrying(over, answer)
  }
  return gathered(carried)
}
