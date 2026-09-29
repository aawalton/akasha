import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXInjury = {
  id: "01a0eadb-bcdb-79ee-9968-81595f1f65e1",
  type: "page-type/lore",
  slug: "otherwhere-x-injury",
  title: "Injury",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-injury",
  facts: [
    {
      fact: "A blow is settled only once an act has landed it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harm is one six-sided die plus the blow's force, less the ward, times the striker's tier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A light blow adds nothing, solid two, heavy four, savage seven and crushing ten.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tier scale is one at Tier 0, three at 1, eight at 2, twenty at 3, fifty at 4.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fists, stones and small bites are light; a club, a knife or a wolf's bite is solid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A troll's club, a sword's full swing or a fall of twenty feet is heavy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blow landed strongly adds three, and one landed at a cost deals half, rounded up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A ward runs from nought for bare skin to eight for plate or hardened skin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harm comes off the health a character has left.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most health is twenty at Tier 0, sixty at Tier 1 and one hundred and sixty at Tier 2.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wounds run whole, scraped, hurt, grievous, and down at nothing left.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hurt costs one on every act, and grievous costs three.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Down with danger present is a real loss, never softened to save the scene.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A night's sleep restores a tenth of most health, and tended wounds a fifth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 1 body heals twice as fast as a Tier 0 body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No number of harm or health ever appears in the prose.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
