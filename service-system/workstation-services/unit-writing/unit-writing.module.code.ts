import type { WorkstationService } from "../workstation-service.page-type.ts"

const PATH_ENV =
  "%h/.bun/bin:%h/.local/bin:/home/linuxbrew/.linuxbrew/bin:/usr/local/bin:/usr/bin:/bin"
const CHECKOUT = "%h/repos/akasha"
const WRAPPER_RUNS =
  "bun service-system/workstation-services/service-wrapping/service-wrapping.module.code.ts"
const SIGTERM_EXIT = 143
const DEFAULT_RESTART = "always"
const DEFAULT_TARGET = "default.target"
const TIMER_TARGET = "timers.target"
const TYPESCRIPT_RUN = /(^|\s)\S+\.ts(\s|$)/
const LENIENT = "-"
const SECRETS_FILE = "%h/.secrets.env"

export const RESTART_EXIT = 79
export const WRITTEN_PREFIX = "# Written from "

export type Service = {
  readonly service: WorkstationService
  readonly pagePath: string
}

export function scheduleOf(given: Service): string | null {
  const stated = given.service.systemd?.schedule
  if (stated === undefined) return null
  const one = stated.trim()
  return one === "" ? null : one
}

export function isScheduled(given: Service): boolean {
  return scheduleOf(given) !== null
}

function described(given: Service): string {
  const one = given.service.definition
  return one.charAt(0).toUpperCase() + one.substring(1)
}

function header(given: Service): string {
  return `${WRITTEN_PREFIX}${given.pagePath} by akasha service install. Edits here are lost.`
}

export function isWrapped(given: Service): boolean {
  if (isScheduled(given)) return false
  return given.service.runs.some((one) => TYPESCRIPT_RUN.test(one))
}

export function underWrapper(given: Service, command: string): string {
  if (isScheduled(given)) return command
  if (!TYPESCRIPT_RUN.test(command)) return command
  return `${WRAPPER_RUNS} -- ${command}`
}

function wrapped(given: Service, one: string): string {
  const lenient = one.startsWith(LENIENT)
  const command = lenient ? one.slice(1) : one
  const run = underWrapper(given, command)
  const inner =
    given.service.needsSecrets === true
      ? `set -a; [ -f "${SECRETS_FILE}" ] && . "${SECRETS_FILE}"; exec ${run}`
      : `exec ${run}`
  return `${lenient ? LENIENT : ""}/usr/bin/env bash -c '${inner}'`
}

export function execLines(given: Service): readonly string[] {
  return given.service.runs.map((one) => `ExecStart=${wrapped(given, one)}`)
}

function opening(given: Service): readonly string[] {
  return [
    header(given),
    "",
    "[Unit]",
    `Description=${described(given)}`,
    `Documentation=file://${CHECKOUT}/${given.pagePath}`,
  ]
}

export function serviceUnitText(given: Service): string {
  const scheduled = isScheduled(given)
  const stated = given.service.systemd
  const lines: string[] = [
    ...opening(given),
    "",
    "[Service]",
    `Type=${scheduled ? "oneshot" : "simple"}`,
    `WorkingDirectory=${CHECKOUT}`,
    `Environment=PATH=${PATH_ENV}`,
    `Environment=AKASHA_ROOT=${CHECKOUT}`,
    ...execLines(given),
  ]

  if (stated?.startTimeoutSeconds !== undefined) {
    lines.push(`TimeoutStartSec=${stated.startTimeoutSeconds}`)
  }

  if (!scheduled) {
    lines.push(`Restart=${stated?.restart ?? DEFAULT_RESTART}`)
    if (stated?.restartDelaySeconds !== undefined) {
      lines.push(`RestartSec=${stated.restartDelaySeconds}`)
    }
    const wraps = isWrapped(given)
    lines.push(`SuccessExitStatus=${wraps ? `${SIGTERM_EXIT} ${RESTART_EXIT}` : SIGTERM_EXIT}`)
    if (wraps) lines.push(`RestartForceExitStatus=${RESTART_EXIT}`)
    lines.push("", "[Install]", `WantedBy=${DEFAULT_TARGET}`)
  }

  return `${lines.join("\n")}\n`
}

export function timerUnitText(given: Service): string | null {
  const calendar = scheduleOf(given)
  if (calendar === null) return null
  const stated = given.service.systemd
  const lines: string[] = [...opening(given), "", "[Timer]", `OnCalendar=${calendar}`]
  if (stated?.jitterSeconds !== undefined) lines.push(`RandomizedDelaySec=${stated.jitterSeconds}`)
  if (stated?.catchUp === true) lines.push("Persistent=true")
  lines.push("", "[Install]", `WantedBy=${TIMER_TARGET}`)
  return `${lines.join("\n")}\n`
}

export function unitFileNames(given: Service): readonly string[] {
  const slug = given.service.slug
  return isScheduled(given) ? [`${slug}.service`, `${slug}.timer`] : [`${slug}.service`]
}

export function installedUnitName(given: Service): string {
  const slug = given.service.slug
  return isScheduled(given) ? `${slug}.timer` : `${slug}.service`
}
