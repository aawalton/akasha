import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { ToolName } from "./tool-name.page-property-type.ts"

export type OverTools = List<ToolName>

export const overTools = {
  id: "01a04e0a-f8fd-794e-bc2d-4463964ebf9f",
  pageTypeSlug: "page-property-type",
  slug: "over-tools",
  definition: "the tools whose calls a hook judges",
  extendsSlug: null,
  kind: "list",
  entrySlug: "tool-name",
  max: null,
  design: [
    {
      invariantKind: "departure",
      statement: "A hook states its tools.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is handed the calls of the tools it states here, and no others.",
    },
  ],
} as const satisfies PagePropertyType
