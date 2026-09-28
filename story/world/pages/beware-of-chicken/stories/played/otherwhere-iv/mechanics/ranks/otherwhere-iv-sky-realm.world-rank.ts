import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const otherwhereIvSkyRealm = {
  id: "01a0e9fd-dba9-7e96-a86d-8fd72cdffe48",
  type: "page-type/world-rank",
  slug: "otherwhere-iv-sky-realm",
  title: "Sky Realm",
  world: "world/beware-of-chicken",
  description:
    "A cultivator who needs no food for years and whose unleashed will can crush mortals.",
  place: 5,
} as const satisfies WorldRank
