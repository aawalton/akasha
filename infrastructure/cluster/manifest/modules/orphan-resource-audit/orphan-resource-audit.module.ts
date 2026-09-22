import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orphanResourceAudit = {
  id: "01a0686c-fd2c-7005-95f0-9e6b3cfb16bd",
  type: "page-type/module",
  slug: "orphan-resource-audit",
  definition: "the live resources a deploy manages that no synth source names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout with no synth source at all is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A synth source that will not synthesise ends the sweep rather than being passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a resource a deploy says that deploy manages can be an orphan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource is known by its kind and its namespace and its name together.",
    },
  ],
} as const satisfies Module
