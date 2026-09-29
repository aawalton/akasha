import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAspectOfTheParagon = {
  id: "01a0ea8c-6dbd-7833-973d-b5fb503f6b5d",
  type: "page-type/lore",
  slug: "otherwhere-xi-aspect-of-the-paragon",
  title: "Aspect of the Paragon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-aspect/otherwhere-xi-aspect-of-the-paragon",
  facts: [
    {
      fact: '"You have unlocked the third of four aspects. The last aspect will only unlock on your next step."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Paragon vastly improves social skills and gives the majesty of a ruler's path.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the Paragon the caster's emotions are laid bare to those around.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Paragon's soul is intimidating, and its voice can taunt a whole host.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It deepens into the True Aspect of the Paragon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One fifth-step path would let the Paragon share its power with followers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
