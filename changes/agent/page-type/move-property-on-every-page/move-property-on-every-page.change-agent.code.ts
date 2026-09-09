import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  askedIn,
  carriedIn,
  carryingOver,
  type ValueCarryingAsked,
} from "../../../modules/value-carrying/value-carrying.module.code.ts"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const REMOVE_PAGE_PROPERTY = "change-mechanical-file-content/remove-page-property"

export async function movePropertyOnEveryPage(
  world: World,
  given: ValueCarryingAsked
): Promise<Answer> {
  const held = carriedIn(world, given)
  if (typeof held === "string") return refusing(held)
  const carrier = carryingOver(world)
  for (const one of held) {
    const put = await carrier.reaching(ADD_PAGE_PROPERTY, {
      at: one.path,
      key: given.to,
      value: one.value,
      after: given.from,
    })
    if (put !== null) return refusing(`\`${one.path}\` is refused, and ${put}`)
    const off = await carrier.reaching(REMOVE_PAGE_PROPERTY, { at: one.path, key: given.from })
    if (off !== null) return refusing(`\`${one.path}\` is refused, and ${off}`)
  }
  return carrier.gatheredIn()
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = askedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await movePropertyOnEveryPage(world, asked)
}
