import type { Attempt } from "akasha/mathematics/proofs/properties/attempt.number-property.types.ts"
import type { Derivation } from "akasha/mathematics/proofs/properties/derivation.file-property.types.ts"
import type { ProofStatus } from "akasha/mathematics/proofs/properties/proof-status.select-property.types.ts"
import type { Proves } from "akasha/mathematics/proofs/properties/proves.relation-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Proof = Page & {
  title: Title
  proves: Proves
  proofStatus: ProofStatus
  attempt: Attempt
  derivation?: Derivation
}
