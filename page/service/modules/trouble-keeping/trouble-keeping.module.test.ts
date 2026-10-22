import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { WORKED_AT } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-beating/service-beating.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  HEAVY_MB,
  keepingTroubles,
  LONG_ANSWER_MS,
  LONG_HOLD_MS,
  SLOW_ANSWER_MS,
  SLOW_ANSWERS,
  TROUBLES,
  troublesIn,
  troublingFor,
  WINDOW_MS,
} from "akasha/page/service/modules/trouble-keeping/trouble-keeping.module.code.ts"

const PAGE = "page/service/page-service.service-workstation.ts"

function slow(count: number, ms = SLOW_ANSWER_MS) {
  return Array.from({ length: count }, (_, at) => ({ at, ms }))
}

test("a service answering quickly in little memory has no trouble", () => {
  expect(troublesIn([], [], 100)).toEqual([])
})

test("slow answers are a trouble only once there are enough of them", () => {
  expect(troublesIn(slow(SLOW_ANSWERS - 1), [], 0)).toEqual([])
  expect(troublesIn(slow(SLOW_ANSWERS), [], 0)).toEqual([
    `answered ${SLOW_ANSWERS} requests in 5 s or more in the last ten minutes`,
  ])
})

test("one answer taking a minute or more is a trouble alone", () => {
  expect(troublesIn(slow(1, LONG_ANSWER_MS), [], 0)).toEqual([
    "took 60 s over one answer in the last ten minutes",
  ])
})

test("a held listening thread and heavy memory are troubles", () => {
  expect(troublesIn([], [{ at: 0, ms: LONG_HOLD_MS }], HEAVY_MB)).toEqual([
    "held its listening thread 10 s in the last ten minutes",
    `holds ${HEAVY_MB} MB of memory`,
  ])
})

test("only answers and holds past their bar are kept", () => {
  const troubling = troublingFor()
  for (let at = 0; at < SLOW_ANSWERS; at += 1) troubling.answered(at, SLOW_ANSWER_MS - 1)
  troubling.held(0, LONG_HOLD_MS - 1)
  expect(troubling.troubles(SLOW_ANSWERS, 0)).toEqual([])
})

test("what happened longer ago than the window is forgotten", () => {
  const troubling = troublingFor()
  troubling.held(0, LONG_HOLD_MS)
  expect(troubling.troubles(1, 0)).toHaveLength(1)
  expect(troubling.troubles(WINDOW_MS, 0)).toEqual([])
})

test("troubles are kept beside the page with the beat, and dropped once gone", () => {
  const root = mkdtempSync(join("/var/tmp", "trouble-keeping-"))
  try {
    const at = new Date("2026-10-22T12:00:00.000Z")
    keepingTroubles(root, PAGE, ["holds 9000 MB of memory"], at)
    expect(uncommittedIn(root, PAGE)).toEqual({
      [WORKED_AT]: at.toISOString(),
      [TROUBLES]: ["holds 9000 MB of memory"],
    })
    keepingTroubles(root, PAGE, [], at)
    expect(uncommittedIn(root, PAGE)).toEqual({ [WORKED_AT]: at.toISOString() })
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
