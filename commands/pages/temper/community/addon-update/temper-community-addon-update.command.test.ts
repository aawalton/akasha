import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  amongDone,
  carriedNothingSaid,
  outcomesFor,
  temperCommunityAddonUpdate,
  wentSaid,
} from "akasha/commands/pages/temper/community/addon-update/temper-community-addon-update.command.code.ts"
import type { PlannedAddon } from "akasha/temper/community-addons/addon-update-plan/addon-update-plan.module.code.ts"
import {
  clearedSaid,
  laidSaid,
} from "akasha/temper/community-addons/modules/addon-download/addon-download.module.code.ts"

const AT = "/nowhere/addons"

const WHY = "the disk would not copy a folder"

const WAS = "1.0"

const NOW = "2.0"

const UID = "77"

function planned(dir: string): PlannedAddon {
  return { dir, status: "outdated", installedVersion: WAS, latestVersion: NOW, uid: UID }
}

const GROUP = [planned("Alpha"), planned("Beta")]

test("the folders the ledger says were laid down are the folders read as laid down", () => {
  const done = [clearedSaid("Alpha", AT), laidSaid("Alpha", AT), clearedSaid("Beta", AT)]

  expect([...amongDone(GROUP, done, AT, laidSaid)]).toEqual(["Alpha"])
})

test("an install that threw part way reads as updated the folder it had laid down", () => {
  const said = outcomesFor(GROUP, NOW, new Set(["Alpha"]), () => WHY)

  expect(said).toEqual([
    { dir: "Alpha", action: "updated", from: WAS, to: NOW },
    { dir: "Beta", action: "failed", from: WAS, to: NOW, error: WHY },
  ])
})

test("an install that laid no folder down reads every folder as failed at its old version", () => {
  const said = outcomesFor(GROUP, NOW, new Set(), () => WHY)

  expect(said).toEqual([
    { dir: "Alpha", action: "failed", from: WAS, to: NOW, error: WHY },
    { dir: "Beta", action: "failed", from: WAS, to: NOW, error: WHY },
  ])
})

test("a folder the archive carried nothing for is read as failed rather than left out", () => {
  const said = outcomesFor(GROUP, NOW, new Set(["Alpha"]), () => carriedNothingSaid(UID))

  expect(said.map((one) => one.dir)).toEqual(["Alpha", "Beta"])
  expect(said[1]).toEqual({
    dir: "Beta",
    action: "failed",
    from: WAS,
    to: NOW,
    error: `the ESOUI download for file ${UID} carried nothing for it`,
  })
})

test("the folders the ledger says were cleared are the folders read as cleared", () => {
  const done = [clearedSaid("Alpha", AT), laidSaid("Alpha", AT), clearedSaid("Beta", AT)]

  expect([...amongDone(GROUP, done, AT, clearedSaid)]).toEqual(["Alpha", "Beta"])
})

test("a folder cleared whose new one never landed is refused as gone rather than unchanged", () => {
  const done = [clearedSaid("Alpha", AT), laidSaid("Alpha", AT), clearedSaid("Beta", AT)]
  const cleared = amongDone(GROUP, done, AT, clearedSaid)

  const said = outcomesFor(GROUP, NOW, amongDone(GROUP, done, AT, laidSaid), (dir) =>
    cleared.has(dir) ? wentSaid(dir, AT, WHY) : WHY
  )

  expect(said[0]?.action).toBe("updated")
  expect(said[1]?.error ?? "").toContain("is gone")
  expect(said[1]?.error ?? "").toContain(AT)
  expect(said[1]?.error ?? "").toContain(WHY)
})

test("a folder that was never cleared is refused as the fault alone", () => {
  const done = [clearedSaid("Alpha", AT), laidSaid("Alpha", AT)]
  const cleared = amongDone(GROUP, done, AT, clearedSaid)

  const said = outcomesFor(GROUP, NOW, amongDone(GROUP, done, AT, laidSaid), (dir) =>
    cleared.has(dir) ? wentSaid(dir, AT, WHY) : WHY
  )

  expect(said[1]?.error).toBe(WHY)
})

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper community addon-update",
  from: ".",
  writer: null,
  agentId: null,
}

test("a flag this takes no argument for is refused before the community site is reached", async () => {
  const said = await temperCommunityAddonUpdate(["--outdated"], GIVEN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--outdated` is no argument")
})

test("a word this takes no argument for is refused before the community site is reached", async () => {
  const said = await temperCommunityAddonUpdate(["Votans"], GIVEN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`Votans` is no argument")
})
