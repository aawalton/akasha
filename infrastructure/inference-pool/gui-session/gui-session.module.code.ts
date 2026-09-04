import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

const EXIT_CODE_CAPTURE = z.tuple([z.coerce.number().int()])
const EXIT_CODE_RE = /\bexit=(-?\d+)\b/

export interface GuiSessionVerdict {
  readonly sessionPresent: boolean
  readonly reason: string
}

export function buildGuiSessionProbeScript(): string {
  return [
    "set -u",
    `uid="$(id -u)"`,
    `err="$(launchctl print "gui/$uid" 2>&1 >/dev/null)"; ec=$?`,
    `printf 'GUI_SESSION_PROBE gui/%s exit=%s\\n%s\\n' "$uid" "$ec" "$err"`,
    "",
  ].join("\n")
}

export function decideGuiSession(probeOutput: string): GuiSessionVerdict {
  const marker = probeOutput
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("GUI_SESSION_PROBE "))
  if (marker === undefined) {
    return {
      sessionPresent: false,
      reason: "gui-session probe emitted no recognizable marker line",
    }
  }
  let exitCode: number
  try {
    ;[exitCode] = requireMatchPositional(EXIT_CODE_RE, EXIT_CODE_CAPTURE, marker)
  } catch {
    return {
      sessionPresent: false,
      reason: `gui-session probe marker missing exit code: ${marker}`,
    }
  }
  if (exitCode === 0) {
    return { sessionPresent: true, reason: "launchctl print gui/<uid> succeeded" }
  }
  const domainAbsent = /Domain does not support specified action/i.test(probeOutput)
  return {
    sessionPresent: false,
    reason: domainAbsent
      ? `no GUI session (launchctl exit ${exitCode}: Domain does not support specified action)`
      : `no GUI session (launchctl exit ${exitCode})`,
  }
}
