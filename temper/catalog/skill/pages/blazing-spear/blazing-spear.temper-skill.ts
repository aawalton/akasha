import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const blazingSpear = {
  id: "019e6245-a5fa-7fe5-b96f-b51350dfc6c6",
  type: "page-type/temper-skill",
  slug: "blazing-spear",
  title: "Blazing Spear",
  key: "blazing-spear",
  baseName: "Spear Shards",
  description:
    "Send your spear into the heavens to bring down a shower of divine wrath, dealing 1742 Magic Damage to enemies in the area and an additional 276 Magic Damage every 1 second for 10 seconds. Enemies hit by the initial hit are immobilized for 4 seconds.\n\nAn ally near the spear can activate the Blessed Shards synergy, restoring 3960 Magicka or Stamina, whichever maximum is higher.",
  icon: "/esoui/art/icons/ability_templarsun_thrust.dds",
  esoSkillId: 27167,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 103,
  createdAt: "2026-05-26T03:13:12.186Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0123598 MaxStat + 0.129698 MaxPower - 1.95669 (Ultimate, ratio = 10.49, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999989)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = Blessed Shards (Constant)",
    "<<7>> = 3960 (Constant)",
  ],
} as const satisfies TemperSkill
