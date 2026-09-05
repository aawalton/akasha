import type { Module } from "@akasha/code-system/module"

export const seatResumeDriver = {
  id: "01a0686d-9d5e-7016-8168-21e6a3ddfd3a",
  pageTypeSlug: "module",
  slug: "seat-resume-driver",
  definition: "the five things that put a resuming seat back to work",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A resuming seat is driven by exactly one of these five things and never by none.",
    },
  ],
} as const satisfies Module
