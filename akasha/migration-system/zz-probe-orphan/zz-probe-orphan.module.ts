import type { Module } from "@akasha/code-system/module"

export const zzProbeOrphan = {
  id: "01a06970-e254-7419-9012-0be2642f5bbd",
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
