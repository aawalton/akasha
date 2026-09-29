import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveContractTattoo = {
  id: "01a0ea06-4082-7444-945d-853f30315846",
  type: "page-type/lore",
  slug: "super-supportive-contract-tattoo",
  title: "Contract tattoos",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-contract-tattoo",
  facts: [
    {
      fact: "A private magical contract is sealed by tattoos, which serve as its proof.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-iii-onn-desveth"],
    },
    {
      fact: "Private contracts lack full System oversight and can omit the human protections.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-iii-onn-desveth"],
    },
    {
      fact: "The stronger party empowers the contract and its understanding crushes the weaker's.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-iii-onn-desveth"],
    },
    {
      fact: "Artonan officials and teachers carry large networks of dark blue contract tattoos.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-iii-onn-desveth"],
    },
    {
      fact: "A secrecy clause can leave a party physically unable to voice forbidden questions.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-iii-onn-desveth"],
    },
    {
      fact: "Secrets sealed by a contract tattoo cannot be taken even under torture.",
      knowers: ["lore-disclosure/game-master", "character-other/otherwhere-iii-onn-desveth"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
