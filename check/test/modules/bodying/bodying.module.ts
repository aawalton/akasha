import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bodying = {
  id: "01a04ee7-be07-7a1b-9f3f-f5e6d4693e70",
  type: "module",
  slug: "bodying",
  definition: "the bytes, and the body at a path, that a test hands to what it tries",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test names the root once and is handed a way to make bodies under the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text and bytes are both taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check is handed bytes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test says text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test binds the way the test was handed rather than a function of its own.",
    },
  ],
} as const satisfies Module
