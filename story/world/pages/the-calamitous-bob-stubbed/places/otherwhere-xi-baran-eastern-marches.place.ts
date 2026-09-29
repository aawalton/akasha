import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiBaranEasternMarches = {
  id: "01a0ea88-4594-7611-ab79-97e6a0a8bbb2",
  type: "page-type/place",
  slug: "otherwhere-xi-baran-eastern-marches",
  title: "The Eastern Marches of Baran",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-baran",
  facts: [
    {
      fact: "Baran's eastern marches face Halluria across a mountain chain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The eastern marches are semi-arid country of craggy pines, sap and dust.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The eastern marches are about a third of the continent from Harrak, some four weeks' ride.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eikart is the eastern marches' poor south-eastern duchy, often at war with Hallurians.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Duke Eikart was assassinated ten years ago; his widow rules the duchy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Duke Falstag's duchy lies north of Eikart's and suffers Hallurian raids.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One great ravine pass crosses the mountains from the eastern marches to Halluria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A second, lesser pass lies about thirty leagues south of the great pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Coelette is a Baranese border castle of the eastern marches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The eastern marches' border forts are spartan, undecorated, and built for quick evacuation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pine forest with a brook clearing lies between two mountains north of the great pass.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
