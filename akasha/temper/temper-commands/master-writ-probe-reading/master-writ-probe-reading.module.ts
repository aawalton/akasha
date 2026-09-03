import type { Module } from "@akasha/code-system/module"

export const masterWritProbeReading = {
  id: "01a06864-aa2b-7004-b089-84cb8530cec4",
  pageTypeSlug: "module",
  slug: "master-writ-probe-reading",
  definition: "the probe the inventory addon records for the master writs it holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The probe is ruled on whole, so an unknown field refuses the read.",
    },
  ],
} as const satisfies Module
