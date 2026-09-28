import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiEvaluationCourse = {
  id: "01a0e9bb-b06e-79c4-b525-5ed1c0cf128b",
  type: "page-type/place",
  slug: "otherwhere-ii-evaluation-course",
  title: "Level Seventeen, the Species-Evaluation Course",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-tower-of-rizzen",
  facts: [
    {
      fact: "Level seventeen is a mile-wide white dome built for a famous species evaluation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A hologram greets guests and promises prizes, including species-experience pills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The dome's machines create simulated lands that feel endless from inside.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The course has five stages, each a hazard followed by a combat trial.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ever-Winter Tundra is a blizzard-swept pine forest guarded by ice elementals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Molten Bowl is an obsidian crater that fills with lava, caustic gas and magma eels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Titan's Elbow is a peak so high the air is thin, home to horned cliff lizards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Pummeled Plains are a grassland under a meteor shower, full of kraken vines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Trial Administrator runs the course from a machine bank behind a catastrophe-class shield.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
