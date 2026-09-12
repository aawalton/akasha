import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import {
  installedText,
  landedOver,
  treeInstalled,
  unitsLanded,
  type Weighing,
  weighedIn,
} from "akasha/commands/modules/unit-landing/unit-landing.module.code.ts"
import {
  homeWith,
  nothingWeighed,
  oneDrift,
  PAGE,
  RELOADED,
  rooted,
  sweep,
  taking,
  UNIT,
  WAS,
  without,
} from "akasha/commands/modules/unit-landing/unit-landing.module.test-fixtures.ts"
import {
  type Ran,
  stagingDir,
} from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

afterAll(sweep)

let weighedOnce: Weighing | null = null

function installedHere(): Weighing {
  if (weighedOnce === null) weighedOnce = weighedIn(codeRoot(), homedir())
  return weighedOnce
}

test("a unit already as its page states it is written by nothing and asks systemd nothing", () => {
  const home = homeWith({ [UNIT]: WAS })
  const { calls, run } = taking()

  expect(landedOver(nothingWeighed(), home, run)).toEqual({
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

  const said = landedOver(oneDrift(UNIT, now), home, run)

  expect(said.wrong).toEqual([])
  expect(said.said).toEqual([
    `wrote ${UNIT} as ${PAGE} states it`,
    "told systemd to read 1 unit again",
  ])
  expect(readFileSync(join(stagingDir(home), UNIT), "utf8")).toBe(now)
  expect(calls).toEqual([RELOADED])
})

test("a unit whose installed text could not be read is read as none", () => {
  expect(installedText(rooted(), UNIT)).toBe(null)
})

test("systemd that cannot be reached is said as wrong and the unit is still written", () => {
  const home = homeWith({ [UNIT]: WAS })
  const now = without(WAS, "bun one.ts", "bun two.ts")
  const run = (): Ran => {
    throw new Error("Failed to connect to bus: No medium found")
  }

  const said = landedOver(oneDrift(UNIT, now), home, run)

  expect(said.said).toEqual([`wrote ${UNIT} as ${PAGE} states it`])
  expect(said.wrong.join("")).toContain("Failed to connect to bus")
  expect(readFileSync(join(stagingDir(home), UNIT), "utf8")).toBe(now)
})

test("a reload that refuses leaves the units written", () => {
  const home = homeWith({ [UNIT]: WAS })
  const now = without(WAS, "bun one.ts", "bun two.ts")
  const { calls, run } = taking({ "daemon-reload": 1 })

  const said = landedOver(oneDrift(UNIT, now), home, run)

  expect(said.wrong.join("")).toContain("what is loaded is what was loaded")
  expect(calls).toEqual([RELOADED])
  expect(readFileSync(join(stagingDir(home), UNIT), "utf8")).toBe(now)
})

test("the tree the installed units name is the tree the runs are spelled under", () => {
  const at = "/held/.git/trees/service-workstation"
  const plain = homeWith({ [UNIT]: WAS })
  const pinned = homeWith({ [UNIT]: without(WAS, "bun one.ts", `bun ${at}/one.ts`) })

  expect(treeInstalled(plain, [UNIT], at)).toBe("")
  expect(treeInstalled(plain, [UNIT], null)).toBe("")
  expect(treeInstalled(pinned, [UNIT], at)).toBe(at)
})

test("no unit of akasha's installed is nothing weighed and nothing asked of systemd", () => {
  const home = rooted()

  expect(weighedIn(codeRoot(), home)).toEqual(nothingWeighed())
  expect(
    unitsLanded(codeRoot(), home, () => {
      throw new Error("systemd was reached")
    })
  ).toEqual({ said: [], wrong: [] })
})

test("every workstation unit installed here is weighed without anything wrong", () => {
  const weighed = installedHere()

  expect(weighed.wrong).toEqual([])
  for (const one of weighed.drifts) expect(one.text).toContain("[Unit]")
})
