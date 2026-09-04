import type { Module } from "@akasha/code-system/module"

export const markdownAttachmentFile = {
  id: "01a06895-1cca-7000-89b3-1d9fa2df3d32",
  pageTypeSlug: "module",
  slug: "markdown-attachment-file",
  definition: "the file an attachment stands in, beside the markdown page that names it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An attachment file stands beside the page that names it rather than under a folder of its own.",
    },
    {
      invariantKind: "departure",
      statement: "An attachment written before it is committed carries `uncommitted` in its name.",
    },
  ],
} as const satisfies Module
