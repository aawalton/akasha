import { expect, test } from "bun:test"
import {
  laidAmong,
  outcomesPartWay,
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

function planned(dir: string): PlannedAddon {
  return { dir, status: "outdated", installedVersion: WAS, latestVersion: NOW, uid: "77" }
}

const GROUP = [planned("Alpha"), planned("Beta")]

test("the folders the ledger says were laid down are the folders read as laid down", () => {
  const done = [clearedSaid("Alpha", AT), laidSaid("Alpha", AT), clearedSaid("Beta", AT)]

  expect([...laidAmong(GROUP, done, AT)]).toEqual(["Alpha"])
})

test("an install that threw part way reads as updated the folder it had laid down", () => {
  const said = outcomesPartWay(GROUP, NOW, new Set(["Alpha"]), WHY)

  expect(said).toEqual([
    { dir: "Alpha", action: "updated", from: WAS, to: NOW },
    { dir: "Beta", action: "failed", from: WAS, to: NOW, error: WHY },
  ])
})

test("an install that laid no folder down reads every folder as failed at its old version", () => {
  const said = outcomesPartWay(GROUP, NOW, new Set(), WHY)

  expect(said).toEqual([
    { dir: "Alpha", action: "failed", from: WAS, to: NOW, error: WHY },
    { dir: "Beta", action: "failed", from: WAS, to: NOW, error: WHY },
  ])
})
