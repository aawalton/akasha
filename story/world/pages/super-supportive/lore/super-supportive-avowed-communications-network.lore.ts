import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveAvowedCommunicationsNetwork = {
  id: "01a0e9fa-71c1-74cf-bbdb-b8dc01d99065",
  type: "page-type/lore",
  slug: "super-supportive-avowed-communications-network",
  title: "Avowed Communications Network",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-avowed-communications-network",
  facts: [
    {
      fact: "It is the System's phone network for a planet, reached by a very long number.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It greets callers as Earthling and asks unregistered ones for name, reason and urgency.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It warns that prank calls will be penalized.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A caller gets a silver sigil on any phone held, even a rotary, and it cannot be deleted.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its number is public and any phone can dial it, registered or not.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The greeting is a machine's; a live answer is not promised.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Contract itself speaks to Avowed; the network only takes and passes calls.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
