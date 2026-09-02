import type { PotionsTemplate } from "../potion-source/potion-source.module.code.ts"
import { POTIONS_CRAFTED_HEALTH } from "../potions-crafted-health/potions-crafted-health.module.code.ts"
import { POTIONS_CRAFTED_MAGICKA } from "../potions-crafted-magicka/potions-crafted-magicka.module.code.ts"
import { POTIONS_CRAFTED_OTHER } from "../potions-crafted-other/potions-crafted-other.module.code.ts"
import { POTIONS_CRAFTED_STAMINA } from "../potions-crafted-stamina/potions-crafted-stamina.module.code.ts"

export const POTIONS_CRAFTED = {
  ...POTIONS_CRAFTED_HEALTH,
  ...POTIONS_CRAFTED_MAGICKA,
  ...POTIONS_CRAFTED_STAMINA,
  ...POTIONS_CRAFTED_OTHER,
} satisfies Record<string, PotionsTemplate>
