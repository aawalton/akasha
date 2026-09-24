import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const unbound = {
  id: "01a08ca8-6bf9-7831-8200-c579ad49fb3c",
  type: "page-type/text-property",
  slug: "unbound",
  propertySlug: "unbound",
  definition: "a host name a service states without listening",
  maxLength: 253,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service publishes here each host name the service states and could not bind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service listening on every host name the service states publishes nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host name here is published by the service itself rather than by a watcher.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host name here is a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host name here is no better than the last start of that service.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
