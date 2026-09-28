import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const otherwhereIvInitiatesRealm = {
  id: "01a0e9fd-dba8-706a-8e27-c4fdc142f44c",
  type: "page-type/world-rank",
  slug: "otherwhere-iv-initiates-realm",
  title: "Initiate's Realm",
  world: "world/beware-of-chicken",
  description:
    "A body that has lit its dantian and draws Qi, stronger and quicker than any mortal.",
  place: 1,
} as const satisfies WorldRank
