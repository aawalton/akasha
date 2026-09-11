import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const hostnames = {
  id: "01a05b26-f8b6-7019-9588-3230dc4b1044",
  type: "text-property",
  slug: "hostnames",
  propertySlug: "hostnames",
  definition: "a host name a web app is reached at",
  maxLength: 253,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name here is reached from outside the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "A web app states every name reaching the workload the web app runs as.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
