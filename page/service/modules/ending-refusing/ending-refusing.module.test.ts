import { expect, test } from "bun:test"
import {
  endingRefused,
  endingWhy,
} from "akasha/page/service/modules/ending-refusing/ending-refusing.module.code.ts"

test("an ending naming a file is no refusal", () => {
  expect(endingWhy("jsonl", "a.wake-day.completed-tasks.jsonl")).toBeNull()
})

test("an ending naming nothing is refused", () => {
  expect(endingWhy("", "a.wake-day.completed-tasks.")).toBe("names nothing")
})

test("an ending naming a folder is refused", () => {
  expect(endingWhy("held/one", "a.b.held/one")).toBe("names a folder rather than an ending")
})

test("an ending holding a line break is refused", () => {
  expect(endingWhy('{\n"a": 1}', 'a.b.{\n"a": 1}')).toBe("holds a character no file name takes")
})

test("an ending making a name past what a file name holds is refused", () => {
  const long = "j".repeat(300)
  expect(endingWhy(long, `a.b.${long}`)).toBe(
    "makes a name of 304 bytes, past the 255 a file name holds"
  )
})

test("a value that is no string under a key held in a file is refused", () => {
  const said = endingRefused("completedTasks", "completed-tasks", "a/b.wake-day.ts", 7)
  expect(said).toContain("hands over a number rather than an ending")
})
