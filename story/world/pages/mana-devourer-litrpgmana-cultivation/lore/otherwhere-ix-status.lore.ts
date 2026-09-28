import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxStatus = {
  id: "01a0ea37-5dd6-7b28-b34b-f4063ae6a5ec",
  type: "page-type/lore",
  slug: "otherwhere-ix-status",
  title: "Status",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-status",
  facts: [
    {
      fact: "A status screen lists Name, Class, Health, Mana, then six attribute lines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Each line is its own bracketed box, such as "[Name: Markus Brown]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Class line: "[Class: Otherworlder (Earth) (Tier: Novice 10)]", tier and level together.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Health shows current over maximum, as in "[Health: 303/395]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Mana shows current over maximum, as in "[Mana: 832/1090]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Current mana can be above maximum for one who can overfill, as in "[Mana: 832/430]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Sealed mana is shown in brackets: "[Mana: 401/1910 (13630 mana sealed)]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The attribute lines run Strength, Agility, Arcana, Constitution, Spirit, then a sixth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Where the sixth attribute is locked, its line reads "[???: 0]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The "???" line is greyed out; it cannot be raised, nor even hovered over.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Temporary bonuses show after the score, as in "[Strength: 48 (+30)]".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The number shown already counts the bonus; 48 (+30) means a base score of 18.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Champion's screen shows a \"[Faith: N]\" line in the sixth attribute's place.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A screen with a subclass lists both classes on one class line, split by a slash.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Example: "[Class: Champion (Earth): (Tier: Novice 1)/ Dark Knight: (Tier Novice 21)]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Health and mana maxima derive from attributes, chiefly Constitution and Spirit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The status can show mana as a share of capacity: "[Current Mana Capacity: 205%."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…followed by "View breakdown? Y/N.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The breakdown begins "[Stored mana by Grade:]" and lists each grade and type.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Breakdown lines read like "[D Grade Blood Mana: 30%]", each a share of capacity.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Once Faith is unlocked, the stat menu carries a 'redeem' button.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only the owner can read a status screen; others must appraise to learn it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Attributes, skills, levels and class are an accurate window into a person's prowess.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wise fighters keep their status private, for it can be used against them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class can be guessed, or read by a strong Identify; levels are easy to estimate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Skills and attribute scores are near impossible to learn without strong appraisal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
