import type { TemperSkill } from "../temper-skill.page-type.ts"

export const shadowImage = {
  id: "01a05fd1-7cb7-76cd-92ec-1749e879c34b",
  pageTypeSlug: "temper-skill",
  slug: "shadow-image",
  title: "Shadow Image",
  key: "shadow-image",
  baseName: "Summon Shade",
  description:
    "\"Summon a shade version of yourself to stay in place and attack an enemy from range for 20 seconds. \\n\\nThe shade shoots at an enemy, dealing 478 Magic Damage every 2 seconds, and inflicts Minor Maim for 4 seconds, reducing the enemy's damage done by 5%.\\n\\nWhile the shade is summoned, you can activate this ability again for no cost to teleport to the shade's location.\"",
  icon: "/esoui/art/icons/ability_nightblade_001_b.dds",
  esoSkillId: 36298,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
