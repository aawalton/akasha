import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaFocus = {
  id: "01a0ea7a-5bda-709e-9153-e89dc089d58f",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-focus",
  title: "Focus (Staff, Wand or Ring)",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-mana-focus",
  facts: [
    {
      fact: "Mages use foci such as staffs, wands and rings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beam-type mana skills normally need a focus to spare the caster's arm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Firing a mana beam bare-handed, without a focus, shocks trained noble mages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A focus feels like an extension of the arm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A focus makes mana attacks far stronger, easier to aim and more efficient.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Even a plain, unadorned wooden staff works as a focus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Foci seem fragile; nobles may carry backup staves.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
