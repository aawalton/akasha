import type {
  Admitted,
  Character,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  type Advanced,
  type Handed,
  type Held,
  TURN,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { proseTaken } from "akasha/story/world/stories/played/turns/modules/turn-prose/turn-prose.module.code.ts"

type Prose = Extract<Handed, { kind: "prose" }>

type Narrated = Pick<Held, "status" | "roleplayed" | "noun">

const TOLD_AS =
  "its beats and the prose written from them in one advance (`--beats-file` with `--prose-file` and `--character`)"

export function roleplayTakes(held: Pick<Held, "status" | "roleplayed">): Handed["kind"] | null {
  return held.roleplayed === true && held.status === WORLD_BUILDER ? "beats" : null
}

function handedSaid(handed: Handed): string {
  if (handed.kind === "prose") return "prose without beats"
  if (handed.kind === "beats") return "beats without prose"
  return handed.kind
}

export function toldRefused(held: Narrated, handed: Handed): string | null {
  const told = handed.kind === "beats" ? handed.told : undefined
  if (roleplayTakes(held) === null) {
    if (told === undefined) return null
    const where = held.roleplayed === true ? `at ${held.status}` : "not roleplayed"
    return `prose comes with beats only at a roleplayed turn's ${WORLD_BUILDER}, and this ${held.noun ?? TURN} is ${where}`
  }
  if (told === undefined) {
    return `at ${WORLD_BUILDER} a roleplayed turn takes ${TOLD_AS}, and this hands in ${handedSaid(handed)}`
  }
  if (told.beatProse === undefined) return null
  return "a roleplayed turn's prose file holds the prose itself, not a beat to a line"
}

export function fromRoleplay(
  beaten: Advanced,
  told: Prose,
  cast: readonly Character[],
  admitted: Admitted
): Advanced {
  if ("refused" in beaten) return beaten
  const taken = proseTaken(told.prose, told.characters, cast, admitted)
  if ("refused" in taken) return taken
  return { ...beaten, values: { ...beaten.values, ...taken.values }, prose: taken.prose }
}
