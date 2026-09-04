import type { SelectProperty } from "@akasha/pages-system/select-property"

export const proofStatus = {
  id: "01a0657f-5da8-72f1-8408-a6f70813c9f3",
  pageTypeSlug: "select-property",
  slug: "proof-status",
  propertySlug: "proof-status",
  definition: "how far an attempt has been taken",
  values: ["draft", "complete", "abandoned"],
} as const satisfies SelectProperty

export type ProofStatus = (typeof proofStatus.values)[number]
