import { expect, test } from "bun:test"
import {
  ANNOUNCE_RE,
  FAIL_TALLY_RE,
  FAIL_TEST_RE,
  FILE_HEADER_RE,
  PRODUCER_TAG_RE,
  REFUSAL_RE,
  RUNNER_MARKER_RE,
  SECTION_RE,
  SKIP_RE,
  stripAnsi,
} from "./triage-fanout-markers.module.code.ts"

test("a producer tag names the workspace that printed the line", () => {
  expect(PRODUCER_TAG_RE.exec("[fanout-ws:akasha/verdict] (fail) something")?.[1]).toBe(
    "akasha/verdict"
  )
  expect(PRODUCER_TAG_RE.test("(fail) something")).toBe(false)
})

test("an announce line states how many workspaces bear tests", () => {
  expect(ANNOUNCE_RE.exec("[run-typed-tests] unit: 12 test-bearing workspace(s)")?.[1]).toBe("12")
})

test("a section line names the workspace that is running", () => {
  expect(SECTION_RE.exec("[run-workspace-tests] akasha/day: running 3 file(s)")?.[1]).toBe(
    "akasha/day"
  )
})

test("a skip and a refusal are told apart from each other", () => {
  expect(SKIP_RE.test("[run-workspace-tests] akasha/day: skipping, no test files")).toBe(true)
  expect(REFUSAL_RE.test("[run-typed-tests] unit: refusing a run that executed no test")).toBe(true)
  expect(REFUSAL_RE.test("[run-workspace-tests] akasha/day: skipping")).toBe(false)
})

test("a runner marker is recognised from either runner", () => {
  expect(RUNNER_MARKER_RE.test("[run-typed-tests] anything")).toBe(true)
  expect(RUNNER_MARKER_RE.test("[run-workspace-tests] anything")).toBe(true)
  expect(RUNNER_MARKER_RE.test("[triage-fanout] anything")).toBe(false)
})

test("a file header is a bare test path ending in a colon", () => {
  expect(FILE_HEADER_RE.exec("akasha/day/day.module.test.ts:")?.[1]).toBe(
    "akasha/day/day.module.test.ts"
  )
  expect(FILE_HEADER_RE.test("akasha/day/day.module.test.ts")).toBe(false)
})

test("a fail line and a fail tally are told apart", () => {
  expect(FAIL_TEST_RE.test("(fail) a test name")).toBe(true)
  expect(FAIL_TALLY_RE.exec(" 4 fail")?.[1]).toBe("4")
})

test("a colour escape comes off before the line is matched", () => {
  expect(stripAnsi("\u001b[31m(fail)\u001b[0m here")).toBe("(fail) here")
  expect(FAIL_TEST_RE.test(stripAnsi("\u001b[31m(fail)\u001b[0m here"))).toBe(true)
})
