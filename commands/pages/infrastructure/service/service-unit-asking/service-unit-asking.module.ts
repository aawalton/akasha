import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceUnitAsking = {
  id: "01a09407-b94e-79c1-9cb4-324c7a7d0a3e",
  type: "module",
  slug: "service-unit-asking",
  definition: "systemd asked to act on one named service's installed unit",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit named is the one systemd was told to enable.",
    },
    {
      invariantKind: "departure",
      statement: "A scheduled service is reached by its timer and any other by its service unit.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run names the unit systemd would be asked about and asks nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that refuses makes the call refuse.",
    },
    {
      invariantKind: "departure",
      statement: "A service page is found through the index rather than by the folder it sits in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts a service's units where systemd reads them.",
    },
  ],
} as const satisfies Module
