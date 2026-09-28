import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereCrystalAssistants = {
  id: "01a0e9d2-c08c-7aaf-8caf-e598e75c3f3c",
  type: "page-type/lore",
  slug: "otherwhere-crystal-assistants",
  title: "Crystal Assistant Constructs",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A crystal assistant construct is a palm-sized magitech device sealed to one owner.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When its owner dies it deletes its data and resets for a new owner.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Linking to a new owner probes their core and perhaps their bloodline.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its functions include audio logs, clocks, timers and a floating light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its light can hover over a shoulder or focus into a beam and change color.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It can play location logs that blink to life where they were recorded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A damaged construct restores functions by absorbing compatible magitech parts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Restored functions include automapping, a sentry alarm and hovering within a hundred feet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It can also link its sensors to its user's senses and project the user's voice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its recordings stay blocked on Velen.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
