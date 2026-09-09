import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const attributesTotalling = {
  id: "01a07899-c5db-720d-b555-089ffd6bae07",
  pageTypeSlug: "module",
  type: "module",
  slug: "attributes-totalling",
  definition: "the points each attribute has earned since the day the counting begins",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Every attribute is counted from 2026-09-06 and from no day earlier.",
    },
    {
      invariantKind: "departure",
      statement: "A counted day is a tracked day falling on or after the day the counting begins.",
    },
    {
      invariantKind: "departure",
      statement: "A total is the sum of an attribute's points over the counted days.",
    },
    {
      invariantKind: "departure",
      statement: "A day before the day the counting begins is left out of every total.",
    },
    {
      invariantKind: "departure",
      statement: "A total may be asked for the days short of a day the caller names.",
    },
    {
      invariantKind: "departure",
      statement: "The day named is itself left out.",
    },
    {
      invariantKind: "departure",
      statement: "A total naming no day counts every counted day.",
    },
    {
      invariantKind: "departure",
      statement: "A date is compared as text rather than as a date.",
    },
    {
      invariantKind: "departure",
      statement: "A day's points are worked out by the code beside that attribute's page.",
    },
    {
      invariantKind: "departure",
      statement: "The days are read in one ask.",
    },
    {
      invariantKind: "departure",
      statement: "The days are summed oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "A day with nothing an attribute counts adds nothing to that attribute.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute no day has a figure for is an absent total.",
    },
    {
      invariantKind: "departure",
      statement: "The plants are counted over the span the counted days cover.",
    },
    {
      invariantKind: "departure",
      statement: "The span opens where the first counted day opens.",
    },
    {
      invariantKind: "departure",
      statement: "The span closes where the last counted day closes.",
    },
    {
      invariantKind: "departure",
      statement: "A span reaching no counted day at all leaves the plants unread rather than zero.",
    },
    {
      invariantKind: "departure",
      statement: "The days that cannot be read leave every attribute unread rather than zero.",
    },
    {
      invariantKind: "absence",
      statement: "No total is kept beside a readout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a total into a color.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
