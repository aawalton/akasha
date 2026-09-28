import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVConclaveRules = {
  id: "01a0e9fb-f2e3-7d08-8f2f-98e30aaa554c",
  type: "page-type/lore",
  slug: "otherwhere-v-conclave-rules",
  title: "Conclave Rules",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-conclave-rules",
  facts: [
    {
      fact: "A Conclave is a gathering of Questors that can change the rules of Davrar by vote.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "What a Conclave agrees to change about Davrar, changes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "There has not been a Conclave for a very long time.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Calling a Conclave costs rare influence and takes long to schedule, once per cycle at most.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Conclave arguments tend to end in duels between Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mortals have never spoken at a Conclave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only five venues in Davrar are large enough for a proper Conclave.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
