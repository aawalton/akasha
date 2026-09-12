import { expect, test } from "bun:test"
import {
  carriedNothingSaid,
  laidAmong,
  outcomesFor,
} from "akasha/commands/pages/temper/community/addon-update/temper-community-addon-update.command.code.ts"
import {
  clearedSaid,
  laidSaid,
} from "akasha/temper/community-addons/addon-download/addon-download.module.code.ts"
import type { PlannedAddon } from "akasha/temper/community-addons/addon-update-plan/addon-update-plan.module.code.ts"

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

  expect([...laidAmong(GROUP, done, AT)]).toEqual(["Alpha"])
})

test("an install that threw part way reads as updated the folder it had laid down", () => {
  const said = outcomesFor(GROUP, NOW, new Set(["Alpha"]), WHY)

  expect(said).toEqual([
    { dir: "Alpha", action: "updated", from: WAS, to: NOW },
    { dir: "Beta", action: "failed", from: WAS, to: NOW, error: WHY },
  ])
})

test("an install that laid no folder down reads every folder as failed at its old version", () => {
  const said = outcomesFor(GROUP, NOW, new Set(), WHY)

  expect(said).toEqual([
    { dir: "Alpha", action: "failed", from: WAS, to: NOW, error: WHY },
    { dir: "Beta", action: "failed", from: WAS, to: NOW, error: WHY },
  ])
})

test("a folder the archive carried nothing for is read as failed rather than left out", () => {
  const said = outcomesFor(GROUP, NOW, new Set(["Alpha"]), carriedNothingSaid(UID))

  expect(said.map((one) => one.dir)).toEqual(["Alpha", "Beta"])
  expect(said[1]).toEqual({
    dir: "Beta",
    action: "failed",
    from: WAS,
    to: NOW,
    error: `the ESOUI download for file ${UID} carried nothing for it`,
  })
})
