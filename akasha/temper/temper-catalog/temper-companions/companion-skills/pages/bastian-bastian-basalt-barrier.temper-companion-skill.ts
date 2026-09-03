import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianBasaltBarrier = {
  id: "019e6484-3847-75cb-9c57-281ffbda5cdb",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-basalt-barrier",
  key: "bastian-basalt-barrier",
  title: "Basalt Barrier",
  icon: "/esoui/art/icons/ability_companion_dragonknight_017.dds",
  description:
    "Your Companion calls the earth to their defense, granting a damage shield for them and their nearby allies that absorbs $1 damage for $$1 seconds. While the damage shield holds, healing received is increased by 15%.",
  companionId: "bastian",
  abilityId: 153851,
  skillLineId: "companion-bastian-radiating-heart",
  skillType: "active",
  validRoles: ["tank", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
