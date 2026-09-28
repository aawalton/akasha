import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereInterface = {
  id: "01a0e9a4-b08a-7a48-8816-c684d593aaf0",
  type: "page-type/lore",
  slug: "otherwhere-interface",
  title: "The Interface",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "System windows are English in flat lines, each line a sentence ending in a full stop.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Names and values in a window sit in square brackets, as level [1] or [Earth, 1].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A new window first shows strange runes that turn to English as it is read.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The profile is headed Contestant Profile and lists level, tier, species, grade and class.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The profile lists attributes, abilities, traits, skills and notable inventory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A profile's attribute line reads as Strength: 3 (4), the baseline then the total.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The profile's ability line reads: Ability slots: 2 active, 1 passive, 1 free.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A level-up window opens: Congratulations. You have accumulated enough experience to reach level [n].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A level-up window goes on: You have gained one free point.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A skill window reads: Through use, you have improved the following skills:",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A skill's line in that window reads: Foraging has increased from [0] to [1].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A new skill's line reads: You have unlocked the skill [Stealth].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A conditioning window opens: By pushing yourself to the limit in the midst of a deadly battle,",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It ends: you have conditioned your body and improved the following baseline attributes:",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Long training instead opens: By engaging in rigorous exercise over a prolonged period,",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A quest window reads Quest:, then its name, location, objective and rewards on lines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A chest window opens: Congratulations. You have found a [Wood] chest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A chest window then lists Contents:, one item a line with its rarity in brackets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A chest's knowledge line reads: Tutorial knowledge points gained: 5.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A System notice for the whole isle is headed System Message: with a title.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Choices can be confirmed by speaking aloud to the System.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In a tutorial, windows come unbidden only for level, skill, chest, quest and notices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In a tutorial, calling aloud for a status, profile or menu opens no window anywhere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System never answers a question or a plea spoken to it; it only shows windows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nala called aloud for System, Status and a character sheet, and no window or answer came.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-ii-nala"],
    },
  ],
} as const satisfies Lore
