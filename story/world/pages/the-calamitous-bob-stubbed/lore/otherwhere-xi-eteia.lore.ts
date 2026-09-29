import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEteia = {
  id: "01a0ea7e-1940-75f9-bc28-714a2b1f4a3f",
  type: "page-type/lore",
  slug: "otherwhere-xi-eteia",
  title: "Eteia",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-eteia",
  facts: [
    {
      fact: "Eteia is a fourth-step red war mage, a caster of fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eteia casts Aspect of Fire: Firewall, a red circle beneath her that raises columns of flame.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eteia rode with Viv in her flight north through Enoria and was trusted by few.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When the royalists took Viv, Eteia went over to them under an oath not to harm Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eteia helped Viv in the fall of Green Edge, where Constable Tarano died.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Eteia is this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
