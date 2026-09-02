import type { Module } from "@akasha/code-system/module"

export const addonManifestFile = {
  id: "01a060e2-4d62-7a26-8c08-d2b7be0f14ff",
  pageTypeSlug: "module",
  slug: "addon-manifest-file",
  definition: "where in an addon's own folder the file the addon states itself in is found",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon folder outside akasha states itself in a file named `addon.json`.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha package states itself in the manifest file beside its own page.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding both spellings answers with `addon.json`.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding neither spelling answers that no addon is there.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding two manifests beside pages is thrown on.",
    },
  ],
} as const satisfies Module
