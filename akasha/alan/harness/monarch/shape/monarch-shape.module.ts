import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchShape = {
  id: "01a0685e-b336-7d88-9086-315cf91fb141",
  pageTypeSlug: "module",
  slug: "monarch-shape",
  definition: "the reader saying what an untyped value is, refusing it by the path it stands at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value that is not what was asked for is refused rather than coerced.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the path the value stands at, so a deep reply says where it went wrong.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal says what was wanted and what stood there rather than printing the value.",
    },
    {
      invariantKind: "departure",
      statement: "Null and an array are told apart from an object rather than counted as one.",
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
      statement: "Nothing here knows what Monarch's replies hold.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network or a file.",
    },
  ],
} as const satisfies Module
