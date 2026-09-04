import { z } from "zod"
import {
  CharacterSkillSchema,
  type GameCharacterSheet,
} from "../core/character-schema/character-schema.module.code.ts"
import type { FloorEnemy } from "../core/floor-schema/floor-schema.module.code.ts"
import type { Hud } from "../core/revealed-sheet/revealed-sheet.module.code.ts"
import type { Sheet as CombatSheet } from "../engine/combat-types/combat-types.module.code.ts"

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
