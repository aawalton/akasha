import type { Module } from "@akasha/code-system/module"

export const pushEvent = {
  id: "01a06816-2f11-7261-bb1b-dbb58f9c4476",
  pageTypeSlug: "module",
  slug: "push-event",
  definition: "what a repository says it took, answered to whoever hooked the repository",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A payload that is no push event is refused as a bad request.",
    },
    {
      invariantKind: "departure",
      statement: "An update to anything but a branch is taken and passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A branch deleted is taken and passed over.",
    },
    {
      invariantKind: "departure",
      statement: "What was passed over is answered as passed over rather than as taken.",
    },
  ],
} as const satisfies Module
