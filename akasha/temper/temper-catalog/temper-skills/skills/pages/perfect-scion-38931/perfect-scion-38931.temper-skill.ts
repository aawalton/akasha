import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const perfectScion38931 = {
  id: "019e6f53-a4e9-76fd-81c6-633a51cc6ff2",
  pageTypeSlug: "temper-skill",
  slug: "perfect-scion-38931",
  title: "Perfect Scion",
  key: "perfect-scion-38931",
  baseName: "Blood Scion",
  description:
    '"Transform into a monstrous creature of the night, instantly healing to full Health.\\n\\nWhile transformed, your Max Health, Magicka, and Stamina are increased by |cffffff10000|r, you heal for |cffffff15|r% of all damage you deal, and you can see enemies through walls. \\n\\nYou also ascend to Vampire Stage 5, which grants all the benefits of Vampire Stage 4 with none of the drawbacks."',
  icon: "/esoui/art/icons/ability_u26_vampire_06_b.dds",
  esoSkillId: 38931,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 5,
  skillLineId: "world-vampire",
  skillType: "ultimate",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
