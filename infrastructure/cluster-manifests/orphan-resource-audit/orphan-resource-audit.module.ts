import type { Module } from "@akasha/code-system/module"

export const orphanResourceAudit = {
  id: "01a0686c-fd2c-7005-95f0-9e6b3cfb16bd",
  pageTypeSlug: "module",
  slug: "orphan-resource-audit",
  definition: "the live resources a deploy manages that no synth source accounts for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A checkout holding no synth source at all is refused, since every live resource would then read as an orphan.",
    },
    {
      invariantKind: "departure",
      statement:
        "A synth source that will not synthesise ends the sweep rather than being passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Only a resource a deploy says it manages can be an orphan.",
    },
    {
      invariantKind: "departure",
      statement: "A resource is known by its kind, its namespace and its name together.",
    },
  ],
} as const satisfies Module
