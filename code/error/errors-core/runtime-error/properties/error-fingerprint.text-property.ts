import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const errorFingerprint = {
  id: "01a05f3f-e3e0-7721-9fec-e8292e22a4da",
  type: "page-type/text-property",
  slug: "error-fingerprint",
  propertySlug: "fingerprint",
  definition: "the hash telling one error apart from another",
  maxLength: 16,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fingerprint is taken over an error's normalized stack and message and app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two reports hashing alike are one error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fingerprint is written as lower hexadecimal.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A fingerprint is never a page's whole slug.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
