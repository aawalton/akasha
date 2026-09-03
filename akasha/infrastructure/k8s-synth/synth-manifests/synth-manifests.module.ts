import type { Module } from "@akasha/code-system/module"

export const synthManifests = {
  id: "01a06810-0b68-7695-97a7-2d2f26274a9e",
  pageTypeSlug: "module",
  slug: "synth-manifests",
  definition: "every generated manifest in a checkout written or checked against its synth",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout root is the folder the lockfile stands in.",
    },
    {
      invariantKind: "departure",
      statement: "A pass either writes or checks rather than doing both.",
    },
  ],
} as const satisfies Module
