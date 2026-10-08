import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const terminusDivineSequence = {
  id: "01a11cfc-614b-7b0f-9487-842ae12fa0a8",
  type: "page-type/lore",
  slug: "terminus-divine-sequence",
  title: "The Divine Sequence",
  world: "world/terminus",
  about: "world/terminus",
  facts: [
    {
      fact: "The Divine Sequence runs 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 and on without end.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sequence's first four terms are fixed: d(1) = 1, d(2) = 2, d(3) = 3 and d(4) = 5.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each later term is the sum of the two before it: d(n) = d(n-1) + d(n-2).",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ratio between consecutive terms of the sequence approaches the golden ratio.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The builders of The Terminus used the Divine Sequence as their number system.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Divine Sequence is also the basis of the builders' language.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Divine notation has only three symbols: the dot and the two parentheses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Divine notation a dot is 1, and up to four dots in a row count as their number.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Parentheses apply the sequence to what they enclose, so (....) is d(4), which is 5.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nested parentheses apply the sequence again: ((....)) is d(d(4)) = d(5) = 8.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Divine notation (((....))) is d(8), which is 34.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Divine notation ((((....)))) is d(34), which is 9,227,465.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each added layer of parentheses makes a Divine number explosively larger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Other numbers are written as sums, terms side by side with the largest first.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Divine notation (....). is 6, (....).. is 7, ((....)). is 9 and ((....)).... is 12.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The people living on The Terminus now use other number systems.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Remnants of the Divine Sequence run all through the architecture of The Terminus.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-08T19:27:44.458Z",
  updatedAt: "2026-10-08T19:27:44.458Z",
} as const satisfies Lore
