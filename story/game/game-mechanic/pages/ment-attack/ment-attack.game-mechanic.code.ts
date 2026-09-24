import { attackBy } from "akasha/story/game/game-mechanic/modules/attack-mode/attack-mode.module.code.ts"
import { runMechanic as mentAtk } from "akasha/story/game/game-mechanic/pages/ment-atk/ment-atk.game-mechanic.code.ts"
import { runMechanic as mentDef } from "akasha/story/game/game-mechanic/pages/ment-def/ment-def.game-mechanic.code.ts"

export const runMechanic = attackBy(mentAtk, mentDef)
