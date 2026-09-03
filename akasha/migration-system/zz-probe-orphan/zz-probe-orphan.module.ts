import type { Module } from "@akasha/code-system/module"

export const zzProbeOrphan = {
  id: "01a06953-02f3-73c4-b67c-b3d073557777",
  pageTypeSlug: "module",
  slug: "zz-probe-orphan",
  definition: "a seeded probe page standing under no parent, landed to prove a road refuses it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This page is taken away as soon as the probe answers.",
    },
  ],
} as const satisfies Module
