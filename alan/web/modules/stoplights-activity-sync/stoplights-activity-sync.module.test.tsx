import { expect, test } from "bun:test"
import { stoplightsIn } from "akasha/alan/web/modules/stoplights-activity-sync/stoplights-activity-sync.module.code.tsx"

test("a row is read under the wire key its own feed names", () => {
  expect(stoplightsIn([{ inbox: "email", label: "Email", tier: "blue" }], "inbox")).toEqual([
    { key: "email", label: "Email", tier: "blue", reading: null, nextTier: null, progress: null },
  ])
})

test("a row naming no stoplight is left out", () => {
  expect(stoplightsIn([{ label: "Email", tier: "blue" }], "inbox")).toEqual([])
})

test("a row naming no color is left out", () => {
  expect(stoplightsIn([{ inbox: "email", label: "Email" }], "inbox")).toEqual([])
})

test("a row naming no label is read under its own name", () => {
  expect(stoplightsIn([{ habit: "sleep", tier: "red" }], "habit")[0]?.label).toBe("sleep")
})

test("the reading, the next color and the progress are carried where the feed sent them", () => {
  expect(
    stoplightsIn(
      [
        {
          habit: "sleep",
          label: "Sleep",
          tier: "red",
          reading: "6.4",
          nextTier: "yellow",
          progress: 0.4,
        },
      ],
      "habit"
    )
  ).toEqual([
    {
      key: "sleep",
      label: "Sleep",
      tier: "red",
      reading: "6.4",
      nextTier: "yellow",
      progress: 0.4,
    },
  ])
})

test("a reading the feed sent empty is carried as nothing", () => {
  expect(stoplightsIn([{ habit: "sleep", tier: "black", reading: "" }], "habit")[0]?.reading).toBe(
    null
  )
})

test("a progress that is no finite number is carried as nothing", () => {
  expect(
    stoplightsIn([{ habit: "sleep", tier: "red", progress: Number.NaN }], "habit")[0]?.progress
  ).toBe(null)
})
