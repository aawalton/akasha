import { writer } from "akasha/agent/role/pages/writer.role.ts"
import type { Starting } from "akasha/command/pages/story/turn/modules/turn-job-handing/turn-job-handing.module.code.ts"
import type {
  Reach,
  Story,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  type BeatJob,
  beatJobsOf,
} from "akasha/story/world/stories/played/turns/modules/turn-beating/turn-beating.module.code.ts"
import { coordinatorOf } from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

export const TRIES = 6

const WAIT_MS = 10_000

type Waiting = (ms: number) => Promise<unknown>

const slept: Waiting = async (ms) => await Bun.sleep(ms)

type Mastered = { readonly master: string; readonly persona: string }

function masterIn(reach: Reach, root: string, game: string): Mastered | null {
  const master = reach.storyOf(root, game)?.master ?? null
  const persona = master === null ? null : (coordinatorOf(master, game)?.persona ?? null)
  return master === null || persona === null ? null : { master, persona }
}

export async function masterOf(
  reach: Reach,
  root: string,
  game: string,
  wait: Waiting = slept
): Promise<Mastered | { readonly refused: string }> {
  let tried = 1
  let found = masterIn(reach, root, game)
  while (found === null && tried < TRIES) {
    await wait(WAIT_MS)
    tried += 1
    found = masterIn(reach, root, game)
  }
  if (found !== null) return found
  return {
    refused: `\`${game}\` names no game master seat spelling a persona, read ${TRIES} times over a minute, so no beat was handed out`,
  }
}

type Seating = { readonly game: string; readonly story: Story | null }

export function notedOf(at: Seating, seated: Mastered): readonly string[] {
  if (at.story?.oneSeat === true) return [seated.master]
  return [seated.master, `${seated.persona}-${writer.slug}-${at.game}`]
}

export function handedOut(
  at: Seating,
  before: readonly Beats[],
  now: readonly Beats[]
): readonly BeatJob[] {
  return at.story?.oneSeat === true ? [] : beatJobsOf(before, now)
}

export async function startedAgain(
  reach: Reach,
  starting: Starting,
  done: string[],
  wait: Waiting = slept
): ReturnType<Reach["start"]> {
  let tried = 1
  while (tried < TRIES) {
    try {
      return await reach.start(starting, done)
    } catch {
      await wait(WAIT_MS)
      tried += 1
    }
  }
  return await reach.start(starting, done)
}
