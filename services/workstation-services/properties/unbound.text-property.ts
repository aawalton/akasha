import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Unbound = List<string>

export const unbound = {
  id: "01a08ca8-6bf9-7831-8200-c579ad49fb3c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "unbound",
  propertySlug: "unbound",
  definition: "a host name a service states and is not listening on",
  maxLength: 253,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service publishes here each host name it states and could not bind.",
    },
    {
      invariantKind: "departure",
      statement: "A service listening on every host name it states publishes nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A host name here is published by the service itself rather than by a watcher.",
    },
    {
      invariantKind: "departure",
      statement:
        "A host name here is a reading, and no better than the last start of that service.",
    },
  ],
} as const satisfies TextProperty
