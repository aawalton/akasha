import type { TemperGrimoire } from "../../temper-grimoire.page-type.ts"

export const shieldThrow = {
  id: "01a05fce-2956-7f43-a29a-78ffd8016e8d",
  pageTypeSlug: "temper-grimoire",
  slug: "shield-throw",
  title: "Shield Throw",
  key: "shield-throw",
  icon: "/esoui/art/icons/item_grimoire_1hander.dds",
  abilityIcon: "/esoui/art/icons/ability_grimoire_1handed.dds",
  itemId: 204486,
  uespId: 3,
  skillLineId: "weapon-one-hand-and-shield",
  focusScripts: [
    "frost-damage",
    "immobilize",
    "knockback",
    "magic-damage",
    "multi-target",
    "physical-damage",
    "pull",
    "taunt",
  ],
  affixScripts: "jsonl",
  signatureScripts: "jsonl",
} as const satisfies TemperGrimoire
