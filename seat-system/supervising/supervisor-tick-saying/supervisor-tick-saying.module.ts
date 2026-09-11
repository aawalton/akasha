import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorTickSaying = {
  id: "01a08e28-7d11-7673-83b4-5b56092efa4c",
  pageTypeSlug: "module",
  slug: "supervisor-tick-saying",
  definition: "a monitor's line, said where the kind it reports turns rather than on every tick",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is said where its kind is not the kind said last.",
    },
    {
      invariantKind: "departure",
      statement: "A line whose kind is the kind said last is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A kind noted becomes the kind said last, whether or not its line was said.",
    },
    {
      invariantKind: "departure",
      statement: "A kind marked becomes the kind said last and says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A monitor handed no log says nothing and still remembers the kind.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a kind means or what a monitor watches.",
    },
  ],
} as const satisfies Module
