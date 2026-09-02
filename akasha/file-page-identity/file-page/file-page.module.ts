import type { Module } from "../../code-system/modules/module.page-type.ts"

export const filePage = {
  id: "01a05c69-e870-7593-9000-9a0009b4eeae",
  pageTypeSlug: "module",
  slug: "file-page",
  definition: "the id and slug a file's page carries, worked out from where the file stands",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stated id or slug is kept rather than worked out.",
    },
    {
      invariantKind: "departure",
      statement: "An id worked out from where a file stands is a uuid version 5 over that address.",
    },
    {
      invariantKind: "departure",
      statement: "Only a markdown file's address yields a slug.",
    },
    {
      invariantKind: "departure",
      statement: "A file's stem is what stands before its first dot.",
    },
  ],
} as const satisfies Module
