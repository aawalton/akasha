import { expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  everyService,
  readFor,
  runsIn,
  serviceIn,
  systemdIn,
} from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const ROOT = process.cwd()

const TS = ".ts"

const CODE_BESIDE = ".code.ts"

const RUNNER = "bun"

const WHOLE = {
  id: "01a05a51-0000-7000-8000-00000000000c",
  pageTypeSlug: "service-workstation",
  slug: "a-service",
  definition: "a service representing a test",
  runs: ["bun a.ts"],
  enabled: true,
}

test("a value stating everything a service needs is read as one", () => {
  const service = serviceIn(ROOT, { ...WHOLE })
  expect(service?.slug).toBe("a-service")
  expect(service?.runs).toEqual(["bun a.ts"])
  expect(service?.enabled).toBe(true)
})

test("a value missing what a service needs is read as none", () => {
  for (const key of ["id", "slug", "definition", "runs", "enabled"]) {
    const held: Record<string, unknown> = { ...WHOLE }
    delete held[key]
    expect(serviceIn(ROOT, held)).toBe(null)
  }
})

test("a value stating enabled as anything but a boolean is read as none", () => {
  expect(serviceIn(ROOT, { ...WHOLE, enabled: "yes" })).toBe(null)
})

test("a value stating a start is read with the command line that start composes", () => {
  const page = listedAt(ROOT, "module", "service-reading")[0]
  if (page === undefined) {
    throw new Error("no `module/service-reading` is filed, so nothing says where its code sits")
  }
  const beside = `${page.path.slice(0, -TS.length)}${CODE_BESIDE}`
  expect(existsSync(join(ROOT, beside))).toBe(true)
  const service = serviceIn(ROOT, {
    ...WHOLE,
    runs: ["bun a.ts"],
    starts: [{ code: "module/service-reading" }],
  })
  expect(service?.runs).toEqual([`${RUNNER} ${beside}`])
})

test("a value stating a start that names no page is read as none", () => {
  expect(
    serviceIn(ROOT, { ...WHOLE, starts: [{ code: "module/no-module-is-filed-under-this" }] })
  ).toBe(null)
})

test("runs must be a list of commands that are not empty", () => {
  expect(runsIn({ runs: ["a", "b"] })).toEqual(["a", "b"])
  expect(runsIn({ runs: [] })).toBe(null)
  expect(runsIn({ runs: ["a", 2] })).toBe(null)
  expect(runsIn({ runs: ["a", "  "] })).toBe(null)
  expect(runsIn({ runs: "a" })).toBe(null)
  expect(runsIn({})).toBe(null)
})

test("only the systemd options this system carries are read", () => {
  expect(
    systemdIn({
      systemd: {
        restart: "on-failure",
        schedule: "daily",
        restartDelaySeconds: 10,
        startTimeoutSeconds: 300,
        jitterSeconds: 5,
        catchUp: true,
        partOf: "graphical-session.target",
        wantedBy: "graphical-session.target",
        accuracySeconds: 1,
        successExitStatus: 75,
        restartForceExitStatus: 75,
        startLimitIntervalSeconds: 0,
        after: ["network-online.target"],
        wants: ["network-online.target"],
        stops: ["/usr/bin/podman stop it"],
        killMode: "mixed",
        nice: 4,
      },
    })
  ).toEqual({
    restart: "on-failure",
    schedule: "daily",
    restartDelaySeconds: 10,
    startTimeoutSeconds: 300,
    jitterSeconds: 5,
    catchUp: true,
    partOf: "graphical-session.target",
    wantedBy: "graphical-session.target",
    accuracySeconds: 1,
    successExitStatus: 75,
    restartForceExitStatus: 75,
    startLimitIntervalSeconds: 0,
    after: ["network-online.target"],
    wants: ["network-online.target"],
    stops: ["/usr/bin/podman stop it"],
  })
})

test("an option stated as the wrong sort of value is read as none of it", () => {
  expect(systemdIn({ systemd: { restart: 3, jitterSeconds: "5" } })).toEqual({})
  expect(systemdIn({ systemd: { after: "network.target", wants: [], stops: [2] } })).toEqual({})
})

test("a page stating no systemd carries none", () => {
  expect(systemdIn({})).toBe(undefined)
  expect(systemdIn({ systemd: [] })).toBe(undefined)
})

test("a slug no service is filed under is refused by name", () => {
  const read = readFor(ROOT, "no-such-service-stands-here")
  expect("refused" in read).toBe(true)
})

test("the service there today is read from its page", () => {
  const read = readFor(ROOT, "pages-service")
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.services.length).toBe(1)
  expect(read.services[0]?.service.slug).toBe("pages-service")
  expect(read.services[0]?.service.enabled).toBe(true)
  expect(read.services[0]?.pagePath).toContain("pages-service.service-workstation.ts")
})

test("every service there is read, and the one there today is among them", () => {
  const read = everyService(ROOT)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.services.map((one) => one.service.slug)).toContain("pages-service")
})
