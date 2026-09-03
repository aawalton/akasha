import type { Module } from "@akasha/code-system/module"

export const supervisorResumeNotices = {
  id: "01a06876-abda-700c-8461-69cbc0108d87",
  pageTypeSlug: "module",
  slug: "supervisor-resume-notices",
  definition: "the notices a resumed seat is handed, read off its prefix lines",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The notices are composed by a child, killed at a ceiling, rather than in here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The compose module is reached beside this one rather than by a path from the root.",
    },
    {
      invariantKind: "departure",
      statement: "A compose that fails any way at all hands back a notice saying so, not a throw.",
    },
  ],
} as const satisfies Module
