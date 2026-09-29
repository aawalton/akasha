import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiTamsin = {
  id: "01a0ea80-7341-756b-874f-aeffa3b6c09f",
  type: "page-type/lore",
  slug: "otherwhere-vii-tamsin",
  title: "Tamsin",
  world: "world/god-of-trash",
  about: "character-other/otherwhere-vii-tamsin",
  facts: [
    {
      fact: "A girl of about sixteen winnows in Aldo's barn, and laughed out loud when Nala spilled her grain.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-vii-nala",
        "character-other/otherwhere-vii-tamsin",
      ],
    },
    {
      fact: "The other winnower is Aldo's niece Tamsin, sixteen, who thinks winnowing is beneath her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamsin can't read and is jealous of anyone who can; Aldo once meant to send her to learn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamsin wants letters more than anything, and would sooner die than say so to Nala.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamsin is quick with numbers once shown, quicker than her uncle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamsin may not hold her tongue about the steward's cheating for long.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
