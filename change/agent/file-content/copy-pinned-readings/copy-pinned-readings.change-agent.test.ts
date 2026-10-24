import { expect, test } from "bun:test"
import { copyPinnedReadings } from "akasha/change/agent/file-content/copy-pinned-readings/copy-pinned-readings.change-agent.code.ts"
import { worldUnder as worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/stalker/stalker.temper-account-character.readings.jsonl"

const CASE = "temper/player/character/stat/temper-combat-case/pages/stalker-glyph/stalker-glyph"

const HITS_AT = `${CASE}.temper-combat-case.verified-hits.json`

const PINNED_AT = `${CASE}.temper-combat-case.pinned-reading.json`

const PINNED = JSON.stringify({ id: "01a1aaaa", buildHash: "one", reading: { capturedAt: 7 } })

const OTHER = JSON.stringify({ id: "01a1bbbb", buildHash: "one", reading: { capturedAt: 8 } })

const HITS = `${JSON.stringify({ character: "stalker", reading: "01a1aaaa" }, null, 2)}\n`

test("a case is given the line its character's readings hold under its id, whole", () => {
  const said = copyPinnedReadings(
    worldOf({ [READINGS_AT]: `${OTHER}\n${PINNED}\n`, [HITS_AT]: HITS })
  )
  expect(said.edits).toEqual([{ kind: "add", path: PINNED_AT, content: `${PINNED}\n` }])
})

test("a case already holding its reading is left as it is", () => {
  const said = copyPinnedReadings(
    worldOf({ [READINGS_AT]: `${PINNED}\n`, [HITS_AT]: HITS, [PINNED_AT]: `${PINNED}\n` })
  )
  expect(said.edits).toEqual([])
})

test("a case whose reading the readings no longer hold is named", () => {
  const said = copyPinnedReadings(worldOf({ [READINGS_AT]: `${OTHER}\n`, [HITS_AT]: HITS }))
  expect(said.edits).toEqual([])
  expect(said.told).toContain(
    "1 combat cases whose reading their character's readings no longer hold: stalker-glyph"
  )
})
