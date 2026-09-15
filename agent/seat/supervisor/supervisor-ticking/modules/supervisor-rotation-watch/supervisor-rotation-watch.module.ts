import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRotationWatch = {
  id: "01a06876-abda-700d-b81b-ac084fa897cb",
  type: "module",
  slug: "supervisor-rotation-watch",
  definition: "watching a seat's session roll over",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An index part way through a refresh leaves the rotation unread rather than unwatched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait on such an index is said once as it opens rather than on every ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait running past its ceiling gives that round up and says it gave up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The next ask is scheduled whether or not saying the last one worked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A throw that is no refresh is said each time it is thrown.",
    },
  ],
} as const satisfies Module
