import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ErrorFingerprint = string

export const errorFingerprint = {
  id: "01a05f3f-e3e0-7721-9fec-e8292e22a4da",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "error-fingerprint",
  propertySlug: "fingerprint",
  definition: "the hash telling one error apart from another",
  maxLength: 16,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fingerprint is taken over an error's normalized stack and message and app.",
    },
    {
      invariantKind: "departure",
      statement: "Two reports hashing alike are one error.",
    },
    {
      invariantKind: "departure",
      statement: "A fingerprint is written as lower hexadecimal.",
    },
    {
      invariantKind: "absence",
      statement: "A fingerprint is never a page's whole slug.",
    },
  ],
} as const satisfies TextProperty
