import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelGallantBlitz = {
  id: "01a05fd0-1d7e-7a36-a1ea-08b31474d596",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-gallant-blitz",
  key: "isobel-gallant-blitz",
  title: "Gallant Blitz",
  icon: "/esoui/art/icons/ability_companion_templar_focused_charge.dds",
  description:
    "Your Companion charges toward their enemy with a vibrant spear that bursts in a flash of light, setting all enemies in the area Off Balance for $$1 seconds.",
  companionId: "isobel",
  abilityId: 163590,
  skillLineId: "companion-isobel-brilliant-shield",
  skillType: "active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
