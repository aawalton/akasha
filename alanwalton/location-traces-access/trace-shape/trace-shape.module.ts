import type { Module } from "@akasha/code-system/module"

export const traceShape = {
  id: "01a05bc7-9129-700b-ba7b-804847cebb2b",
  pageTypeSlug: "module",
  slug: "trace-shape",
  definition: "what one recorded place carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trace states the phone it came from and the count that phone gave it.",
    },
    {
      invariantKind: "departure",
      statement: "Everything beyond the place and the moment is optional.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here stands at runtime.",
    },
  ],
} as const satisfies Module
