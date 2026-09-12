import { INPUT, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  readState,
  workerLogPath,
} from "akasha/temper/watcher/watcher-daemon/watcher-daemon.module.code.ts"
import {
  isUnitActive,
  unitMainPid,
} from "akasha/temper/watcher/watcher-unit/watcher-unit.module.code.ts"

const JSON_SAID = "--json"

function upSeconds(startedAt: string): number | null {
  const began = Date.parse(startedAt)
  if (Number.isNaN(began)) return null
  return Math.max(0, Math.floor((Date.now() - began) / 1000))
}

export function temperWatcherStatus(argv: readonly string[], given: Given): Answer {
  const strange = argv.find((one) => one !== JSON_SAID)
  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`${given.calledAs}\` takes`, INPUT)
  }
  const running = isUnitActive()
  const startedAt = running ? (readState()?.startedAt ?? null) : null
  const up = startedAt === null ? null : upSeconds(startedAt)

  if (argv.includes(JSON_SAID)) {
    const said = running
      ? {
          status: "running",
          pid: unitMainPid(),
          startedAt,
          upSeconds: up,
          logPath: workerLogPath(),
        }
      : { status: "stopped", pid: null, startedAt: null, upSeconds: null, logPath: null }
    return { report: [JSON.stringify(said)], refusals: [], code: OK }
  }

  if (!running) return { report: ["stopped"], refusals: [], code: OK }
  const pid = unitMainPid()
  const shown = [
    `running pid=${pid === null ? "?" : String(pid)}`,
    `uptime=${up === null ? "?" : String(up)}s`,
    `log=${workerLogPath()}`,
  ].join(" ")
  return { report: [shown], refusals: [], code: OK }
}
