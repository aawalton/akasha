import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiiTheSystem = {
  id: "01a0e9e2-ee4f-70e9-8ff1-e2b4ac73595e",
  type: "page-type/lore",
  slug: "otherwhere-iii-the-system",
  title: "The System",
  world: "world/super-supportive",
  about: "world-mechanic/otherwhere-iii-the-system",
  facts: [
    {
      fact: "Its proper name is the Interdimensional Warrior's Contract; most people just say the System.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Artonans brought it to Earth in 1963, making Earth an Artonan resource world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It chooses about 0.07% of people as Avowed, most between fifteen and seventeen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System speaks only to the Avowed, by an interface in their sight and a voice in their ears.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A civilian can reach the System only by phone, through the Avowed Communications Network.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iii-nala",
        "character-other/super-supportive-gorgon",
      ],
    },
    {
      fact: "Words spoken aloud to the air by someone not Avowed reach nothing; the System does not answer.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-iii-nala",
        "character-other/super-supportive-gorgon",
      ],
    },
    {
      fact: "No one else can see an Avowed's interface.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Through a caller's sigil the System perceives the caller, and finds no record of Nala anywhere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A living person on Earth with no record of birth or arrival is an anomaly the System flags.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "The network's machine voice gives the System's answers; the Contract does not speak to her itself.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System takes no request for affixation outside selection, and says so plainly.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "It makes no contract of silence by telephone and does not bargain with an unregistered caller.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "A claim of passing through chaos makes the System order a chaos screening before anything else.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "It tells such a caller to stay where she is, and notifies the nearest consulate's Artonan staff.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "The call is logged under her name, and her sigil stays on the lobby phone.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
    {
      fact: "Nala carries no chaos corruption; a screening finds none.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
