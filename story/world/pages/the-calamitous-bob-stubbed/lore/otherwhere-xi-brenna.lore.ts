import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiBrenna = {
  id: "01a0ea79-96af-7d46-84cc-08ce22acc9f7",
  type: "page-type/lore",
  slug: "otherwhere-xi-brenna",
  title: "Brenna",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-brenna",
  facts: [
    {
      fact: "Brenna heads Harrak's temple healers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brenna ran the field hospitals at the pass when a magical plague struck the alliance camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Brenna is presumed to be tending the war's wounded with Harrak's temple healers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
