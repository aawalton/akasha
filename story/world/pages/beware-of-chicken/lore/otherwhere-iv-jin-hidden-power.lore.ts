import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvJinHiddenPower = {
  id: "01a0ea11-e462-7802-81c1-14791690183d",
  type: "page-type/lore",
  slug: "otherwhere-iv-jin-hidden-power",
  title: "Jin's Power and Secrets",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Jin is credited with beating three Earth Realm demons and a Sky Realm one at Fa Ram last Solstice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Folk think Jin a strong Earth Realm master; many call him the strongest man in the province.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jin fights with a plain-looking shovel, the spirit tool Lao You (Old Faithful).",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jin shows no visible Qi aura unless he chooses to reveal it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jin can calm a terrified Spirit Beast just by sharing food and sparing its life.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nearly every Spirit Beast Jin meets grows docile and serves him, a pattern other sects fear.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
