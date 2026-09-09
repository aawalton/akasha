import type { PageType } from "@akasha/pages/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.types.ts"

export type WorldEnchantment = WorldMechanic

export const worldEnchantment = {
  id: "01a06558-a991-75d7-9cdc-b80a17f534a1",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-enchantment",
  definition: "a power worked into a made thing",
  pluralSlug: "world-enchantments",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
