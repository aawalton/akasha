import type { PropositionKind } from "akasha/alan/value/learn/mathematics/proposition/properties/proposition-kind.select-property.types.ts"
import type { PropositionStatus } from "akasha/alan/value/learn/mathematics/proposition/properties/proposition-status.select-property.types.ts"
import type { Statement } from "akasha/alan/value/learn/mathematics/proposition/properties/statement.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Proposition = Page & {
  title: Title
  propositionKind: PropositionKind
  propositionStatus: PropositionStatus
  statement?: Statement
}
