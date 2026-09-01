import { collapse, folds, refuses } from "@akasha/utils-narrow/collapse"
import {
  classifyPidSignalError,
  pidAliveOrAssumeAlive,
} from "../pid-signal/pid-signal.module.code.ts"

export type Sign = "SIGTERM" | "SIGKILL"

const WAITING_MS = 15_000

const ASKING_MS = 200

export type Ending = {
  readonly alive: (pid: number) => boolean
  readonly signal: (pid: number, sign: Sign) => undefined
  readonly waited: (pid: number) => Promise<boolean>
}

export type Ended = {
  readonly asked: boolean
  readonly forced: boolean
  readonly allGone: boolean
}

export function signalled(pid: number, sign: Sign): undefined {
  try {
    process.kill(pid, sign)
    return undefined
  } catch (thrown) {
    return collapse(classifyPidSignalError(thrown), {
      "no-such-process": folds(
        undefined,
        "the process ended between the reading and the signal, which is the end this signal was asking for"
      ),
      "exists-not-permitted": refuses(
        "a process this may not signal is one this cannot end, and carrying on would report an end nothing brought about"
      ),
      unknown: refuses(
        "an errno that is neither ESRCH nor EPERM says nothing about whether the signal landed, and a terminate loop guessing here either abandons a runaway or reports a live process dead"
      ),
    })
  }
}

export async function waitedForEnd(
  pid: number,
  waitingMs: number = WAITING_MS,
  askingMs: number = ASKING_MS
): Promise<boolean> {
  const until = Date.now() + waitingMs
  while (Date.now() < until) {
    if (!pidAliveOrAssumeAlive(pid)) return true
    await new Promise((come) => setTimeout(come, askingMs))
  }
  return !pidAliveOrAssumeAlive(pid)
}

export const ENDING: Ending = {
  alive: pidAliveOrAssumeAlive,
  signal: signalled,
  waited: (pid) => waitedForEnd(pid),
}

export async function ending(pids: readonly number[], how: Ending = ENDING): Promise<Ended> {
  const alive = pids.filter((pid) => how.alive(pid))
  for (const pid of alive) how.signal(pid, "SIGTERM")
  let forced = false
  let allGone = true
  for (const pid of alive) {
    if (await how.waited(pid)) continue
    how.signal(pid, "SIGKILL")
    forced = true
    if (!(await how.waited(pid))) allGone = false
  }
  return { asked: alive.length > 0, forced, allGone }
}
