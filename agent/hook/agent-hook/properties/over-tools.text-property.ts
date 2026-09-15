import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const overTools = {
  id: "01a04e0a-f8fd-794e-bc2d-4463964ebf9f",
  type: "page-type/text-property",
  slug: "over-tools",
  propertySlug: "over-tools",
  definition: "the tools whose calls a hook judges",
  maxLength: 60,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook at a tool call states its tools.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A hook is handed the calls of the tools that hook states here and no other calls.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tool's name is the harness's own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Akasha lists no tool names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A tool name is no pattern.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
