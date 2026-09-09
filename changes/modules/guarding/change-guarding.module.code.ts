import { NOT_WORKED_OUT } from "../../../pages/shadow/shadow.module.code.ts"
import { refusing, replayed } from "../answer/change-answer.module.code.ts"
import type { Answer } from "../answer/change-answer.module.types.ts"
import { castingOn, type World } from "../shadow/change-shadow.module.code.ts"
import type { Guard, Guarding } from "./change-guarding.module.types.ts"

export const NOT_READ = "the index this guard reads could not be read"

export function unreadable(cause: unknown): string {
  return `${NOT_READ} — ${cause instanceof Error ? cause.message : String(cause)}`
}

export function takingIn(said: Answer): readonly string[] {
  const taken: string[] = []
  for (const one of said.edits) {
    if (one.kind === "remove") taken.push(one.path)
  }
  return taken
}

export function carriedIn(said: Answer): readonly string[] {
  const carried: string[] = []
  for (const one of said.edits) {
    if (one.kind === "move") carried.push(one.pathFrom)
  }
  return carried
}

export function judgingOver(
  given: Guarding,
  gone: readonly string[],
  hanging: (asked: Guarding, paths: readonly string[]) => string | null
): string | null {
  if (gone.length === 0) return null
  try {
    return hanging(given, gone)
  } catch (cause) {
    return unreadable(cause)
  }
}

export function judging(
  given: Guarding,
  hanging: (asked: Guarding, paths: readonly string[]) => string | null
): string | null {
  return judgingOver(given, takingIn(given.said), hanging)
}

export function holdsAfter(given: Guarding, path: string): boolean {
  const held = replayed(given.said, given.before.bodyOf)
  if ("refused" in held || !held.has(path)) return given.before.bodyOf(path) !== null
  return held.get(path) !== null
}

export function textAfter(given: Guarding, path: string): string | null {
  const held = replayed(given.said, given.before.bodyOf)
  if ("refused" in held || !held.has(path)) return given.before.textOf(path)
  const body = held.get(path)
  return typeof body === "string" ? body : null
}

export function writtenIn(given: Guarding): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const held = replayed(given.said, given.before.bodyOf)
  if ("refused" in held) return found
  for (const [path, body] of held) if (typeof body === "string") found.set(path, body)
  return found
}

export function guardedBy(
  world: World,
  said: Answer,
  guards: readonly Guard[],
  before: World = world
): Answer {
  if (said.refused !== null || guards.length === 0) return said
  const casting = castingOn(world, said)
  if (casting.whole.refused !== null) return refusing(casting.whole.refused)
  const bodies = replayed(casting.whole, casting.base)
  if ("refused" in bodies) return refusing(bodies.refused)
  const cast = casting.cast()
  if ("refused" in cast) return refusing(NOT_WORKED_OUT)
  const given: Guarding = { said, shadow: cast, before }
  for (const guard of guards) {
    const why = guard(given)
    if (why !== null) return refusing(why)
  }
  return said
}
