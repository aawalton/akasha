import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const persistMedia = {
  id: "01a0685d-4b35-7011-b5f2-eee71f6ba3fd",
  type: "page-type/module",
  slug: "persist-media",
  definition: "whether what a run made is kept as a page of its own",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller that says not to persist is obeyed whatever the operation was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation no kind of media names is not kept.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands a page or places bytes.",
    },
  ],
  createdAt: "2026-09-03T17:42:19.701Z",
  updatedAt: "2026-09-21T23:23:42.000Z",
} as const satisfies Module
