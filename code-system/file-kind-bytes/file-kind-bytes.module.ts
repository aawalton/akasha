import type { Module } from "../modules/module.page-type.ts"

export const fileKindBytes = {
  id: "01a068ce-5a2d-7d3b-913a-1d239336818e",
  pageTypeSlug: "module",
  slug: "file-kind-bytes",
  definition: "whether the kind a file's name says it is holds bytes rather than text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every kind a name can say is answered here as bytes or as text.",
    },
    {
      invariantKind: "departure",
      statement: "A kind answered nowhere here is refused rather than read as text.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no kind at all is text, which its reader then proves or refuses.",
    },
    {
      invariantKind: "constraint",
      statement: "Where no kind at all is bytes the question is refused rather than answered no.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens the file the path names.",
    },
  ],
} as const satisfies Module
