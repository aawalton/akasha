import { mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import {
  readMemInfoKb,
  resolveGbOverride,
} from "akasha/infrastructure/kernel/modules/memory-guard/memory-guard.module.code.ts"

const AT = ".local/state/workstation-services/landing-admission"

const ROOM_GB = 16

const ASKED_MS = 2_000

const WAITED_MS = 60_000

const KB_A_GB = 1_048_576

const OVER = "LANDING_MIN_FREE_MEMORY_GB"

const SAID = "landing-admission:"

const HOME = "HOME"

function admissionAt(home: string): string {
  return join(home, AT)
}

function admitting(availableKb: number, roomGb: number): boolean {
  return availableKb >= roomGb * KB_A_GB
}

function turnTaken(home: string): boolean {
  const at = admissionAt(home)
  mkdirSync(dirname(at), { recursive: true })
  return exclusively(
    at,
    (): boolean => {
      const room = resolveGbOverride(OVER, ROOM_GB)
      return admitting(readMemInfoKb().availableKb, room)
    },
    WAITED_MS
  )
}

export async function waitedForRoom(kind: string): Promise<undefined> {
  const home = requireEnv(HOME)
  let told = false
  while (!turnTaken(home)) {
    if (!told) {
      told = true
      const room = String(resolveGbOverride(OVER, ROOM_GB))
      process.stderr.write(`${SAID} ${kind} waits for the ${room} GB a landing starts on\n`)
    }
    await Bun.sleep(ASKED_MS)
  }
}
