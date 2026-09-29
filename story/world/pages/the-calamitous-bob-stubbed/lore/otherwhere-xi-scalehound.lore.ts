import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiScalehound = {
  id: "01a0ea81-9843-7447-9a87-954970e92678",
  type: "page-type/lore",
  slug: "otherwhere-xi-scalehound",
  title: "Scalehound",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-scalehound",
  facts: [
    {
      fact: "Scalehounds are scaly beasts that hunt in packs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scalehounds roam the wild country of Enoria and the forests near Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tribes south of Harrak count scalehounds and rakaths among their chief predators.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
