import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const extensionCarrying = {
  id: "01a09147-a806-78c9-8f27-bf82ebbd41f2",
  type: "module",
  slug: "extension-carrying",
  definition: "the files beside a page a property names by the extension they close with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file closes with an extension where the name after its last dot is that extension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file is named by such a property where a page carrying that property sits in the file's folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file in a folder beneath that page is named by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name with no dot closes with no extension.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every kind under a named extension property is read here rather than that one kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which extension properties are meant is the caller's to say.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What a face says about every extension property is worked out once for that face.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether a page states the value is not answered here.",
    },
  ],
} as const satisfies Module
