import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchShape = {
  id: "01a0685f-4ed8-7f56-8b0b-c5eb38474e06",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-shape",
  definition: "the reader saying what an untyped value is, refusing it by the path it stands at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value that does not match the shape asked for is refused rather than coerced.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the path the value sits at.",
    },
    {
      invariantKind: "departure",
      statement: "A deep reply says where that reply went wrong.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal says the shape wanted and the shape that stood there rather than printing the value.",
    },
    {
      invariantKind: "departure",
      statement:
        "Null and an array are told apart from an object rather than counted as an object.",
    },
    {
      invariantKind: "departure",
      statement: "A number that is not finite is no number.",
    },
    {
      invariantKind: "departure",
      statement: "An absent value and a null value are the same absence to an optional read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows the fields Monarch's replies hold.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network or a file.",
    },
  ],
} as const satisfies Module
