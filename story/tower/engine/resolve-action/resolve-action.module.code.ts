import type { ActionInput, ActionResult } from "../combat-types/combat-types.module.code.ts"
import { derive } from "../derive/derive.module.code.ts"
import { rng, rollFor } from "../rng/rng.module.code.ts"

export function resolveAction(inp: ActionInput): ActionResult {
  const intent = Math.max(0, Math.min(10, inp.intent))
  const gate = Math.max(0, inp.gate ?? 1)
  const gatedBase = inp.baseDamage * gate
  const ad = derive(inp.attacker)
  const dd = derive(inp.defender)
  const next = rng(inp.seed)
  const roll = rollFor(inp.attacker, next)
  const attackPower =
    inp.mode === "phys"
      ? ad.physAtk
      : inp.attacker.attributes.INTELLECT * 1.2 + inp.attacker.attributes.WILL
  const defense = inp.mode === "phys" ? dd.physDef : dd.mentDef
  const skillBonus = inp.skillBonus ?? 0
  const effectiveScore = round1(attackPower + skillBonus + intent + roll.total)
  const margin = round1(effectiveScore - defense)

  let hit: boolean
  let damage = 0
  if (roll.fumble) {
    hit = false
  } else if (roll.crit) {
    hit = true
    damage = Math.max(1, Math.round(gatedBase * (1 + Math.max(margin, 6) / 12) * 1.5))
  } else if (margin >= 0) {
    hit = true
    damage = Math.max(1, Math.round(gatedBase * (1 + margin / 12)))
  } else if (margin > -3) {
    hit = true
    damage = Math.max(1, Math.round(gatedBase * 0.25))
  } else {
    hit = false
  }

  const gateTag = gate !== 1 ? ` gate ×${gate}` : ""
  const tag = roll.crit ? " CRIT!" : roll.fumble ? " FUMBLE!" : ""
  const line =
    `${inp.attacker.name} → ${inp.defender.name} [${inp.mode}] ` +
    `power ${round1(attackPower)} + skill ${skillBonus} + intent ${intent} + roll ${roll.total} (${roll.dice.join("+")}, ${roll.mode})${tag} ` +
    `= ${effectiveScore} vs def ${round1(defense)} → margin ${margin}${gateTag} → ${hit ? `${damage} dmg` : "MISS"}`
  return {
    hit,
    crit: roll.crit,
    fumble: roll.fumble,
    roll,
    attackPower: round1(attackPower),
    intent,
    skillBonus,
    gate,
    effectiveScore,
    defense: round1(defense),
    margin,
    damage,
    line,
  }
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}
