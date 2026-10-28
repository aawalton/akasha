import { readOwnTranscriptTail } from "akasha/agent/modules/io-probe/io-probe.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import type { TurnWorking } from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import {
  promptUnanswered,
  turnTakenBack,
  workingOf,
} from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"

const WATCH_NAME = "prompt-cancel"

const WATCH_MS = 3_000

const TMUX_CEILING_MS = 5_000

const BOTTOM_LINES = 12

const BUSY_SAYS = "esc to interrupt"

export function busyOn(screen: string): boolean {
  const lines = screen.split("\n").filter((line) => line.trim() !== "")
  return lines.slice(-BOTTOM_LINES).some((line) => line.toLowerCase().includes(BUSY_SAYS))
}

async function screenOf(seat: string): Promise<string | null> {
  const ran = Bun.spawn(["tmux", "capture-pane", "-p", "-t", `=${seat}`], {
    stdin: "ignore",
    stdout: "pipe",
    stderr: "ignore",
  })
  const timer = setTimeout(() => ran.kill(), TMUX_CEILING_MS)
  try {
    const screen = await new Response(ran.stdout).text()
    return (await ran.exited) === 0 ? screen : null
  } finally {
    clearTimeout(timer)
  }
}

async function screenBusy(agent: string): Promise<boolean | null> {
  const seat = seatNameForAgent(agent)
  if (seat === null) return null
  const screen = await screenOf(seat)
  return screen === null ? null : busyOn(screen)
}

function awaitingAnswer(agent: string): boolean {
  const tail = readOwnTranscriptTail(agent)
  return tail !== null && promptUnanswered(tail)
}

export function cancelWatch(args: {
  readWorking: (agent: string) => TurnWorking
  readAwaiting: (agent: string) => boolean
  readBusy: (agent: string) => Promise<boolean | null>
  clear: (agent: string) => undefined
}): (agent: string | null) => Promise<undefined> {
  let quietAt: number | null = null

  return async (agent) => {
    const working = agent === null ? null : args.readWorking(agent)
    if (agent === null || working?.activeTurn !== true || !args.readAwaiting(agent)) {
      quietAt = null
      return undefined
    }
    if ((await args.readBusy(agent)) !== false) {
      quietAt = null
      return undefined
    }
    const at = working.scannedTo ?? -1
    if (quietAt !== at) {
      quietAt = at
      return undefined
    }
    quietAt = null
    return args.clear(agent)
  }
}

export function startCancelWatch(args: {
  getAgentId: () => string | null
  log: (line: string) => void
}): { stop: () => void } {
  const watched = cancelWatch({
    readWorking: workingOf,
    readAwaiting: awaitingAnswer,
    readBusy: screenBusy,
    clear: (agent) => {
      if (turnTakenBack(agent)) args.log(`${WATCH_NAME}: a prompt taken back ended the turn`)
      return undefined
    },
  })
  let inFlight = false
  const timer = setInterval(() => {
    if (inFlight) return
    inFlight = true
    watched(args.getAgentId())
      .catch((err: unknown) => args.log(`${WATCH_NAME}: ${String(err)}`))
      .finally(() => {
        inFlight = false
      })
  }, WATCH_MS)
  return { stop: () => clearInterval(timer) }
}
