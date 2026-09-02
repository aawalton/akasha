import type { Module } from "@akasha/code-system/module"

export const zoneNamesFr02 = {
  id: "01a061e7-9315-72bc-ad9c-4f41ed8ec7f2",
  pageTypeSlug: "module",
  slug: "zone-names-fr-02",
  definition: "part 02 of every zone's name in fr",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
