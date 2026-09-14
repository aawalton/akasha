import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const overTools = {
  id: "01a04e0a-f8fd-794e-bc2d-4463964ebf9f",
  type: "text-property",
  slug: "over-tools",
  propertySlug: "over-tools",
  definition: "the tools whose calls a hook judges",
  maxLength: 60,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook at a tool call states its tools.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hook is handed the calls of the tools that hook states here and no other calls.",
    },
    {
      invariantKind: "departure",
      statement: "A tool's name is the harness's own.",
    },
    {
      invariantKind: "absence",
      statement: "Akasha lists no tool names.",
    },
    {
      invariantKind: "absence",
      statement: "A tool name is no pattern.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
