import { expect, test } from "bun:test"
import { DATA, INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperWatcherLog } from "akasha/command/pages/temper/watcher/log/temper-watcher-log.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper watcher log",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a duration written in an unknown unit refuses the call", () => {
  const said = temperWatcherLog(["--since", "1w"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe("`1w` is no duration — say a count and one of s, m, h or d")
})

test("a count below nought is refused by the page rather than by the body", () => {
  const said = temperWatcherLog(["--limit", "-3"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe("`--limit -3` is no whole number of nought or more")
})

test("a count of nought reads nothing, and is refused rather than answered empty", () => {
  const said = temperWatcherLog(["--limit", "0"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe("`--limit 0` reads no records — say a whole number above zero")
})

test("a count said twice is refused rather than read as the last saying", () => {
  const said = temperWatcherLog(["--limit", "5", "--limit", "6"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--limit` is said twice")
})

test("a bare word is refused, this command taking none", () => {
  const said = temperWatcherLog(["1h"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(
    "`1h` is no argument `akasha temper watcher log` takes — it takes `--limit`, `--since`, `--log-dir`, `--json`"
  )
})

test("a directory holding neither log refuses the call, naming both files", () => {
  const said = temperWatcherLog(["--log-dir", "no-such-watcher-folder"], GIVEN)

  expect(said.code).toBe(DATA)
  expect(said.refusals[0]).toBe(
    "neither no-such-watcher-folder/watcher.log nor no-such-watcher-folder/tray.log could be read"
  )
})
