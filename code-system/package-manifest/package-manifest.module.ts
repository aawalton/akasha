import type { Module } from "../modules/module.page-type.ts"

export const packageManifest = {
  id: "01a05ae4-fc70-7000-89a5-77bf2b9786ae",
  pageTypeSlug: "module",
  slug: "package-manifest",
  definition: "the name a package is reached by and the file each way in lands on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A manifest is read from its own text and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that will not parse names no way in.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest calling its package nothing names no way in.",
    },
    {
      invariantKind: "departure",
      statement: "A target that is no string names no way in.",
    },
    {
      invariantKind: "departure",
      statement: "A target is resolved against the folder the manifest stands in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key is reached by the package's name followed by that key past its opening dot.",
    },
    {
      invariantKind: "departure",
      statement: "A key that is a lone dot names the package itself.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating one string for its exports is read as stating a lone dot.",
    },
    {
      invariantKind: "departure",
      statement: "A key that is not a lone dot and opens with no dot names no way in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier two manifests both name lands where the first of those manifests says.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Whether the file a way in names stands is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "No specifier is resolved through `node_modules`.",
    },
  ],
} as const satisfies Module
