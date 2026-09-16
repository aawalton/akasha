import { expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  everyService,
  pagesOriginIn,
  readFor,
  runnerCodeIn,
  serviceIn,
  systemdIn,
} from "akasha/infrastructure/service/workstation/modules/service-reading/service-reading.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const ROOT = process.cwd()

const TS = ".ts"

const CODE_BESIDE = ".code.ts"

const RUNNER = "bun"

const RUNNING = "service-running"

const WHOLE = {
  id: "01a05a51-0000-7000-8000-00000000000c",
  pageTypeSlug: "service-workstation",
  slug: "a-service",
  definition: "a service representing a test",
  enabled: true,
}

function runnerBeside(): string {
  const page = listedAt(ROOT, "module", RUNNING)[0]
  if (page === undefined) {
    throw new Error(`no \`module/${RUNNING}\` is filed, so nothing says where its code sits`)
  }
  return `${page.path.slice(0, -TS.length)}${CODE_BESIDE}`
}

test("a value stating everything a service needs is read as one", () => {
  const service = serviceIn(ROOT, { ...WHOLE })
  expect(service?.slug).toBe("a-service")
  expect(service?.enabled).toBe(true)
})

test("whether a service is told is read from its page", () => {
  expect(serviceIn(ROOT, { ...WHOLE })?.told).toBe(undefined)
  expect(serviceIn(ROOT, { ...WHOLE, told: false })?.told).toBe(false)
  expect(serviceIn(ROOT, { ...WHOLE, told: "no" })?.told).toBe(undefined)
})

test("a service whose page states it is not told is read that way", () => {
  const read = readFor(ROOT, "memory-reaper")
  expect("refused" in read || "unnamed" in read).toBe(false)
  if ("refused" in read || "unnamed" in read) return
  expect(read.services[0]?.service.told).toBe(false)
})

test("a value missing what a service needs is read as none", () => {
  for (const key of ["id", "slug", "definition", "enabled"]) {
    const held: Record<string, unknown> = { ...WHOLE }
    delete held[key]
    expect(serviceIn(ROOT, held)).toBe(null)
  }
})

test("a value stating enabled as anything but a boolean is read as none", () => {
  expect(serviceIn(ROOT, { ...WHOLE, enabled: "yes" })).toBe(null)
})

test("a service has one command line, which runs the runner and names that service", () => {
  const beside = runnerBeside()
  expect(existsSync(join(ROOT, beside))).toBe(true)
  expect(serviceIn(ROOT, { ...WHOLE })?.runs).toEqual([`${RUNNER} ${beside} a-service`])
})

test("the command line is composed the same way for every service", () => {
  const beside = runnerBeside()
  const other = serviceIn(ROOT, { ...WHOLE, slug: "another-service" })
  expect(other?.runs).toEqual([`${RUNNER} ${beside} another-service`])
})

test("a service the loader is named for starts the loader and names itself to it", () => {
  const read = readFor(ROOT, "sweep-log-days")
  expect("refused" in read || "unnamed" in read).toBe(false)
  if ("refused" in read || "unnamed" in read) return
  expect(read.services[0]?.service.runs).toEqual([
    "bun %h/.local/state/workstation-services/service-loader.ts sweep-log-days",
  ])
})

test("the file that command line runs is answered for on its own as well", () => {
  expect(runnerCodeIn(ROOT)).toEqual([runnerBeside()])
})

test("what a page spells of how it runs reaches no command line", () => {
  const spelled = serviceIn(ROOT, {
    ...WHOLE,
    runs: ["bun a.ts"],
    starts: [{ code: "module/service-reading" }],
  })
  expect(spelled?.runs).toEqual(serviceIn(ROOT, { ...WHOLE })?.runs ?? [])
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

test("a slug no service is filed under is refused by name, apart from a page that will not read", () => {
  const read = readFor(ROOT, "no-such-service-stands-here")
  expect("unnamed" in read).toBe(true)
  expect("refused" in read).toBe(false)
})

test("the service there today is read from its page", () => {
  const read = readFor(ROOT, "page-service")
  expect("refused" in read).toBe(false)
  if ("refused" in read || "unnamed" in read) return
  expect(read.services.length).toBe(1)
  expect(read.services[0]?.service.slug).toBe("page-service")
  expect(read.services[0]?.service.enabled).toBe(true)
  expect(read.services[0]?.pagePath).toContain("page-service.service-workstation.ts")
})

test("the origin is the loopback and the port the pages service's own page states", () => {
  const read = readFor(ROOT, "page-service")
  expect("services" in read).toBe(true)
  if (!("services" in read)) return
  const port = read.services[0]?.service.port
  expect(typeof port).toBe("number")
  expect(pagesOriginIn(ROOT)).toBe(`http://127.0.0.1:${port}`)
})

test("a service is read with the origin the pages service answers on", () => {
  const read = readFor(ROOT, "memory-reaper")
  expect("services" in read).toBe(true)
  if (!("services" in read)) return
  expect(read.services[0]?.pagesOrigin).toBe(pagesOriginIn(ROOT))
})

test("a checkout stating no pages service leaves a service reading no origin", () => {
  expect(pagesOriginIn("/nowhere")).toBe(undefined)
})

test("every service there is read, and the one there today is among them", () => {
  const read = everyService(ROOT)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.services.map((one) => one.service.slug)).toContain("page-service")
})
