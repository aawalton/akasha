import type { Module } from "@akasha/code-system/module"

export const pageFileParts = {
  id: "01a0610b-6431-783b-94f0-006f071dfd63",
  pageTypeSlug: "module",
  slug: "page-file-parts",
  definition: "the ordered files one property of a page is held in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property's files are numbered from the first.",
    },
    {
      invariantKind: "departure",
      statement: "The first of a property's files is the name that property would carry alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every file after the first carries a part section.",
    },
    {
      invariantKind: "departure",
      statement: "A part section follows the property slug and precedes `uncommitted`.",
    },
    {
      invariantKind: "departure",
      statement: "What `partAt` puts together `heldIn` takes apart again.",
    },
    {
      invariantKind: "departure",
      statement: "The files of one property are named in order from the first.",
    },
    {
      invariantKind: "departure",
      statement: "The files of a property held uncommitted are named in that same order.",
    },
    {
      invariantKind: "departure",
      statement: "Naming stops at the first file that is not there.",
    },
    {
      invariantKind: "departure",
      statement: "A gap leaves the files past the gap unnamed.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a file is there is answered by the caller rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index or the disk.",
    },
  ],
} as const satisfies Module
