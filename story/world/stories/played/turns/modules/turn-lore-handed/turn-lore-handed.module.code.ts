import { lore } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import {
  type Admitted,
  unfiledRefused,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"

const LORE_TYPES: readonly string[] = [lore.slug, place.slug]

const PARTED = "/"

export function loreRefused(handed: readonly string[], admitted: Admitted): string | null {
  const other = handed.find((one) => !LORE_TYPES.includes(one.slice(0, one.lastIndexOf(PARTED))))
  if (other !== undefined) {
    return `a lore page is of type ${LORE_TYPES.join(" or ")}, and \`${other}\` is not`
  }
  return unfiledRefused(handed, admitted, "lore page")
}
