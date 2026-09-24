import { attackBy } from "akasha/story/game/game-mechanic/modules/attack-mode/attack-mode.module.code.ts"
import { runMechanic as physAtk } from "akasha/story/game/game-mechanic/pages/phys-atk/phys-atk.game-mechanic.code.ts"
import { runMechanic as physDef } from "akasha/story/game/game-mechanic/pages/phys-def/phys-def.game-mechanic.code.ts"

export const runMechanic = attackBy(physAtk, physDef)
