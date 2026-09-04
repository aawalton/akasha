import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"
import type { Attempt } from "./properties/attempt.number-property.ts"
import type { Derivation } from "./properties/derivation.file-property.ts"
import type { ProofStatus } from "./properties/proof-status.select-property.ts"
import type { ProvesSlug } from "./properties/proves-slug.relation-property.ts"

export type Proof = Page & {
  title: Title
  provesSlug: ProvesSlug
  proofStatus: ProofStatus
  attempt: Attempt
  derivation?: Derivation
}

export const proof = {
  id: "01a0657f-5da8-7d50-9da8-5ad4177c9541",
  pageTypeSlug: "page-type",
  slug: "proof",
  definition: "one attempt at deriving a proposition in the formal system",
  pluralSlug: "proofs",
  extendsSlug: "page-type/page",
  partSlugs: [
    "file-property/derivation",
    "number-property/attempt",
    "relation-property/proves-slug",
    "select-property/proof-status",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "proves-slug", required: true, many: false },
    { pagePropertySlug: "proof-status", required: true, many: false },
    { pagePropertySlug: "attempt", required: true, many: false },
    { pagePropertySlug: "derivation", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A proof names the proposition the proof attempts.",
    },
    {
      invariantKind: "departure",
      statement: "A second attempt at one proposition is a second proof rather than an edit.",
    },
    {
      invariantKind: "departure",
      statement: "A proof's derivation is in a file of the derivation's own.",
    },
    {
      invariantKind: "departure",
      statement: "A derivation justifies every line the derivation numbers.",
    },
  ],
} as const satisfies PageType
