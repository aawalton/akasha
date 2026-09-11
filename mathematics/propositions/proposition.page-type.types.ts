import type { PropositionKind } from "akasha/mathematics/propositions/properties/proposition-kind.select-property.types.ts"
import type { PropositionStatus } from "akasha/mathematics/propositions/properties/proposition-status.select-property.types.ts"
import type { Statement } from "akasha/mathematics/propositions/properties/statement.file-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Proposition = Page & {
  title: Title
  propositionKind: PropositionKind
  propositionStatus: PropositionStatus
  statement?: Statement
}
