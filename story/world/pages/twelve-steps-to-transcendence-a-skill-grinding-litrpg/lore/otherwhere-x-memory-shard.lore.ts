import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXMemoryShard = {
  id: "01a0ea77-7cd1-76f5-9b54-2c72c0a1114b",
  type: "page-type/lore",
  slug: "otherwhere-x-memory-shard",
  title: "Memory Shard",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-memory-shard",
  facts: [
    {
      fact: "A memory shard makes learning its skill far easier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Memory shards need special recording equipment, or drop from monsters with the skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drops are not guaranteed; many kills of a skilled monster can yield none.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Drop notice: "[Tier 1 Hobgoblin slain. Essence gained. Memory shard gained.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The System asks: "Would you like to absorb [Regeneration] memory shard?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No eating or crushing is needed; absorbing is a mental yes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The absorber becomes a helpless passenger in the monster's body, reliving a memory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The memory carries the creature's sensations, pain and emotions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grasping the skill burns a permanent runic inscription into the mind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After the memory the System offers to teach the skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A skill that cannot be learned by practice can be gained from a memory shard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healer goblins are the usual targets killed for the [Regeneration] shard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nobles train for years with memory shards to experience skills before Tier 1.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
