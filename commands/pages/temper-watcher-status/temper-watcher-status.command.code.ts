import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { readState, workerLogPath } from "@akasha/temper-watcher/watcher-daemon"
import { isUnitActive, unitMainPid } from "@akasha/temper-watcher/watcher-unit"

const INPUT = 1
const JSON_SAID = "--json"

function upSeconds(startedAt: string): number | null {
  const began = Date.parse(startedAt)
  if (Number.isNaN(began)) return null
  return Math.max(0, Math.floor((Date.now() - began) / 1000))
}

export function temperWatcherStatus(argv: readonly string[]): Answer {
  const strange = argv.find((one) => one !== JSON_SAID)
  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`akasha temper-watcher-status\` takes`, INPUT)
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
    return { report: [JSON.stringify(said)], refusals: [], code: 0 }
  }

  if (!running) return { report: ["stopped"], refusals: [], code: 0 }
  const pid = unitMainPid()
  const shown = [
    `running pid=${pid === null ? "?" : String(pid)}`,
    `uptime=${up === null ? "?" : String(up)}s`,
    `log=${workerLogPath()}`,
  ].join(" ")
  return { report: [shown], refusals: [], code: 0 }
}
