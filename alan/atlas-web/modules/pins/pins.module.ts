import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pins = {
  id: "01a06582-6b30-7e6b-ba22-c1e3bc1b2900",
  type: "page-type/module",
  slug: "pins",
  definition: "a location page taken as a pin on a map",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A location with no title is named by its slug.",
    },
  ],
  createdAt: "2026-09-03T04:24:01.072Z",
  updatedAt: "2026-09-27T12:28:10.000Z",
} as const satisfies Module
