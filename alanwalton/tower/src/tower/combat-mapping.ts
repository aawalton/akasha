import type { FloorEnemy } from "@alanwalton/tower-core/floor-schema"
import type { Hud } from "@alanwalton/tower-core/revealed-sheet"
import { CharacterSkillSchema, type GameCharacterSheet } from "@alanwalton/tower-core/character-schema"
import type { Sheet as CombatSheet } from "@alanwalton/tower-engine/types"
import { z } from "zod"

export type PersistedCombatant = GameCharacterSheet | FloorEnemy

export function toCombatSheet(c: PersistedCombatant): CombatSheet {
  const weaponAtk = c.equipment?.weapon?.atk
  const armorDef = c.equipment?.armor?.def
  const rawSkills = z.array(CharacterSkillSchema).safeParse(Reflect.get(c, "skills"))
  const skills = rawSkills.success
    ? rawSkills.data
        .filter((s) => s.id !== undefined || s.name !== undefined)
        .map((s) => ({ id: s.id ?? s.name ?? "", name: s.name ?? s.id ?? "" }))
    : undefined
  return {
    name: c.name,
    kind: c.kind,
    level: c.level,
    ...(c.class !== undefined ? { class: c.class } : {}),
    attributes: c.attributes,
    ...(c.rollMode !== undefined ? { rollMode: c.rollMode } : {}),
    ...(weaponAtk !== undefined || armorDef !== undefined
      ? {
          equipment: {
            ...(weaponAtk !== undefined ? { weapon: { atk: weaponAtk } } : {}),
            ...(armorDef !== undefined ? { armor: { def: armorDef } } : {}),
          },
        }
      : {}),
    ...(skills !== undefined ? { skills } : {}),
  }
}

export function applyActionDamage(hud: Hud, damage: number): Hud {
  const hp = Math.max(0, hud.hp - damage)
  return { ...hud, hp, delta: { ...hud.delta, hp: hp - hud.hp } }
}
