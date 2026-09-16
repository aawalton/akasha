import { loadedHere } from "akasha/infrastructure/service/workstation/modules/service-loading/service-loading.module.code.ts"
import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"
import { ORIGIN_ENV } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const PATH_ENV =
  "%h/.bun/bin:%h/.local/bin:/home/linuxbrew/.linuxbrew/bin:/usr/local/bin:/usr/bin:/bin"
const CHECKOUT = "%h/repos/akasha"
export const PAGES_UNIT = "page-service.service"
const SLICE = "background.slice"
const SIGTERM_EXIT = 143
const TOLD_TO_STOP = "SIGTERM"
const DEFAULT_RESTART = "always"
const DEFAULT_TARGET = "default.target"
const TIMER_TARGET = "timers.target"
const SECRETS_FILE = "%h/.secrets.env"
const NO_SECRETS = 78

export const SERVICE_SUFFIX = ".service"

export const TIMER_SUFFIX = ".timer"

export const RESTART_EXIT = 79

const WRITTEN_PREFIX = "# Written from "

export type Started = ServiceWorkstation & { readonly runs: readonly string[] }

export type Service = {
  readonly service: Started
  readonly pagePath: string
  readonly pagesOrigin?: string
}

function scheduleOf(given: Service): string | null {
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
  return `${WRITTEN_PREFIX}${given.pagePath} by akasha deploy. Edits here are lost.`
}

function shelled(given: Service, one: string): string {
  const inner =
    given.service.needsSecrets === true
      ? `set -a; . "${SECRETS_FILE}" || exit ${NO_SECRETS}; exec ${one}`
      : `exec ${one}`
  return `/usr/bin/env bash -c '${inner}'`
}

function execLines(given: Service): readonly string[] {
  return given.service.runs.map((one) => `ExecStart=${shelled(given, one)}`)
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

function orderingLines(given: Service): readonly string[] {
  const stated = given.service.systemd
  const after = new Set(stated?.after ?? [])
  const wants = new Set(stated?.wants ?? [])
  if (loadedHere(given.service.slug)) {
    after.add(PAGES_UNIT)
    wants.add(PAGES_UNIT)
  }
  const lines: string[] = []
  for (const one of after) lines.push(`After=${one}`)
  for (const one of wants) lines.push(`Wants=${one}`)
  if (stated?.partOf !== undefined) lines.push(`PartOf=${stated.partOf}`)
  if (stated?.startLimitIntervalSeconds !== undefined) {
    lines.push(`StartLimitIntervalSec=${stated.startLimitIntervalSeconds}`)
  }
  return lines
}

function joined(codes: readonly (number | string)[]): string {
  return [...new Set(codes)].join(" ")
}

function successLine(given: Service): string {
  const stated = given.service.systemd?.successExitStatus
  const stops = stated === undefined ? [] : [stated]
  return `SuccessExitStatus=${joined([SIGTERM_EXIT, RESTART_EXIT, ...stops, TOLD_TO_STOP])}`
}

function restartLines(given: Service): readonly string[] {
  const stated = given.service.systemd
  const forces = stated?.restartForceExitStatus === undefined ? [] : [stated.restartForceExitStatus]
  const lines = [`RestartForceExitStatus=${joined([RESTART_EXIT, ...forces])}`]
  if (given.service.needsSecrets === true) {
    lines.push(`RestartPreventExitStatus=${NO_SECRETS}`)
  }
  return lines
}

export function serviceUnitText(given: Service): string {
  const scheduled = isScheduled(given)
  const stated = given.service.systemd
  const lines: string[] = [
    ...opening(given),
    ...orderingLines(given),
    "",
    "[Service]",
    `Type=${scheduled ? "oneshot" : "simple"}`,
    `Slice=${SLICE}`,
    `WorkingDirectory=${CHECKOUT}`,
    `Environment=PATH=${PATH_ENV}`,
    `Environment=AKASHA_ROOT=${CHECKOUT}`,
    ...(given.pagesOrigin === undefined ? [] : [`Environment=${ORIGIN_ENV}=${given.pagesOrigin}`]),
    ...execLines(given),
  ]

  for (const one of stated?.stops ?? []) lines.push(`ExecStop=${one}`)

  if (stated?.startTimeoutSeconds !== undefined) {
    lines.push(`TimeoutStartSec=${stated.startTimeoutSeconds}`)
  }

  lines.push(successLine(given))

  if (!scheduled) {
    lines.push(`Restart=${stated?.restart ?? DEFAULT_RESTART}`)
    if (stated?.restartDelaySeconds !== undefined) {
      lines.push(`RestartSec=${stated.restartDelaySeconds}`)
    }
    lines.push(...restartLines(given))
    lines.push("", "[Install]", `WantedBy=${stated?.wantedBy ?? DEFAULT_TARGET}`)
  }

  return `${lines.join("\n")}\n`
}

export function timerUnitText(given: Service): string | null {
  const calendar = scheduleOf(given)
  if (calendar === null) return null
  const stated = given.service.systemd
  const lines: string[] = [...opening(given), "", "[Timer]", `OnCalendar=${calendar}`]
  if (stated?.jitterSeconds !== undefined) lines.push(`RandomizedDelaySec=${stated.jitterSeconds}`)
  if (stated?.accuracySeconds !== undefined) lines.push(`AccuracySec=${stated.accuracySeconds}`)
  if (stated?.catchUp === true) lines.push("Persistent=true")
  lines.push("", "[Install]", `WantedBy=${TIMER_TARGET}`)
  return `${lines.join("\n")}\n`
}

export function serviceUnitName(given: Service): string {
  return `${given.service.slug}${SERVICE_SUFFIX}`
}

export function timerUnitName(given: Service): string {
  return `${given.service.slug}${TIMER_SUFFIX}`
}

export function installedUnitName(given: Service): string {
  return isScheduled(given) ? timerUnitName(given) : serviceUnitName(given)
}
