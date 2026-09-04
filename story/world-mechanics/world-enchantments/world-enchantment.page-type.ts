import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldEnchantment = WorldMechanic

export const worldEnchantment = {
  id: "01a06558-a991-75d7-9cdc-b80a17f534a1",
  pageTypeSlug: "page-type",
  slug: "world-enchantment",
  definition: "a power worked into a made thing",
  pluralSlug: "world-enchantments",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
