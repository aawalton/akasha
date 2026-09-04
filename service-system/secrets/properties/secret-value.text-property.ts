import type { TextProperty } from "@akasha/pages-system/text-property"

export type SecretValue = string

export const secretValue = {
  id: "01a0684a-7d55-7002-8c14-3f7a2b5d9e08",
  pageTypeSlug: "text-property",
  slug: "secret-value",
  propertySlug: "value",
  definition: "the secret a page stands for",
  max: 100000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The value is read from the sops file rather than from the page's own file.",
    },
  ],
} as const satisfies TextProperty
