import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetKinding = {
  id: "01a08251-3c27-7aaa-b035-a2345ee394a0",
  type: "module",
  slug: "target-kinding",
  definition: "the change target subtype a path is under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under a page name is read as that page's own kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a path is a page at all is answered here beside which kind that path is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller wanting only that answer takes it here rather than naming the kinds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under a `page-type` name is a page type before that path is a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under a page property name is a page property before that path is a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other TypeScript path is code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other path is a file and nothing narrower.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The kind answered is the slug of the change target subtype naming that path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here picks the change reached for a kind.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
