import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import {
  changedAmong,
  type Drift,
  fieldsIn,
  installedText,
  landedOver,
  reachedFor,
  type Standing,
  startingIn,
  startsAgainFor,
  stilled,
  treeInstalled,
  treeLanded,
  unitsLanded,
  type Weighing,
  weighedIn,
} from "akasha/commands/modules/unit-landing/unit-landing.module.code.ts"
import {
  homeWith,
  keeping,
  nothingWeighed,
  oneDrift,
  PAGE,
  REACHES,
  RELOADED,
  rooted,
  STARTED,
  sweep,
  TICKS,
  TIMER,
  taking,
  UNIT,
  WAS,
  without,
} from "akasha/commands/modules/unit-landing/unit-landing.module.test-fixtures.ts"
import {
  type Ran,
  stagingDir,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

afterAll(sweep)

const UNREACHED = "node:fs"

const NO_COMMIT = "0000000000000000000000000000000000000000"

let weighedOnce: Weighing | null = null

function installedHere(): Weighing {
  if (weighedOnce === null) weighedOnce = weighedIn(codeRoot(), homedir())
  return weighedOnce
}

function runningCode(weighed: Weighing): Standing {
  const one = weighed.standings.find((each) => each.files.length > 0)
  if (one === undefined) throw new Error("no workstation service runs a file of this repository")
  return one
}

test("a unit already as its page states it is written by nothing and asks systemd nothing", () => {
  const home = homeWith({ [UNIT]: WAS })
  const { calls, run } = taking()

  expect(landedOver(nothingWeighed(), home, run, new Map(), keeping())).toEqual({
    said: [],
    wrong: [],
  })
  expect(calls).toEqual([])
  expect(readFileSync(join(stagingDir(home), UNIT), "utf8")).toBe(WAS)
})

test("a unit whose text drifted is written and systemd is told to read it again", () => {
  const home = homeWith({ [UNIT]: WAS })
  const now = without(WAS, "Description=A thing", "Description=Another thing")
  const { calls, run } = taking()

  const said = landedOver(oneDrift(UNIT, now), home, run, new Map(), keeping())

  expect(said.wrong).toEqual([])
  expect(said.said).toEqual([
    `wrote ${UNIT} as ${PAGE} states it`,
    "told systemd to read 1 unit again",
  ])
  expect(readFileSync(join(stagingDir(home), UNIT), "utf8")).toBe(now)
  expect(calls).toEqual([RELOADED])
})

test("a changed ExecStart starts the service again and names the field that did it", () => {
  const home = homeWith({ [UNIT]: WAS })
  const now = without(WAS, "bun one.ts", "bun two.ts")
  const startsFor = startsAgainFor(UNIT, WAS, now, true, false)
  const { calls, run } = taking()

  const said = landedOver(oneDrift(UNIT, now, startsFor), home, run, new Map(), keeping())

  expect(startsFor).toEqual(["ExecStart"])
  expect(said.wrong).toEqual([])
  expect(said.said.join("")).toContain(`started ${UNIT} again — \`ExecStart\` changed`)
  expect(calls[0]).toEqual(RELOADED)
  expect(calls).toContainEqual([STARTED, UNIT])
})

test("a changed Environment or WorkingDirectory starts the service again", () => {
  const swapped = without(WAS, "PATH=/usr/bin", "PATH=/bin")
  const moved = without(WAS, "WorkingDirectory=%h/repos/akasha", "WorkingDirectory=%h/held")

  expect(startsAgainFor(UNIT, WAS, swapped, true, false)).toEqual(["Environment"])
  expect(startsAgainFor(UNIT, WAS, moved, true, false)).toEqual(["WorkingDirectory"])
})

test("a field systemd takes up at the next stop starts nothing again", () => {
  const rest = [
    "Description=Another thing",
    "Documentation=file://held",
    "Restart=on-failure",
    "RestartSec=9",
    "SuccessExitStatus=143 75",
    "RestartForceExitStatus=75",
    "TimeoutStartSec=30",
    "WantedBy=held.target",
    "After=held.service",
    "Wants=held.service",
    "PartOf=held.service",
    "StartLimitIntervalSec=0",
  ]

  for (const one of rest) {
    expect(startsAgainFor(UNIT, WAS, `${WAS}${one}\n`, true, false)).toEqual([])
  }
})

test("a changed tick arms the timer again rather than bouncing the service", () => {
  const each: Readonly<Record<string, string>> = {
    OnCalendar: "OnCalendar=daily",
    RandomizedDelaySec: "RandomizedDelaySec=30",
    AccuracySec: "AccuracySec=1",
    Persistent: "Persistent=false",
  }

  for (const [key, line] of Object.entries(each)) {
    const now = without(TICKS, `${key}=${TICKS.split(`${key}=`)[1]?.split("\n")[0] ?? ""}`, line)
    expect(startsAgainFor(TIMER, TICKS, now, true, true)).toEqual([key])
    expect(startsAgainFor(UNIT, TICKS, now, true, false)).toEqual([])
  }
})

test("a scheduled service's own unit starts nothing again", () => {
  const now = without(WAS, "bun one.ts", "bun two.ts")

  expect(startsAgainFor(UNIT, WAS, now, true, true)).toEqual([])
  expect(startsAgainFor(TIMER, TICKS, without(TICKS, "hourly", "daily"), true, true)).toEqual([
    "OnCalendar",
  ])
})

test("a service whose page says it is not enabled is started again by nothing", () => {
  expect(startsAgainFor(UNIT, WAS, without(WAS, "bun one.ts", "bun two.ts"), false, false)).toEqual(
    []
  )
  expect(startsAgainFor(TIMER, TICKS, without(TICKS, "hourly", "daily"), false, true)).toEqual([])
})

test("a unit whose installed text could not be read is written and started again by nothing", () => {
  expect(startsAgainFor(UNIT, null, WAS, true, false)).toEqual([])
  expect(installedText(rooted(), UNIT)).toBe(null)
})

test("systemd that cannot be reached is said as wrong and starts nothing again", () => {
  const home = homeWith({ [UNIT]: WAS })
  const now = without(WAS, "bun one.ts", "bun two.ts")
  const run = (): Ran => {
    throw new Error("Failed to connect to bus: No medium found")
  }

  const said = landedOver(oneDrift(UNIT, now, ["ExecStart"]), home, run, new Map(), keeping())

  expect(said.said).toEqual([`wrote ${UNIT} as ${PAGE} states it`])
  expect(said.wrong.join("")).toContain("Failed to connect to bus")
  expect(readFileSync(join(stagingDir(home), UNIT), "utf8")).toBe(now)
})

test("a restart that refuses is said as wrong and the rest are still asked for", () => {
  const home = homeWith({ [UNIT]: WAS, [TIMER]: TICKS })
  const { calls, run } = taking({ [`${STARTED} ${UNIT}`]: 1 })
  const drifts: readonly Drift[] = [
    { unit: UNIT, page: PAGE, text: `${WAS}X=1\n`, startsFor: ["ExecStart"] },
    { unit: TIMER, page: PAGE, text: without(TICKS, "hourly", "daily"), startsFor: ["OnCalendar"] },
  ]

  const said = landedOver({ ...nothingWeighed(), drifts }, home, run, new Map(), keeping())

  expect(said.wrong.join("")).toContain(`${UNIT} runs as it did`)
  expect(said.said.join("")).toContain(`armed ${TIMER} again — \`OnCalendar\` changed`)
  expect(calls[0]).toEqual(RELOADED)
  expect(calls).toContainEqual([STARTED, UNIT])
  expect(calls).toContainEqual([STARTED, TIMER])
})

test("a reload that refuses leaves the units written and starts nothing again", () => {
  const home = homeWith({ [UNIT]: WAS })
  const now = without(WAS, "bun one.ts", "bun two.ts")
  const { calls, run } = taking({ "daemon-reload": 1 })

  const said = landedOver(oneDrift(UNIT, now, ["ExecStart"]), home, run, new Map(), keeping())

  expect(said.wrong.join("")).toContain("what is loaded is what was loaded")
  expect(calls).toEqual([RELOADED])
  expect(readFileSync(join(stagingDir(home), UNIT), "utf8")).toBe(now)
})

test("a file a service reaches starts it again with no unit written and no reload", () => {
  const home = homeWith({ [UNIT]: WAS })
  const { calls, run } = taking()

  const said = landedOver(nothingWeighed(), home, run, new Map([[UNIT, REACHES]]), keeping())

  expect(said.wrong).toEqual([])
  expect(said.said).toEqual([`started ${UNIT} again — the code it runs changed at \`${REACHES}\``])
  expect(calls).toContainEqual([STARTED, UNIT])
})

test("a service a field and a file both started again is said to have both reasons", () => {
  const held = startingIn(
    [{ unit: UNIT, page: PAGE, text: WAS, startsFor: ["ExecStart"] }],
    new Map([[UNIT, REACHES]])
  )

  expect(held).toEqual([
    { unit: UNIT, why: `\`ExecStart\` changed and the code it runs changed at \`${REACHES}\`` },
  ])
})

test("a unit written whose fields stayed put starts again only for the file that changed", () => {
  const one: Drift = { unit: UNIT, page: PAGE, text: WAS, startsFor: [] }

  expect(startingIn([one], new Map())).toEqual([])
  expect(startingIn([one], new Map([[TIMER, REACHES]]))).toEqual([
    { unit: TIMER, why: `the code it runs changed at \`${REACHES}\`` },
  ])
})

test("a unit's fields are read past its comment and its sections", () => {
  const held = fieldsIn(WAS)

  expect(held.get("ExecStart")).toEqual(["/usr/bin/env bash -c 'exec bun one.ts'"])
  expect(held.get("Environment")).toEqual(["PATH=/usr/bin", "AKASHA_ROOT=%h/repos/akasha"])
  expect(held.get("[Unit]")).toBe(undefined)
  expect(
    held.get(
      "# Written from one/held.service-workstation.ts by akasha deploy. Edits here are lost."
    )
  ).toBe(undefined)
})

test("two lines under one field are weighed in the order the unit states them", () => {
  const one = fieldsIn("Environment=A\nEnvironment=B\n")
  const two = fieldsIn("Environment=B\nEnvironment=A\n")

  expect(changedAmong(one, two, ["Environment"])).toEqual(["Environment"])
  expect(changedAmong(one, one, ["Environment"])).toEqual([])
})

test("the tree the installed units name is the tree the runs are spelled under", () => {
  const at = "/held/.git/trees/service-workstation"
  const plain = homeWith({ [UNIT]: WAS })
  const pinned = homeWith({ [UNIT]: without(WAS, "bun one.ts", `bun ${at}/one.ts`) })

  expect(treeInstalled(plain, [UNIT], at)).toBe("")
  expect(treeInstalled(plain, [UNIT], null)).toBe("")
  expect(treeInstalled(pinned, [UNIT], at)).toBe(at)
})

test("a weighing stilled keeps its units and starts nothing again", () => {
  const held = stilled(oneDrift(UNIT, WAS, ["ExecStart"]))

  expect(held.drifts[0]?.startsFor).toEqual([])
  expect(startingIn(held.drifts, new Map())).toEqual([])
  expect(installedHere().under).toBe(treeInstalled(homedir(), [], null))
})

test("a landing that committed nothing moves no tree", () => {
  expect(treeLanded(codeRoot(), null)).toEqual({ said: [], wrong: [] })
})

test("a tree git will not move is said as wrong rather than thrown", () => {
  const said = treeLanded(rooted(), NO_COMMIT)

  expect(said.said).toEqual([])
  expect(said.wrong.length).toBe(1)
  expect(said.wrong.join("")).toContain("service-workstation")
})

test("a start a service is owed is a cause of its own, doubling no cause the commit gave", () => {
  const why = `the code it runs changed at \`${REACHES}\``
  const owed = { [UNIT]: { commit: NO_COMMIT, why, since: "" } }

  expect(startingIn([], new Map(), owed)).toEqual([{ unit: UNIT, why }])
  expect(startingIn([], new Map([[UNIT, REACHES]]), owed)).toEqual([{ unit: UNIT, why }])
  expect(
    startingIn([{ unit: UNIT, page: PAGE, text: WAS, startsFor: ["ExecStart"] }], new Map(), owed)
  ).toEqual([{ unit: UNIT, why: "`ExecStart` changed" }])
})

test("no unit of akasha's installed is nothing weighed and nothing asked of systemd", () => {
  const home = rooted()

  expect(weighedIn(codeRoot(), home)).toEqual(nothingWeighed())
  expect(
    unitsLanded(codeRoot(), home, null, [], () => {
      throw new Error("systemd was reached")
    })
  ).toEqual({ said: [], wrong: [] })
})

test("every workstation unit installed here is weighed without anything wrong", () => {
  const weighed = installedHere()

  expect(weighed.wrong).toEqual([])
  for (const one of weighed.drifts) expect(one.text).toContain("[Unit]")
})

test("a service standing to be started again is enabled, is no timer's, and names the code it runs", () => {
  const weighed = installedHere()
  const read = everyService(codeRoot(), "")
  const off = new Set(
    "refused" in read
      ? []
      : read.services.filter((one) => !one.service.enabled).map((one) => one.service.slug)
  )

  expect(weighed.standings.length).toBeGreaterThan(0)
  expect(weighed.standings.some((one) => one.files.length > 0)).toBe(true)
  for (const one of weighed.standings) {
    expect(one.unit.endsWith(".service")).toBe(true)
    expect(off.has(one.unit.slice(0, -".service".length))).toBe(false)
  }
})

test("a commit touching one service's code starts that one and leaves the rest running", () => {
  const weighed = installedHere()
  const one = runningCode(weighed)
  const bare = weighed.standings.filter((each) => each.files.length === 0)

  const reached = reachedFor(codeRoot(), weighed.standings, [one.files[0] ?? ""])

  expect(reached.wrong).toEqual([])
  expect(reached.starts.get(one.unit)).toBe(one.files[0])
  expect(reached.starts.size).toBeLessThan(weighed.standings.length)
  for (const each of bare) expect(reached.starts.has(each.unit)).toBe(false)
})

test("a commit touching a file no service reaches starts nothing again", () => {
  const weighed = installedHere()

  expect(reachedFor(codeRoot(), weighed.standings, [UNREACHED]).starts.size).toBe(0)
  expect(reachedFor(codeRoot(), weighed.standings, []).starts.size).toBe(0)
  expect(reachedFor(codeRoot(), [], [UNREACHED]).starts.size).toBe(0)
})
