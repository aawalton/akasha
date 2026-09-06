import type { Module } from "@akasha/code/module"

export const fileAnswering = {
  id: "01a0784a-085f-7c1d-aec3-7e04a398f007",
  pageTypeSlug: "module",
  slug: "file-answering",
  definition: "the bytes a page keeps under one file property",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file is named by the page holding that file.",
    },
    {
      invariantKind: "departure",
      statement: "A file is named by the key its page holds that file under.",
    },
    {
      invariantKind: "absence",
      statement: "No caller names a path.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type carries no property for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming a property that keeps no file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A property held secret is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A property held outside the commit is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A slug sitting at more than one path is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes are answered as the bytes on disk rather than decoded.",
    },
    {
      invariantKind: "departure",
      statement: "The path the bytes came from is answered beside the bytes.",
    },
    {
      invariantKind: "constraint",
      statement: "The bytes on disk are read rather than the bytes the commit holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here listens.",
    },
  ],
} as const satisfies Module
