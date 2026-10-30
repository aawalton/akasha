import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { roleplay as roleplayRole } from "akasha/agent/role/pages/roleplay.role.ts"
import { roleplayRecorder as roleplayRecorderRole } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder as worldBuilderRole } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import {
  BEATS,
  type Caller,
  CHAPTER,
  GAME_MASTER,
  type Held,
  PLAYER,
  TURN,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const NARRATED: readonly TurnStep[] = [WORLD_BUILDER, GAME_MASTER]

const ROLE_OF: Readonly<{ [step in TurnStep]: string | null }> = {
  "world-builder": worldBuilderRole.slug,
  "game-master": gameMasterRole.slug,
  beats: null,
  mechanics: storyRecorderRole.slug,
  writer: writerRole.slug,
  reviewers: reviewerRole.slug,
  recorders: storyRecorderRole.slug,
  player: null,
}

type Waiting = Pick<Held, "status" | "roleplayed" | "oneSeat" | "memoryOwed">

function seatedRoleOf(held: Waiting): string | null {
  const role = held.memoryOwed === true ? storyRecorderRole.slug : ROLE_OF[held.status]
  return role !== null && held.oneSeat === true ? gameMasterRole.slug : role
}

export function roleOf(held: Waiting): string | null {
  if (held.roleplayed !== true) return seatedRoleOf(held)
  if (NARRATED.includes(held.status)) return roleplayRole.slug
  if (held.status === PLAYER) return null
  return roleplayRecorderRole.slug
}

const AT_BEATS: readonly string[] = [
  gameMasterRole.slug,
  writerRole.slug,
  storyRecorderRole.slug,
  reviewerRole.slug,
]

const ALONE_AT_BEATS: readonly string[] = [gameMasterRole.slug]

function beatCallerRefused(held: Held, caller: Caller): string | null {
  const seats = held.oneSeat === true ? ALONE_AT_BEATS : AT_BEATS
  if (caller.role !== null && seats.includes(caller.role) && caller.game === held.game) {
    return null
  }
  const named = `${seats.join(" and ")} seat${seats.length === 1 ? "" : "s"}`
  return `the turn is at ${BEATS}, so it waits on the ${named} of \`${held.game}\`, beat by beat`
}

export function callerRefused(held: Held, caller: Caller): string | null {
  if (held.status === BEATS && held.roleplayed !== true) return beatCallerRefused(held, caller)
  const role = roleOf(held)
  const noun = held.noun ?? TURN
  if (role === null && noun === CHAPTER) {
    return `the chapter is at ${PLAYER}, so it is published and nothing moves it on`
  }
  if (role === null) {
    return `the turn is at ${PLAYER}, and only the player's next action makes the next turn`
  }
  if (caller.role === role && caller.game === held.game) return null
  const from =
    caller.role === null
      ? "no seat that holds a role"
      : `a ${caller.role} seat${caller.game === null ? "" : ` of \`${caller.game}\``}`
  return `the ${noun} is at ${held.status}, so it waits on the ${role} of \`${held.game}\`, and this advance comes from ${from}`
}
