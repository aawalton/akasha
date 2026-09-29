import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvDornhallowGrove = {
  id: "01a0ed37-6736-7539-a991-8f17a02f31f6",
  type: "page-type/place",
  slug: "overwhere-iv-dornhallow-grove",
  title: "Dornhallow Grove",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Dornhallow Grove is the seat of the Dornhallow elves, grown around their own hometree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Like every true elven hometree, the Dornhallow tree was once rooted to Caelthal's network.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its hometree is now severed from Caelthal while the high court weighs the evidence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The grove's tree spirit is dead, slain by its own elves, likely through a necromantic rite.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Dornhallow leaders have fled, so the branch counts as traitors to all elves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A branch branded traitor is to be uprooted by the elves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Dornhallows are allied with the Outeatus Kingdom, sworn enemy of the elves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Dornhallows are foes of the Feirelle branch and want its princess Sylthaeryn dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rumor lays the blast at the elven embassy in Dhoggurum on Outeatus, the Dornhallows' ally.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
