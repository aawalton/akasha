import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const storePageAsking = {
  id: "01a05aec-eaaa-78d0-9e24-94f935464bf0",
  type: "module",
  slug: "store-page-asking",
  definition:
    "one page, a page type's shape, the roster, and what names a page, each off composed queries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page is read as a composed query narrowed to its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page the store does not have is answered absent rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page is answered with no relation resolved.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's shape is built from the page type's own page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration takes the details that declaration says from the property page the page type names.",
    },
    {
      invariantKind: "departure",
      statement: "The roster names no repository and no glob.",
    },
    {
      invariantKind: "departure",
      statement: "The pages naming a page are found by asking each page type in turn.",
    },

    {
      invariantKind: "departure",
      statement: "A live ask names a page address this repository does not move.",
    },
    {
      invariantKind: "constraint",
      statement: "A live ask answers slower than a test's own ceiling where the machine is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "Every live ask here waits longer than a test asking the store nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has an answer for a later question.",
    },
  ],
} as const satisfies Module
