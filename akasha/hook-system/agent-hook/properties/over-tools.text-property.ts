import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ToolName = string

export type OverTools = List<ToolName>

export const overTools = {
  id: "01a04e0a-f8fd-794e-bc2d-4463964ebf9f",
  pageTypeSlug: "text-property",
  slug: "over-tools",
  propertySlug: "over-tools",
  definition: "the tools whose calls a hook judges",
  max: 60,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook at a tool call states its tools.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is handed the calls of the tools it states here, and no others.",
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
} as const satisfies TextProperty
