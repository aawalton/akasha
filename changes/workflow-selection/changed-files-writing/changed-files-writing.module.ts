import type { Module } from "@akasha/code-system/module"

export const changedFilesWriting = {
  id: "01a068e0-6ae3-7cf9-9998-5420510e1e54",
  pageTypeSlug: "module",
  slug: "changed-files-writing",
  definition: "the files a pipeline is for, written out as a manifest the checks read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The manifest is written inside a cluster container rather than on the workstation.",
    },
    {
      invariantKind: "departure",
      statement: "The pipeline page is asked of the pages service rather than of a checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A key the pipeline page type does not declare is refused by the service.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming no file is refused rather than written.",
    },
  ],
} as const satisfies Module
