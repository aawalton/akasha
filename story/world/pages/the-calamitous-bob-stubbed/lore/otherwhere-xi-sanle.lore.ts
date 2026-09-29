import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSanle = {
  id: "01a0ea85-0b86-7807-a11e-2c0f38a3d6c7",
  type: "page-type/lore",
  slug: "otherwhere-xi-sanle",
  title: "Sanle",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sanle",
  facts: [
    {
      fact: "Sanle is a wise woman near Losserec in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sanle's inspection reads: Wise woman, physical and spiritual healer, minor caster, life mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sanle heals with boiled water, a bone needle, herbs and mending potions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sanle saw the lingering aura of Neriad on Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sanle's granddaughter is Nissa.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Sanle is a wise woman near Losserec, if she yet lives.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
