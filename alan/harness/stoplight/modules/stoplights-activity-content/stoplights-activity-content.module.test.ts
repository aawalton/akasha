import { expect, test } from "bun:test"
import {
  type ActivityGroup,
  type ActivityRows,
  contentOf,
  readingSaid,
  stoplightsCounted,
  stoplightsIn,
  stoplightsOf,
} from "akasha/alan/harness/stoplight/modules/stoplights-activity-content/stoplights-activity-content.module.code.ts"

test("a row is read under the wire key its own group names", () => {
  expect(stoplightsIn([{ inbox: "email", label: "Email", tier: "blue" }], "inbox")).toEqual([
    {
      key: "email",
      label: "Email",
      tier: "blue",
      reading: null,
      nextTier: null,
      progress: null,
      readingHeld: null,
    },
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
      readingHeld: null,
    },
  ])
})

test("a stoplight the group sent with no reading held says so", () => {
  expect(
    stoplightsIn([{ habit: "sleep", tier: "black", reading: "", readingHeld: "none" }], "habit")[0]
      ?.readingHeld
  ).toBe("none")
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

function grouped(
  upkeep: ActivityRows,
  inboxes: ActivityRows,
  attributes: ActivityRows
): readonly ActivityGroup[] {
  return [
    { slug: "upkeep", rows: upkeep, wireKeyName: "habit" },
    { slug: "inboxes", rows: inboxes, wireKeyName: "inbox" },
    { slug: "attributes", rows: attributes, wireKeyName: "attribute" },
  ]
}

test("each group is read under the wire key name handed in beside it and kept apart", () => {
  const content = contentOf(
    grouped(
      [{ habit: "sleep", tier: "red" }],
      [{ inbox: "email", tier: "blue" }],
      [{ attribute: "strength", tier: "green" }]
    ),
    "2026-09-19T17:00:00Z"
  )
  expect([
    stoplightsOf(content, "upkeep")[0]?.key,
    stoplightsOf(content, "inboxes")[0]?.key,
    stoplightsOf(content, "attributes")[0]?.key,
    content.takenAt,
  ]).toEqual(["sleep", "email", "strength", "2026-09-19T17:00:00Z"])
})

test("each group is carried under the slug its own page has rather than one kept here", () => {
  const content = contentOf(
    [{ slug: "a-group-named-only-here", rows: [{ ring: "x", tier: "red" }], wireKeyName: "ring" }],
    "2026-09-19T17:00:00Z"
  )
  expect(Object.keys(content).sort()).toEqual(["a-group-named-only-here", "takenAt"])
  expect(stoplightsCounted(content)).toBe(1)
})

test("two readings taken at different moments say the same thing", () => {
  const groups = grouped(
    [{ habit: "sleep", tier: "red" }],
    [{ inbox: "email", tier: "blue" }],
    [{ attribute: "strength", tier: "green" }]
  )
  expect(readingSaid(contentOf(groups, "2026-09-19T17:00:00Z"))).toBe(
    readingSaid(contentOf(groups, "2026-09-19T18:00:00Z"))
  )
})

test("a color that moved says something else", () => {
  const before = contentOf(
    grouped([{ habit: "sleep", tier: "red" }], [], []),
    "2026-09-19T17:00:00Z"
  )
  const after = contentOf(
    grouped([{ habit: "sleep", tier: "green" }], [], []),
    "2026-09-19T17:00:00Z"
  )
  expect(readingSaid(before)).not.toBe(readingSaid(after))
})

test("a group's rows are read under the name handed in rather than under a name kept here", () => {
  const content = contentOf(
    [{ slug: "upkeep", rows: [{ ring: "sleep", tier: "red" }], wireKeyName: "ring" }],
    "2026-09-19T17:00:00Z"
  )
  expect(stoplightsOf(content, "upkeep")[0]?.key).toBe("sleep")
})
