import type { Attempt } from "akasha/alan/value/learn/mathematics/proof/properties/attempt.number-property.types.ts"
import type { Derivation } from "akasha/alan/value/learn/mathematics/proof/properties/derivation.file-property.types.ts"
import type { ProofStatus } from "akasha/alan/value/learn/mathematics/proof/properties/proof-status.select-property.types.ts"
import type { Proves } from "akasha/alan/value/learn/mathematics/proof/properties/proves.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Proof = Page & {
  title: Title
  proves: Proves
  proofStatus: ProofStatus
  attempt: Attempt
  derivation?: Derivation
}
