import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../modules/shadow/change-shadow.module.code.ts"
import {
  carryingOver,
  holdingIn,
  type KeyHoldingAsked,
  keyAskedIn,
} from "../../../modules/value-carrying/value-carrying.module.code.ts"

const REMOVE_PAGE_PROPERTY = "change-mechanical-file-content/remove-page-property"

export type RemovePropertyFromEveryPageAsked = KeyHoldingAsked

export async function removePropertyFromEveryPage(
  world: World,
  given: KeyHoldingAsked
): Promise<Answer> {
  const held = holdingIn(world, given)
  if (typeof held === "string") return refusing(held)
  if (held.length === 0) return refusing(`no \`${given.pageType}\` carries \`${given.key}\``)
  const carrier = carryingOver(world)
  for (const path of held) {
    const off = await carrier.reaching(REMOVE_PAGE_PROPERTY, { at: path, key: given.key })
    if (off !== null) return refusing(`\`${path}\` is refused, and ${off}`)
  }
  return carrier.gatheredIn()
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await removePropertyFromEveryPage(world, asked)
}
