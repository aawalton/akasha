import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type ToolName = string

export const toolName = {
  id: "01a04e0a-f8fe-7f67-b630-e3b95d18c660",
  pageTypeSlug: "page-property-type",
  slug: "tool-name",
  definition: "what the harness calls one tool",
  extendsSlug: null,
  kind: "text",
  max: 60,
  nameFormatSlug: null,
  invariants: [
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
} as const satisfies PagePropertyType
