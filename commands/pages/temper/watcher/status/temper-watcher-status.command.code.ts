import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { asJson, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperWatcherStatus as page } from "akasha/commands/pages/temper/watcher/status/temper-watcher-status.command.ts"
import {
  readState,
  workerLogPath,
} from "akasha/temper/watcher/watcher-daemon/watcher-daemon.module.code.ts"
import {
  isUnitActive,
  unitMainPid,
} from "akasha/temper/watcher/watcher-unit/watcher-unit.module.code.ts"

const NAMED = [json]

function upSeconds(startedAt: string): number | null {
  const began = Date.parse(startedAt)
  if (Number.isNaN(began)) return null
  return Math.max(0, Math.floor((Date.now() - began) / 1000))
}

export function temperWatcherStatus(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const running = isUnitActive()
  const startedAt = running ? (readState()?.startedAt ?? null) : null
  const up = startedAt === null ? null : upSeconds(startedAt)

  if (read.taken.json) {
    const said = running
      ? {
          status: "running",
          pid: unitMainPid(),
          startedAt,
          upSeconds: up,
          logPath: workerLogPath(),
        }
      : { status: "stopped", pid: null, startedAt: null, upSeconds: null, logPath: null }
    return asJson(said)
  }

  if (!running) return told(["stopped"])
  const pid = unitMainPid()
  const shown = [
    `running pid=${pid === null ? "?" : String(pid)}`,
    `uptime=${up === null ? "?" : String(up)}s`,
    `log=${workerLogPath()}`,
  ].join(" ")
  return told([shown])
}
