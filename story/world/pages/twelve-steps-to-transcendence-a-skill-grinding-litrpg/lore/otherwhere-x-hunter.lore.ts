import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXHunter = {
  id: "01a0ea7a-dd29-7086-b108-64010c9dcb57",
  type: "page-type/lore",
  slug: "otherwhere-x-hunter",
  title: "Hunter",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-title/otherwhere-x-hunter",
  facts: [
    {
      fact: "[Hunter] is a Unique title with no progress counter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It judges a target by a feeling at the back of the neck.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'It marks prey "Unworthy", "Worthy" (a shiver of anticipation) or "Danger" (a panic siren).',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It warns its holder of beings stronger than themselves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It failed to warn against an adaptive-stealth Shadow Monkey.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It pairs well with [Mana Sonar] for tracking.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 1 horned wolf leading a wolf pack carried it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Notice: "[Tier 1 Horned Wolf slain. Essence gained. Title usurped.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben usurped it from that wolf; it was his first title and is his equipped one.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
