import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVClassSkills = {
  id: "01a0e9f7-46bb-74ca-a6a6-3df3e9d7ca57",
  type: "page-type/lore",
  slug: "otherwhere-v-class-skills",
  title: "Class Skills",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-class-skills",
  facts: [
    {
      fact: "Choosing a class grants its first class skills at once, each announced in one box.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Each grant reads "New Class skill <Name>:", then a paragraph describing it.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A class's resource, such as Stamina, can itself come as its first class skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Antimagic Brawler grant box, seen that season, ran as the lines below.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"New Class skill Stamina:"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"You have unlocked the stamina resource! Stamina will accumulate during periods of rest,"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"and can be spent to improve the speed and strength of your movements,"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"or used for other skills or talents that utilize stamina."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"New Class skill Brawler\'s Indifference:"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"You will be less likely to flinch and more able to ignore pain and wounds to continue fighting."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"New Class skill Antimagic Blows:"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Your blows and strikes will enhance your inherent antimagic,"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"allowing you to break magical barriers and constructs with barehanded strikes."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class skills show under their class in the status with no rank numbers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class skills grow stronger as the class levels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A class adds class skills as it develops at levels 27, 81, 243 and 729.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Taking a new class at 729 can turn each old class skill into a new, stronger named skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Such a change reads "Class skill <Old> has become <New>.", then the new description.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A wholly new one reads "You have gained the class skill <Name>.", then its description.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class skill Developments can also come from new Insight and great deeds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
