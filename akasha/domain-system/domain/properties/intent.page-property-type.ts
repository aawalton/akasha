import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"
import type { IntentKind } from "./invariant-kind.page-property-type.ts"

export type Intent = List<Invariant<IntentKind>>

export const intent = {
  id: "01a049c8-3ead-7629-a666-114abcd4574a",
  pageTypeSlug: "page-property-type",
  slug: "intent",
  definition: "an invariant that does not hold yet",
  extendsSlug: "page-property-type/invariant",
  kind: "list",
  entrySlug: "invariant",
  max: null,
  design: [
    {
      invariantKind: "departure",
      statement:
        "An intent entry names a state the domain should be in, never an act to take or a reason for it.",
    },
  ],
} as const satisfies PagePropertyType
