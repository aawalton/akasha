import type { Module } from "@akasha/code/module"

export const supervisorResumeNotices = {
  id: "01a06876-abda-700c-8461-69cbc0108d87",
  pageTypeSlug: "module",
  slug: "supervisor-resume-notices",
  definition: "the notices a resumed seat is handed, read off its prefix lines",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The notices are composed by the compose module rather than in here.",
    },
    {
      invariantKind: "departure",
      statement: "The compose module is imported from beside this module and its function called.",
    },
    {
      invariantKind: "departure",
      statement:
        "A compose that fails in any way hands back a notice saying so rather than a throw.",
    },
  ],
} as const satisfies Module
