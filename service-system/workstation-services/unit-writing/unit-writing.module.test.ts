import { expect, test } from "bun:test"
import type { WorkstationService } from "../workstation-service.page-type.ts"
import {
  installedUnitName,
  isScheduled,
  isWrapped,
  RESTART_EXIT,
  serviceUnitText,
  timerUnitText,
  unitFileNames,
} from "./unit-writing.module.code.ts"

const PAGE_PATH =
  "akasha/service-system/workstation-service/workstation-services/held-service.workstation-service.ts"

const RUNS_TYPESCRIPT =
  "bun akasha/service-system/workstation-service/held-listening/held-listening.module.code.ts"

const BASE = {
  id: "01a05a51-0000-7000-8000-00000000000a",
  pageTypeSlug: "workstation-service",
  slug: "held-service",
  definition: "the service a test writes a unit for",
  runs: [RUNS_TYPESCRIPT],
  enabled: true,
} as const satisfies WorkstationService

function pageOf(more: Partial<WorkstationService>) {
  return { service: { ...BASE, ...more }, pagePath: PAGE_PATH }
}

test("a service stating no schedule is simple, wanted by the default target, and started again", () => {
  const text = serviceUnitText(pageOf({}))
  expect(text).toContain("Type=simple")
  expect(text).toContain("Restart=always")
  expect(text).toContain("WantedBy=default.target")
  expect(text).toContain(`SuccessExitStatus=143 ${RESTART_EXIT}`)
})

test("a wrapper restart for a changed file counts as a success rather than a failure", () => {
  expect(serviceUnitText(pageOf({}))).toContain(`SuccessExitStatus=143 ${RESTART_EXIT}`)
  const bare = serviceUnitText(pageOf({ runs: ["/usr/bin/node-exporter"] }))
  expect(bare).toContain("SuccessExitStatus=143\n")
  expect(bare).not.toContain(`SuccessExitStatus=143 ${RESTART_EXIT}`)
})

test("the unit names the page it was written from", () => {
  const text = serviceUnitText(pageOf({}))
  expect(text).toContain(`Documentation=file://%h/repos/akasha/${PAGE_PATH}`)
  expect(text.split("\n")[0]).toContain(PAGE_PATH)
})

test("the description opens in upper case", () => {
  expect(serviceUnitText(pageOf({}))).toContain("Description=The service a test writes a unit for")
})

test("a command naming a TypeScript file runs under the wrapper and forces a restart on its exit", () => {
  const service = pageOf({})
  expect(isWrapped(service)).toBe(true)
  const text = serviceUnitText(service)
  expect(text).toContain("service-wrapping.module.code.ts -- bun")
  expect(text).toContain(`RestartForceExitStatus=${RESTART_EXIT}`)
})

test("a command naming no TypeScript file runs under no wrapper", () => {
  const service = pageOf({ runs: ["/usr/bin/node-exporter"] })
  expect(isWrapped(service)).toBe(false)
  const text = serviceUnitText(service)
  expect(text).not.toContain("service-wrapping")
  expect(text).not.toContain("RestartForceExitStatus")
})

test("a scheduled service is oneshot, runs under no wrapper, and states no install", () => {
  const service = pageOf({ systemd: { schedule: "hourly" } })
  expect(isScheduled(service)).toBe(true)
  expect(isWrapped(service)).toBe(false)
  const text = serviceUnitText(service)
  expect(text).toContain("Type=oneshot")
  expect(text).not.toContain("[Install]")
  expect(text).not.toContain("Restart=")
  expect(text).not.toContain("service-wrapping")
})

test("a scheduled service is written a timer stating its calendar", () => {
  const text = timerUnitText(pageOf({ systemd: { schedule: "*:0/15", jitterSeconds: 5 } }))
  expect(text).not.toBe(null)
  expect(text).toContain("OnCalendar=*:0/15")
  expect(text).toContain("RandomizedDelaySec=5")
  expect(text).toContain("WantedBy=timers.target")
})

test("catching up is stated only where the page states it", () => {
  expect(timerUnitText(pageOf({ systemd: { schedule: "daily", catchUp: true } }))).toContain(
    "Persistent=true"
  )
  expect(timerUnitText(pageOf({ systemd: { schedule: "daily" } }))).not.toContain("Persistent")
})

test("a service stating no schedule is written no timer", () => {
  expect(timerUnitText(pageOf({}))).toBe(null)
  expect(timerUnitText(pageOf({ systemd: { schedule: "  " } }))).toBe(null)
})

test("a service needing secrets sources them before it starts", () => {
  expect(serviceUnitText(pageOf({ needsSecrets: true }))).toContain(
    'set -a; [ -f "%h/.secrets.env" ] && . "%h/.secrets.env"; exec'
  )
})

test("a service stating nothing about secrets is handed none", () => {
  expect(serviceUnitText(pageOf({}))).not.toContain("secrets.env")
  expect(serviceUnitText(pageOf({ needsSecrets: false }))).not.toContain("secrets.env")
})

test("a command opening with a dash keeps the dash outside the shell it starts", () => {
  const text = serviceUnitText(pageOf({ runs: ["-/usr/bin/podman stop it"] }))
  expect(text).toContain("ExecStart=-/usr/bin/env bash -c 'exec /usr/bin/podman stop it'")
})

test("what the page states about timing is written where systemd reads it", () => {
  const text = serviceUnitText(
    pageOf({
      systemd: { restart: "on-failure", restartDelaySeconds: 10, startTimeoutSeconds: 300 },
    })
  )
  expect(text).toContain("Restart=on-failure")
  expect(text).toContain("RestartSec=10")
  expect(text).toContain("TimeoutStartSec=300")
})

test("the files a service is installed as follow its schedule", () => {
  expect(unitFileNames(pageOf({}))).toEqual(["held-service.service"])
  expect(installedUnitName(pageOf({}))).toBe("held-service.service")
  const scheduled = pageOf({ systemd: { schedule: "daily" } })
  expect(unitFileNames(scheduled)).toEqual(["held-service.service", "held-service.timer"])
  expect(installedUnitName(scheduled)).toBe("held-service.timer")
})
