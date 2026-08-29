import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { HarnessEvent } from "./harness-event.page-property-type.ts"

export type RunsAt = List<HarnessEvent>

export const runsAt = {
  id: "01a04e0a-f8fb-7beb-b0b8-ac268528b27e",
  pageTypeSlug: "page-property-type",
  slug: "runs-at",
  definition: "the harness events at which a hook is called",
  extendsSlug: null,
  kind: "list",
  entrySlug: "harness-event",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook states its harness events.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is registered at the events it states here.",
    },
  ],
} as const satisfies PagePropertyType
