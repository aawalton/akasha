import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const packageManifest = {
  id: "01a05ae4-fc70-7000-89a5-77bf2b9786ae",
  type: "module",
  slug: "package-manifest",
  definition: "the name a package is reached by and the file each way in lands on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest is read from its own text and nothing else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest that will not parse names no way in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest calling its package nothing names no way in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a manifest calls its package is answered apart from the ways in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not there calls its package nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A target that is no string names no way in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A target is resolved against the folder the manifest sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A key is reached by the package's name followed by that key past its opening dot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key that is a lone dot names the package itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest stating one string for its exports is read as stating a lone dot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key that is not a lone dot and opens with no dot names no way in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A specifier two manifests both name lands where the first of those manifests says.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether the file a way in names is there is not judged here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No specifier is resolved through `node_modules`.",
    },
  ],
} as const satisfies Module
