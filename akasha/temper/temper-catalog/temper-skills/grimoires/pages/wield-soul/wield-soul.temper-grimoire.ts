import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const wieldSoul = {
  id: "01a05fce-2959-7331-ba75-a2bd0c58545a",
  pageTypeSlug: "temper-grimoire",
  slug: "wield-soul",
  title: "Wield Soul",
  key: "wield-soul",
  icon: "/esoui/art/icons/item_grimoire_soulmagic1.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  itemId: 204491,
  uespId: 2,
  skillLineId: "world-soul-magic",
  focusScripts: [
    "bleed-damage",
    "damage-shield",
    "disease-damage",
    "flame-damage",
    "frost-damage",
    "healing",
    "magic-damage",
    "physical-damage",
    "pull",
    "shock-damage",
    "stun",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
