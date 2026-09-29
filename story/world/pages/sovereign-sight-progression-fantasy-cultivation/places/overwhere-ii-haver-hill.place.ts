import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiHaverHill = {
  id: "01a0ed24-bdd2-79bf-b321-3aafc143da2c",
  type: "page-type/place",
  slug: "overwhere-ii-haver-hill",
  title: "Haver Hill",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Haver Hill is a walled hilltop town of timber houses south of Vale, smaller than Vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Haver Hill sits by a river, and bullhounds pull its wagons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Haver Hill is known for dyed rugs, and hunters with riding hounds have come from there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A large beast's den with deep claw marks, long empty, lies near Haver Hill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "That den near Haver Hill sprouted Sea-touched herbs, Ghostflower Root among them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
