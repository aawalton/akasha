import type { Module } from "@akasha/code-system/module"

export const agentPageReading = {
  id: "01a069c8-313d-7000-a55f-c0982d79ea96",
  pageTypeSlug: "module",
  slug: "agent-page-reading",
  definition: "the akasha page a running agent has, answered only where the file is there",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row never names a page that is not there.",
    },
    {
      invariantKind: "departure",
      statement: "Every path answered here is opened at the moment of answering.",
    },
    {
      invariantKind: "departure",
      statement: "A page is made to declare the id it was found under.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is keyed off its page rather than off the page's file name.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent page short of its seat name or its agent id is left out.",
    },
  ],
} as const satisfies Module
