import type { Page } from "../../pages/page.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Attempt } from "./properties/attempt.number-property.ts"
import type { Derivation } from "./properties/derivation.file-property.ts"
import type { ProofStatus } from "./properties/proof-status.select-property.ts"
import type { Proves } from "./properties/proves.relation-property.ts"

export type Proof = Page & {
  title: Title
  proves: Proves
  proofStatus: ProofStatus
  attempt: Attempt
  derivation?: Derivation
}
