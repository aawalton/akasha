import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereArmadaWurm = {
  id: "01a0e9c4-861c-7f9a-a639-9949c7817fed",
  type: "page-type/lore",
  slug: "otherwhere-armada-wurm",
  title: "The Armada Wurm",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Armada Wurm is a capital boss copied from a yadras, its world's apex burrower.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its slug-like body is an order of magnitude bigger than a blue whale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its armored, bladed tongue is over fifty feet long and its only weapon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It swims through soil with earth magic and cannot burrow through ice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slashers are man-sized crimson mantis-ants with blade arms, hundreds strong.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stingers are eagle-sized armored wasps whose venom saps the limbs, then paralyzes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bashers are draft-horse-sized insects with purple shells and wrecking-ball tails.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two elephantine acid slugs sleep deep inside and rise only to save the wurm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wurm has two hearts, and its brain is its weak point.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
