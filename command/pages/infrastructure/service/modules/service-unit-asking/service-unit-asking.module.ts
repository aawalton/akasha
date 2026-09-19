import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceUnitAsking = {
  id: "01a09407-b94e-79c1-9cb4-324c7a7d0a3e",
  type: "page-type/module",
  slug: "service-unit-asking",
  definition: "systemd asked to act on one named service's installed unit",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit named is the one systemd was told to enable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scheduled service is reached by its timer and any other by its service unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A systemctl that refuses makes the call refuse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service page is found through the index rather than by the folder it sits in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here puts a service's units where systemd reads them.",
    },
  ],
} as const satisfies Module
