import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverGuard = {
  id: "01a0bca8-7743-7c0d-a613-8746eafadeb9",
  type: "page-type/module",
  slug: "handover-guard",
  definition: "how code chooses the requests to a website that go to a handover",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader is known by the handover cookie alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An open path is named by a pattern over the whole path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stranger off an open path is sent to the site's sign-in with the path asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader at a sign-in path is sent on to the path asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path asked for is followed only where it is the site's own or a named host's.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sets a cookie.",
    },
  ],
  createdAt: "2026-09-20T02:32:32.323Z",
  updatedAt: "2026-10-30T15:48:58.492Z",
} as const satisfies Module
