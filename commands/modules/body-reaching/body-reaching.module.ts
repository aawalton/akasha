import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const bodyReaching = {
  id: "01a08cb2-3e8c-7c67-8db7-8362dac6c149",
  type: "module",
  slug: "body-reaching",
  definition: "the bytes at a path, and the text those bytes are where they are text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Reaching a body tells a path nothing is at from a path that will not open.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not open is answered with why that body would not.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is no UTF-8 text is answered as no text rather than as bytes.",
    },
  ],
} as const satisfies Module
