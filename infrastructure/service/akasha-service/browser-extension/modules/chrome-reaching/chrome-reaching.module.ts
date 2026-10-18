import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chromeReaching = {
  id: "01a15009-5d31-7e30-820c-0bdb7fd0e16c",
  type: "page-type/module",
  slug: "chrome-reaching",
  definition: "the part of what Chrome hands an extension that a browser extension here calls",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only what some extension here calls is spelled, so the rest of Chrome is unsaid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Code run where Chrome hands nothing over is refused rather than left to throw later.",
    },
  ],
  createdAt: "2026-10-18T17:22:33.392Z",
  updatedAt: "2026-10-18T17:22:33.392Z",
} as const satisfies Module
