import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileAppending = {
  id: "01a09279-a78b-7751-be07-d9dfc607cbc3",
  type: "module",
  slug: "file-appending",
  definition: "whether the file at a path is only ever added to at its end",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether the file at a path is only added to at its end is one question asked here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file property says that of every file that property has rather than of one file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property naming no file says it of each file the property's section names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property naming a file says it of that file beside a page carrying the property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a face says over every file property is worked out once for that face.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A face built again works it out again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page body is read.",
    },
  ],
} as const satisfies Module
