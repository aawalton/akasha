import { expect, test } from "bun:test"
import {
  contentOf,
  readingSaid,
  stoplightsIn,
} from "akasha/alan/harness/stoplight/modules/stoplights-activity-content/stoplights-activity-content.module.code.ts"

test("a row is read under the wire key its own group names", () => {
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

test("the reading, the next color and the progress are carried where the group sent them", () => {
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

test("a reading the group sent empty is carried as nothing", () => {
  expect(stoplightsIn([{ habit: "sleep", tier: "black", reading: "" }], "habit")[0]?.reading).toBe(
    null
  )
})

test("a progress that is no finite number is carried as nothing", () => {
  expect(
    stoplightsIn([{ habit: "sleep", tier: "red", progress: Number.NaN }], "habit")[0]?.progress
  ).toBe(null)
})

test("each group is read under its own wire key and kept apart", () => {
  const content = contentOf(
    [
      [{ habit: "sleep", tier: "red" }],
      [{ inbox: "email", tier: "blue" }],
      [{ attribute: "strength", tier: "green" }],
    ],
    "2026-09-19T17:00:00Z"
  )
  expect([
    content.upkeep[0]?.key,
    content.inboxes[0]?.key,
    content.attributes[0]?.key,
    content.takenAt,
  ]).toEqual(["sleep", "email", "strength", "2026-09-19T17:00:00Z"])
})

test("two readings taken at different moments say the same thing", () => {
  const rows = [
    [{ habit: "sleep", tier: "red" }],
    [{ inbox: "email", tier: "blue" }],
    [{ attribute: "strength", tier: "green" }],
  ] as const
  expect(readingSaid(contentOf(rows, "2026-09-19T17:00:00Z"))).toBe(
    readingSaid(contentOf(rows, "2026-09-19T18:00:00Z"))
  )
})

test("a color that moved says something else", () => {
  const before = contentOf([[{ habit: "sleep", tier: "red" }], [], []], "2026-09-19T17:00:00Z")
  const after = contentOf([[{ habit: "sleep", tier: "green" }], [], []], "2026-09-19T17:00:00Z")
  expect(readingSaid(before)).not.toBe(readingSaid(after))
})
