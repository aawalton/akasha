import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiIrlen = {
  id: "01a0ea87-2a4e-7fff-b2c0-55070773f1f1",
  type: "page-type/lore",
  slug: "otherwhere-xi-irlen",
  title: "Irlen",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-irlen",
  facts: [
    {
      fact: "Irlen, called Junior, is a young golem of steel and silverite, one of Solfis's children.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Irlen speaks in golem text, as his father Solfis does.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Irlen fought beside the blademaster Solar on the Plain of the Gods in the final war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Irlen is thought to be with Solar and Harrak's forces after the victory.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
