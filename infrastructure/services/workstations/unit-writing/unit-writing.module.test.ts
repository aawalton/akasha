import { expect, test } from "bun:test"
import {
  installedUnitName,
  isScheduled,
  type Started,
  serviceUnitText,
  timerUnitText,
  unitFileNames,
} from "akasha/infrastructure/services/workstations/unit-writing/unit-writing.module.code.ts"

const PAGE_PATH =
  "akasha/service-system/service-workstation/workstations/held-service.service-workstation.ts"

const RUNS_TYPESCRIPT =
  "bun akasha/service-system/service-workstation/held-listening/held-listening.module.code.ts"

const BASE = {
  id: "01a05a51-0000-7000-8000-00000000000a",
  type: "service-workstation",
  slug: "held-service",
  definition: "the service a test writes a unit for",
  runs: [RUNS_TYPESCRIPT],
  enabled: true,
} as const satisfies Started

function pageOf(more: Partial<Started>) {
  return { service: { ...BASE, ...more }, pagePath: PAGE_PATH }
}

test("a service stating no schedule is simple, wanted by the default target, and started again", () => {
  const text = serviceUnitText(pageOf({}))
  expect(text).toContain("Type=simple")
  expect(text).toContain("Restart=always")
  expect(text).toContain("WantedBy=default.target")
  expect(text).toContain("SuccessExitStatus=143 79\n")
  expect(text).toContain("RestartForceExitStatus=79\n")
})

test("a scheduled service recycles on nothing at all", () => {
  const text = serviceUnitText(pageOf({ systemd: { schedule: "hourly" } }))
  expect(text).not.toContain("SuccessExitStatus")
  expect(text).not.toContain("RestartForceExitStatus")
})

test("a service is put in the slice ranking below the apps Alan is using", () => {
  expect(serviceUnitText(pageOf({}))).toContain("Slice=background.slice")
  expect(serviceUnitText(pageOf({ systemd: { schedule: "daily" } }))).toContain(
    "Slice=background.slice"
  )
})

test("the unit names the page it was written from", () => {
  const text = serviceUnitText(pageOf({}))
  expect(text).toContain(`Documentation=file://%h/repos/akasha/${PAGE_PATH}`)
  expect(text.split("\n")[0]).toContain(PAGE_PATH)
})

test("the description opens in upper case", () => {
  expect(serviceUnitText(pageOf({}))).toContain("Description=The service a test writes a unit for")
})

test("the command a page states is the one the unit starts", () => {
  const text = serviceUnitText(pageOf({}))
  expect(text).toContain(`ExecStart=/usr/bin/env bash -c 'exec ${RUNS_TYPESCRIPT}'`)
  expect(text).not.toContain(" -- ")
})

test("a scheduled service is oneshot and states no install", () => {
  const service = pageOf({ systemd: { schedule: "hourly" } })
  expect(isScheduled(service)).toBe(true)
  const text = serviceUnitText(service)
  expect(text).toContain("Type=oneshot")
  expect(text).not.toContain("[Install]")
  expect(text).not.toContain("Restart=")
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

test("a command that fails fails the unit, so no dash is written before the shell it starts", () => {
  const text = serviceUnitText(pageOf({ runs: ["/usr/bin/podman stop it"] }))
  expect(text).toContain("ExecStart=/usr/bin/env bash -c 'exec /usr/bin/podman stop it'")
  expect(text).not.toContain("ExecStart=-")
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

test("what a service states it is ordered against is written before the service section", () => {
  const text = serviceUnitText(
    pageOf({
      systemd: {
        after: ["network-online.target"],
        wants: ["network-online.target"],
        partOf: "graphical-session.target",
      },
    })
  )
  expect(text).toContain("After=network-online.target")
  expect(text).toContain("Wants=network-online.target")
  expect(text).toContain("PartOf=graphical-session.target")
  expect(text.indexOf("After=")).toBeLessThan(text.indexOf("[Service]"))
})

test("a service stating a target of its own is wanted by that target rather than the default", () => {
  const text = serviceUnitText(pageOf({ systemd: { wantedBy: "graphical-session.target" } }))
  expect(text).toContain("WantedBy=graphical-session.target")
  expect(text).not.toContain("WantedBy=default.target")
})

test("what a service states to stop it is written as that service's stop command", () => {
  const text = serviceUnitText(pageOf({ systemd: { stops: ["/usr/bin/podman stop held"] } }))
  expect(text).toContain("ExecStop=/usr/bin/podman stop held")
})

test("a start limit window a service states is written before the service section", () => {
  const text = serviceUnitText(pageOf({ systemd: { startLimitIntervalSeconds: 0 } }))
  expect(text).toContain("StartLimitIntervalSec=0")
  expect(text.indexOf("StartLimitIntervalSec=")).toBeLessThan(text.indexOf("[Service]"))
})

test("an exit code a service states joins the term and the moved code rather than replacing them", () => {
  const text = serviceUnitText(
    pageOf({ systemd: { successExitStatus: 75, restartForceExitStatus: 75 } })
  )
  expect(text).toContain("SuccessExitStatus=143 79 75\n")
  expect(text).toContain("RestartForceExitStatus=79 75\n")
})

test("a service stating one exit twice is written that exit once", () => {
  const text = serviceUnitText(
    pageOf({
      runs: ["/usr/bin/held"],
      systemd: { successExitStatus: 79, restartForceExitStatus: 79 },
    })
  )
  expect(text).toContain("SuccessExitStatus=143 79\n")
  expect(text).toContain("RestartForceExitStatus=79\n")
})

test("the accuracy a scheduled service states is written on that service's timer", () => {
  const text = timerUnitText(pageOf({ systemd: { schedule: "*:*:00", accuracySeconds: 1 } }))
  expect(text).toContain("AccuracySec=1")
})
