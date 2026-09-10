import type { ChangeGuard } from "../../change-guard.page-type.types.ts"

export const relationNotLeftHanging = {
  id: "01a07750-f2bc-7b43-a336-b879db98da45",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "relation-not-left-hanging",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer that takes a page away another page still names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page an answer takes away is found by path in the world before the change.",
    },
    {
      invariantKind: "departure",
      statement: "The index the answer leaves names no page the answer takes away.",
    },
    {
      invariantKind: "departure",
      statement: "The pages naming the page taken away are read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming the page taken away after the change has a hanging reference.",
    },
    {
      invariantKind: "departure",
      statement: "A hanging reference refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A mortal page naming the page taken away is not refused for naming that page.",
    },
    {
      invariantKind: "departure",
      statement: "A name for the page taken away is not refused where that page's type is mortal.",
    },
    {
      invariantKind: "departure",
      statement: "Either exemption applies on its own.",
    },
    {
      invariantKind: "departure",
      statement: "Neither exemption waits on the other exemption.",
    },
    {
      invariantKind: "departure",
      statement: "Only a path the naming grammar reads as a page is judged here.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the working tree or the index on disk.",
    },
    {
      invariantKind: "gap",
      statement: "A page the change rewrites files no edge to the page taken away.",
    },
    {
      invariantKind: "gap",
      statement: "A name held by such a page is found by no guard here.",
    },
    {
      invariantKind: "gap",
      statement: "`relation-resolves` judges the name this guard cannot see.",
    },
  ],
} as const satisfies ChangeGuard
