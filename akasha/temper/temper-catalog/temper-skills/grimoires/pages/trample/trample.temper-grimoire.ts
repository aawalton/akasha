import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const trample = {
  id: "01a05fce-2958-799a-a288-3c90f810712c",
  pageTypeSlug: "temper-grimoire",
  slug: "trample",
  title: "Trample",
  key: "trample",
  icon: "/esoui/art/icons/item_grimoire_assault.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_assault.dds",
  itemId: 204495,
  uespId: 11,
  skillLineId: "alliance-war-assault",
  focusScripts: [
    "dispel",
    "disease-damage",
    "frost-damage",
    "knockback",
    "magic-damage",
    "physical-damage",
    "stun",
    "trauma",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
