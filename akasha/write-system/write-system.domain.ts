import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const writeSystem = {
  id: "01a04a20-6e05-7170-aace-9af4ddceceb3",
  pageTypeSlug: "domain",
  slug: "write-system",
  definition: "how a change reaches disk",
  partSlugs: [
    "corpus",
    "reading",
    "landing",
    "relation-resolves",
    "witness-not-asserted",
  ],
  design: [
    "Nothing reaches disk but by a witness, and a witness is not obtained without the read it stands for.",
    "No function in the write path takes a body, so there is no layer beneath the door to enter.",
  ],
} as const satisfies Domain
