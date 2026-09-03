import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarStrandsOfTheLattice = {
  id: "019e6484-38b6-706c-8599-a9bf960b653e",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-strands-of-the-lattice",
  key: "zerith-var-strands-of-the-lattice",
  title: "Strands of the Lattice",
  icon: "/esoui/art/icons/ability_companion_necromancer_detonatingsiphon.dds",
  description:
    "Your Companion dislodges a spirit's ties to a corpse, releasing spiritual energy and dealing $1 Disease Damage every 2 seconds over 10 seconds. Damage is done within 5m to enemies around the corpse, within 5m to enemies around them, and in a line between them and the corpse. After 10 seconds the corpse explodes, dealing an additional $3 Disease Damage to all enemies around the corpse.",
  companionId: "zerith-var",
  abilityId: 216057,
  skillLineId: "companion-zerith-var-warriors-banishment",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
