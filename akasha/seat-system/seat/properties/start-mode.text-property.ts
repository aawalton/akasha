import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type StartMode = string

export const startMode = {
  id: "01a05035-2609-79ad-86f0-f474390c311e",
  pageTypeSlug: "text-property",
  slug: "start-mode",
  definition: "how an agent in a seat is started",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "This holds text because the modes a seat can start in do not stand as pages.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a start mode.",
    },
  ],
} as const satisfies TextProperty
