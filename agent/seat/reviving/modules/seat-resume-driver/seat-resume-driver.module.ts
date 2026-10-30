import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatResumeDriver = {
  id: "01a0686d-9d5e-7016-8168-21e6a3ddfd3a",
  type: "page-type/module",
  slug: "seat-resume-driver",
  definition: "the things that start work in a seat that was restarted",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A resuming seat is driven by exactly one of these five things.",
    },
  ],
  createdAt: "2026-09-03T18:00:09.310Z",
  updatedAt: "2026-10-30T14:45:23.284Z",
} as const satisfies Module
