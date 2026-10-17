import type {
  Admitted,
  Character,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  type Advanced,
  GAME_MASTER,
  type Handed,
  type Held,
  moved,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { proseTaken } from "akasha/story/world/stories/played/turns/modules/turn-prose/turn-prose.module.code.ts"

type Prose = Extract<Handed, { kind: "prose" }>

export function roleplayTakes(held: Pick<Held, "status" | "roleplayed">): Handed["kind"] | null {
  return held.roleplayed === true && held.status === WORLD_BUILDER ? "prose" : null
}

export function fromRoleplay(
  handed: Prose,
  cast: readonly Character[],
  admitted: Admitted
): Advanced {
  const taken = proseTaken(handed.prose, handed.characters, cast, admitted)
  if ("refused" in taken) return taken
  return moved(GAME_MASTER, taken.values, { prose: taken.prose })
}
