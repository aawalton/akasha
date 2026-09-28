import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvLanqiao = {
  id: "01a0e9ff-e534-7d73-a24f-a6e2c0a69add",
  type: "page-type/place",
  slug: "otherwhere-iv-lanqiao",
  title: "Lanqiao",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  exits: [
    {
      to: "place/otherwhere-iv-ox-back-ridge",
      way: "Out the gate and up the market road over Ox-Back Ridge, toward Three Stones.",
    },
  ],
  facts: [
    {
      fact: "Lanqiao is the market town thirty li down the river from Three Stones.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iv-nala"],
    },
    { fact: "Lanqiao is a walled mortal town.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Its name comes from its old blue-grey stone bridge, where the river road crosses to the east bank.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Market falls every fifth day, and the square fills from dawn with farmers from a dozen villages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A county magistrate's yamen sits by the north gate, with a drum at its gate for grievances.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The magistrate is Lord Pan Yuhe, a tidy, cautious man who wants no trouble reaching the governor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lanqiao is a far southwestern corner of the Azure Hills, weeks on foot from any great sect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "News of the Azure Alliance, its patrols and its machines reaches Lanqiao late, as rumor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No railway reaches Lanqiao; goods go by ox-cart and by flat-bottomed river boat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hall of Fragrant Clouds pawnshop buys odd goods cheap and asks few questions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Silkworm cocoons, rice, tea and bamboo go downriver; salt, iron, cloth and needles come up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A bowl of noodles costs 3 copper coins, a night in the cheapest inn 20, a pair of straw sandals 5.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cotton shirt costs about 60 copper coins, an iron knife 150, a good hoe 300.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A night's lodging at the Crane's Rest inn costs 80 copper coins with a meal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A clerk at the yamen writes letters and reads contracts for mortals, 10 copper coins a page.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Once a month a Lanqiao notice board posts bounties from the yamen, most for bandits or lost cattle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Strangers give a name and village at the gate; a foreigner with no papers draws the guard's eye.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town has a small martial hall, the Iron Crane School, where mortals learn fist and staff.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Master Hou of the Iron Crane School has no cultivation, but once guarded caravans for ten years.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
