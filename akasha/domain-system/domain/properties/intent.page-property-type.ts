import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"

export type Intent = Invariant

export const intent = {
  id: "01a049c8-3ead-7629-a666-114abcd4574a",
  pageTypeSlug: "page-property-type",
  slug: "intent",
  definition: "an invariant that does not hold yet",
  extendsSlug: "invariant",
  kind: "list",
  entrySlug: "statement",
  max: null,
  design: [
    "An intent entry names a state the domain should be in, never an act to take or a reason for it.",
  ],
  rule: [
    {
      name: "Resolve When Found",
      act: "Move or delete an intent entry as soon as you find it true, not when the work on it closes.",
      warrant: "Nothing re-reads an entry, so one that came true and stayed sends someone at a gap already shut.",
      aids: [
        "Check the whole claim, not just the case you met.",
        "Resolve the entry you found, not the section.",
      ],
    },
  ],
} as const satisfies PagePropertyType
