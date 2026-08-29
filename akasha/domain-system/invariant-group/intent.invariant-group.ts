import type { InvariantGroup } from "./invariant-group.page-type.ts"

export const intent = {
  id: "01a04e11-9f98-71e8-b821-77545c6be68e",
  pageTypeSlug: "invariant-group",
  slug: "intent",
  definition: "an invariant that does not hold yet",
  rules: [
    {
      name: "Resolve When Found",
      act: "Move or delete an intent entry as soon as you find it true, not when the work on it closes.",
      warrant:
        "Nothing re-reads an entry, so one that came true and stayed sends someone at a gap already shut.",
      aids: [
        "Check the whole claim, not just the case you met.",
        "Resolve the entry you found, not the section.",
      ],
    },
  ],
} as const satisfies InvariantGroup
