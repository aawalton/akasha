import type { ChangeGuard } from "akasha/change/guard/change-guard.page-type.types.ts"

export const relationNotLeftHanging = {
  id: "01a07750-f2bc-7b43-a336-b879db98da45",
  type: "change-guard",
  slug: "relation-not-left-hanging",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer that takes a page away another page still names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page an answer takes away is found by path in the world before the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The index the answer leaves names no page the answer takes away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages naming the page taken away are read from the world before the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether that name still reaches a page is read from the index the answer leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming the page taken away after the change has a hanging reference.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hanging reference refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mortal page naming the page taken away is not refused for naming that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name for the page taken away is not refused where that page's type is mortal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Either exemption applies on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Neither exemption waits on the other exemption.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a path the naming grammar reads as a page is judged here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the working tree or the index on disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the answer rewrites is named by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`relation-reaches-a-page` judges the name such a page holds.",
    },
  ],
} as const satisfies ChangeGuard
