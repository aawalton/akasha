import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianCragSmash = {
  id: "019e6484-384a-74c6-8e49-515e726ca209",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-crag-smash",
  key: "bastian-crag-smash",
  title: "Crag Smash",
  icon: "/esoui/art/icons/ability_companion_dragonknight_013.dds",
  description: "Your Companion hurls a chunk of rock at an enemy, dealing $1 Physical Damage.",
  companionId: "bastian",
  abilityId: 155186,
  skillLineId: "companion-bastian-ardent-warrior",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
