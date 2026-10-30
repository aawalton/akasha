import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  HeldPath,
  PathReach,
} from "akasha/story/world/mechanics/modules/path-stepping/path-stepping.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"

type Page = { readonly slug: string; readonly character: string; readonly attribute?: string }

type Skill = { readonly title: string; readonly tierSteps: readonly number[] }

export function heldAs(held: Page, path: Skill): HeldPath {
  return {
    address: `${characterSkill.slug}/${held.slug}`,
    character: held.character,
    title: path.title,
    tiers: path.tierSteps,
    attribute: held.attribute ?? null,
    setAside: false,
  }
}

export function reachOver(
  held: readonly HeldPath[],
  statsOf: (character: string) => string
): PathReach {
  return {
    heldAt: (address) => held.find((one) => one.address === address) ?? null,
    heldBy: (character) => held.filter((one) => one.character === character),
    ownerOf: (address) =>
      held.find((one) => slugOf(address).startsWith(`${slugOf(one.character)}-`))?.character ??
      null,
    statsOf,
  }
}
