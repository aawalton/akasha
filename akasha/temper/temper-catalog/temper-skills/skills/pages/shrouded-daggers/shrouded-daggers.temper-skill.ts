import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shroudedDaggers = {
  id: "019e6226-0113-7c15-a033-70d1a37324ba",
  pageTypeSlug: "temper-skill",
  slug: "shrouded-daggers",
  title: "Shrouded Daggers",
  key: "shrouded-daggers",
  baseName: "Hidden Blade",
  description:
    '"Fire a secret dagger from your sleeve that bounces up to 3 times to nearby enemies, dealing 1799 Physical Damage per hit.  \\n\\nIf enemies hit are casting they are interrupted, set Off Balance, and stunned for 3 seconds.\\n\\nYou also gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 20 seconds."',
  icon: "/esoui/art/icons/ability_dualwield_003_b.dds",
  esoSkillId: 40619,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
