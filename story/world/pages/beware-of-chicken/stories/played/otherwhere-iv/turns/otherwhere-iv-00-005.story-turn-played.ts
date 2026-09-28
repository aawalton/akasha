import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00005 = {
  id: "01a0ea2a-ec90-7f09-8e85-378de47eb602",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 5,
  stepStatus: "step-status/game-master",
  action:
    '"It is a mystery for sure. It could be a mundane beast such as a bull or a boar, but it could also be a spirit beast. In either case, this misfortune may turn out to be great good fortune instead. If you have the means, recruit a few stalwart hunters or warriors to watch with you at night until it returns and then slay the beast. If needed, offer them a share in the spoils. Spears would be best, with a strong bar across the haft so you can plant the base in the ground in case of a charge. If you succeed in slaying the beast, at the least you will have a bounty of meat for your village. At most you may have a valuable corpse that could be sold to the sect for greater rewards. If you do not succeed in slaying the beast, you may still succeed in discouraging it from feasting on your rice."',
  lore: [
    "lore/otherwhere-iv-three-stones-folk",
    "lore/otherwhere-iv-hidden-spring-sect",
    "place/otherwhere-iv-upstream-woods",
  ],
  endsAt: "2026-09-28T07:17:00.000Z",
} as const satisfies StoryTurnPlayed
