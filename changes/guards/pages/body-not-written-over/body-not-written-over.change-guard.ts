import type { ChangeGuard } from "../../change-guard.page-type.ts"

export const bodyNotWrittenOver = {
  id: "01a0795f-07b6-7283-82d6-21b6dd9fc91b",
  pageTypeSlug: "change-guard",
  slug: "body-not-written-over",
  changeTargetTypeSlug: "change-target-type/file",
  definition:
    "the guard refusing an answer that writes a body at a path another body already holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body a path held is read from the world the change read before answering.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding a body before the change refuses the answer writing there.",
    },
    {
      invariantKind: "departure",
      statement: "A path an earlier answer took away holds no body.",
    },
    {
      invariantKind: "departure",
      statement: "An edit taking its path away is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An edit that moves a file is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
} as const satisfies ChangeGuard
