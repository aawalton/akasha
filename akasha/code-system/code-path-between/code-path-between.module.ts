import type { Module } from "../modules/module.page-type.ts"

export const codePathBetween = {
  id: "01a06558-3a62-7fa9-90c6-0d6dc35875f0",
  pageTypeSlug: "module",
  slug: "code-path-between",
  definition:
    "the folder a path sits in, the way from one folder to a path, and where a href lands",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A way from one folder to a path keeps the last segment of that path whole.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is answered as the path up to its last separator.",
    },
    {
      invariantKind: "departure",
      statement:
        "A href is read to the path the href names without any anchor and without any query.",
    },
    {
      invariantKind: "absence",
      statement: "A href carrying a scheme names no path in this tree.",
    },
    {
      invariantKind: "absence",
      statement: "A href that is one brace-wrapped slot names no path in this tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "A href spelled from the root lands at that root path rather than beneath the host.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
