import type { Module } from "@akasha/code-system/module"

export const rooting = {
  id: "01a04f5a-6229-7bed-be21-ddab3550449e",
  pageTypeSlug: "module",
  slug: "rooting",
  definition: "the akasha checkout a file is in, found by walking up to its domain page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The root is the nearest folder at or above a path holding the akasha domain page.",
    },
    {
      invariantKind: "departure",
      statement: "A root is found on the disk rather than read off the spelling of a path.",
    },
    {
      invariantKind: "departure",
      statement: "A folder's name says nothing about whether that folder is a root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path outside every `akasha` folder is refused rather than answered with a wrong root.",
    },
    {
      invariantKind: "departure",
      statement: "The name of the file marking a root is said here alone.",
    },
  ],
} as const satisfies Module
