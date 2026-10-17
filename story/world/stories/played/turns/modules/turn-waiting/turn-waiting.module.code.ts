import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master.role.ts"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { roleplay as roleplayRole } from "akasha/agent/role/pages/roleplay.role.ts"
import { roleplayRecorder as roleplayRecorderRole } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder as worldBuilderRole } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import {
  type Held,
  PLAYER,
  type TurnStep,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const ROLE_OF: Readonly<{ [step in TurnStep]: string | null }> = {
  "world-builder": worldBuilderRole.slug,
  "game-master": gameMasterRole.slug,
  mechanics: storyRecorderRole.slug,
  writer: writerRole.slug,
  reviewers: reviewerRole.slug,
  recorders: storyRecorderRole.slug,
  player: null,
}

export function roleOf(held: Pick<Held, "status" | "roleplayed">): string | null {
  if (held.roleplayed !== true) return ROLE_OF[held.status]
  if (held.status === WORLD_BUILDER) return roleplayRole.slug
  if (held.status === PLAYER) return null
  return roleplayRecorderRole.slug
}
