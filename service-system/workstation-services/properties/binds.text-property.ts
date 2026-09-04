import type { TextProperty } from "@akasha/pages-system/text-property"

export type Binds = string

export const binds = {
  id: "01a05ae5-d9a7-703f-8841-aee7eb78244d",
  pageTypeSlug: "text-property",
  slug: "binds",
  propertySlug: "binds",
  definition: "a host name a service listens on",
  max: 253,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service listening states every host name the service answers on.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating no host name is reached at the loopback address alone.",
    },
    {
      invariantKind: "departure",
      statement: "A name standing here is resolved when the service starts.",
    },
    {
      invariantKind: "departure",
      statement:
        "An address handed out by something that may hand out another address is written here as its name.",
    },
  ],
} as const satisfies TextProperty
