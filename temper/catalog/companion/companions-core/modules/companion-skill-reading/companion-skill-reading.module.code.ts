import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { slugAt, slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { CompanionSkillTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import type { CompanionEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import { temperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.ts"
import type { EffectCondition } from "akasha/temper/catalog/skill-kind/modules/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"

type CompanionSkillKind = CompanionSkillTemplate["skillType"]

type CompanionSkillRole = CompanionSkillTemplate["validRoles"][number]

const KINDS: readonly CompanionSkillKind[] = ["active", "passive", "ultimate"]

const ROLES: readonly CompanionSkillRole[] = ["dps", "healer", "tank", "support"]

function rowIn(said: unknown): unknown {
  if (said === null || typeof said !== "object") return {}
  const held: Record<string, unknown> = { ...(said as Record<string, unknown>) }
  delete held.id
  const named = held.effect
  if (typeof named === "string") held.effect = slugOf(named)
  return held
}

export function effectsIn(said: unknown): readonly CompanionEffect[] {
  return Array.isArray(said) ? said.map((one) => rowIn(one) as CompanionEffect) : []
}

export function conditionsIn(said: unknown): readonly EffectCondition[] {
  return Array.isArray(said) ? said.map((one) => rowIn(one) as EffectCondition) : []
}

export function textsIn(said: unknown): readonly string[] {
  return Array.isArray(said) ? said.filter((one) => typeof one === "string") : []
}

export function numbersIn(said: unknown): readonly number[] {
  return Array.isArray(said) ? said.filter((one) => typeof one === "number") : []
}

function rolesIn(said: unknown): readonly CompanionSkillRole[] {
  const named = new Set<string>(textsIn(said))
  return ROLES.filter((one) => named.has(one))
}

function kindIn(said: string | null, at: string): CompanionSkillKind {
  for (const one of KINDS) {
    if (said === one) return one
  }
  throw new Error(`${at} states \`${String(said)}\`, and a skill is ${KINDS.join(", ")}`)
}

export function textIn(said: unknown, key: string, at: string): string {
  if (typeof said === "string" && said !== "") return said
  throw new Error(`${at} states no ${key}`)
}

function numberIn(said: unknown, key: string, at: string): number {
  if (typeof said === "number") return said
  throw new Error(`${at} states no ${key}`)
}

export async function readCompanionSkills(): Promise<readonly CompanionSkillTemplate[]> {
  const { rows } = await getPages({
    pageTypeSlug: temperCompanionSkill.slug,
    select: [
      "slug",
      "key",
      "title",
      "icon",
      "description",
      "abilityId",
      "companionId",
      "skillLineId",
      "skillType",
      "validRoles",
      "tags",
      "alternateAbilityIds",
      "skillEffects",
      "castConditions",
    ],
    order: [{ by: "slug", dir: "asc" }],
    limit: 500,
  })
  return rows.map((row) => {
    const at = row.slug ?? row.id
    return {
      id: textIn(row.key, "key", at),
      abilityId: numberIn(row.abilityId, "abilityId", at),
      name: textIn(row.title, "title", at),
      icon: typeof row.icon === "string" ? row.icon : null,
      description: textIn(row.description, "description", at),
      companionId: slugAt(row, "companionId"),
      skillLineId: textIn(row.skillLineId, "skillLineId", at),
      skillType: kindIn(slugAt(row, "skillType"), at),
      effects: effectsIn(row.skillEffects),
      castConditions: conditionsIn(row.castConditions),
      alternateAbilityIds: numbersIn(row.alternateAbilityIds),
      tags: textsIn(row.tags),
      validRoles: rolesIn(row.validRoles),
    }
  })
}
