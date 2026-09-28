import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiSkills = {
  id: "01a0ea40-a960-760b-929e-444e121f621f",
  type: "page-type/lore",
  slug: "otherwhere-vii-skills",
  title: "Skills",
  world: "world/god-of-trash",
  about: "world-mechanic/otherwhere-vii-skills",
  facts: [
    {
      fact: "Resist skills: Hunger, Pain, Poison, Heat, Cold, Acid, Disease, Bleed and Impurity Resist.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Work skills: Sewing, Herbalism, Alchemy, Forging, Crafting, Survivalist, Scavenging.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mind skills: Speed Reading, Comprehension, Enlightenment, Bluff, Disguise.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fighting skills: Fist, Knife and Sword Proficiency, Improvised Weapon Proficiency.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mage skills: Mana Manipulation, Self-Regeneration, Blow Mitigation, Aura Obscuration.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Intent skills, as Sword Intent or Fist Intent, come to those who obsess over a weapon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Scavenging sharpens the eye for things of worth among junk, like a seasoned thrifter's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Survivalist helps one weather the elements; Speed Picking snatches valuables fast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Skills in the forties and fifties belong to veterans and masters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only mages have the years to grind resist skills high.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
