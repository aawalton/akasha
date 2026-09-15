import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const binds = {
  id: "01a05ae5-d9a7-703f-8841-aee7eb78244d",
  type: "text-property",
  slug: "binds",
  propertySlug: "binds",
  definition: "a host name a service listens on",
  maxLength: 253,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service listening states every host name the service answers on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service stating no host name is reached at the loopback address alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name here is resolved when the service starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An address handed out by something that may hand out another address is written here as its name.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
