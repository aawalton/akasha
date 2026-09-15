import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageFileParts = {
  id: "01a0610b-6431-783b-94f0-006f071dfd63",
  type: "module",
  slug: "page-file-parts",
  definition: "the ordered files one property of a page is held in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property's files are numbered from the first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first of a property's files is the name that property would carry alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file after the first carries a part section.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "The name `partAt` puts together `heldIn` takes apart again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files of one property are named in order from the first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files of a property held uncommitted are named in that same order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Naming stops at the first file that is not there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gap leaves the files past the gap unnamed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a file is there is answered by the caller rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller reading a property's files is handed each file's body once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That caller answers what a file holds rather than whether that file is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is handed over as the file it was read from and that body together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file past the first that holds nothing stops the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first file holding nothing is passed over rather than stopping the reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index or the disk.",
    },
  ],
} as const satisfies Module
