import { expect, test } from "bun:test"
import {
  everyService,
  readFor,
  runsIn,
  serviceIn,
  systemdIn,
} from "./service-reading.module.code.ts"

const ROOT = process.cwd()

const WHOLE = {
  id: "01a05a51-0000-7000-8000-00000000000c",
  pageTypeSlug: "workstation-service",
  slug: "a-service",
  definition: "a service standing for a test",
  runs: ["bun a.ts"],
  enabled: true,
}

test("a value stating everything a service needs is read as one", () => {
  const service = serviceIn({ ...WHOLE })
  expect(service?.slug).toBe("a-service")
  expect(service?.runs).toEqual(["bun a.ts"])
  expect(service?.enabled).toBe(true)
})

test("a value missing what a service needs is read as none", () => {
  for (const key of ["id", "slug", "definition", "runs", "enabled"]) {
    const held: Record<string, unknown> = { ...WHOLE }
    delete held[key]
    expect(serviceIn(held)).toBe(null)
  }
})

test("a value stating enabled as anything but a boolean is read as none", () => {
  expect(serviceIn({ ...WHOLE, enabled: "yes" })).toBe(null)
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
  })
})

test("an option stated as the wrong sort of value is read as none of it", () => {
  expect(systemdIn({ systemd: { restart: 3, jitterSeconds: "5" } })).toEqual({})
})

test("a page stating no systemd carries none", () => {
  expect(systemdIn({})).toBe(undefined)
  expect(systemdIn({ systemd: [] })).toBe(undefined)
})

test("a slug no service is filed under is refused by name", () => {
  const read = readFor(ROOT, "no-such-service-stands-here")
  expect("refused" in read).toBe(true)
})

test("the service standing today is read from its page", () => {
  const read = readFor(ROOT, "pages-system-service")
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.services.length).toBe(1)
  expect(read.services[0]?.service.slug).toBe("pages-system-service")
  expect(read.services[0]?.service.enabled).toBe(true)
  expect(read.services[0]?.pagePath).toContain("pages-system-service.workstation-service.ts")
})

test("every service standing is read, and the one standing today is among them", () => {
  const read = everyService(ROOT)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.services.map((one) => one.service.slug)).toContain("pages-system-service")
})
