import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const grimFocus = {
  id: "01a05fd0-dca3-74b3-a608-18a091bbb1e3",
  pageTypeSlug: "temper-skill",
  slug: "grim-focus",
  title: "Grim Focus",
  key: "grim-focus",
  baseName: "Grim Focus",
  description:
    '"When slotted on either bar, you gain Major Prophecy and Major Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r.\\n\\nYour Light and Heavy Attacks now generate a stack of Grim Focus, up to |cffffff10|r times. Fully-charged Heavy Attacks grant two stacks.\\n\\nWhen at |cffffff5|r or more stacks, you can consume |cffffff5|r to fire a spectral arrow to deal |cffffff14539|r Magic Damage and heal for |cffffff34|r% of the damage dealt, if you are in melee range."',
  icon: "/esoui/art/icons/ability_nightblade_005.dds",
  esoSkillId: 61902,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
