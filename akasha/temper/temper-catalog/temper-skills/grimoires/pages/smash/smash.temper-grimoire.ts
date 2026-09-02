import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const smash = {
  id: "01a05fce-2957-764c-b963-d9a99d848f4f",
  pageTypeSlug: "temper-grimoire",
  slug: "smash",
  title: "Smash",
  key: "smash",
  icon: "/esoui/art/icons/item_grimoire_2hander.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_2handed.dds",
  itemId: 204487,
  uespId: 4,
  skillLineId: "weapon-two-handed",
  focusScripts: [
    "bleed-damage",
    "damage-shield",
    "healing",
    "knockback",
    "magic-damage",
    "physical-damage",
    "poison-damage",
    "stun",
    "taunt",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
