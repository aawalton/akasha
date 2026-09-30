import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiEddaCrane = {
  id: "01a0f41e-e5e1-7e70-88f0-15f22ca690d2",
  type: "page-type/lore",
  slug: "overwhere-iii-edda-crane",
  title: "Edda Crane",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-edda-crane",
  facts: [
    {
      fact: "Edda Crane is near seventy, tiny and soot-grimed, a charcoal-burner from the Wrenwood's edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is a Common, a Burner of Level 11, sharp-tongued, and trusts no healer she hasn't seen work.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A splinter off a blighted stump went into her right palm; the hand is gray and stiff to the wrist.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/overwhere-iii-edda-crane",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-brannagh-tull",
      ],
    },
    {
      fact: "One pull clears Edda's palm; the splinter hole is small and closes by itself once clean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hearing Hild in the square, Edda walked in at dawn, and waits on Brannagh's bench with 10 copper.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-edda-crane"],
    },
    {
      fact: "Blighted stumps crowd her kilns, and she's seen gray-furred things moving there at dusk.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-edda-crane"],
    },
    {
      fact: "The charcoal-burner is a tiny, soot-grimed old woman who says, 'Let's see you work, then.'",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-edda-crane",
        "character-other/overwhere-iii-brannagh-tull",
      ],
    },
  ],
} as const satisfies Lore
