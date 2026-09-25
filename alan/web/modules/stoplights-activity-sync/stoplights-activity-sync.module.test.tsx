import { expect, test } from "bun:test"
import { contentIn } from "akasha/alan/web/modules/stoplights-activity-sync/stoplights-activity-sync.module.code.tsx"

const ANSWERED = {
  "a-group-named-only-in-this-test": [{ key: "sleep", label: "Sleep", tier: "red" }],
  takenAt: "2026-09-19T17:00:00Z",
}

test("the answer is handed over as the reading it came as, whatever groups it holds", () => {
  const content = contentIn(ANSWERED)
  expect(content === null ? null : JSON.parse(content)).toEqual(ANSWERED)
})

test("an answer that is no record hands nothing over", () => {
  expect(contentIn([ANSWERED])).toBeNull()
  expect(contentIn("stoplights")).toBeNull()
  expect(contentIn(null)).toBeNull()
})
