import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { PropositionKind } from "./properties/proposition-kind.select-property.ts"
import type { PropositionStatus } from "./properties/proposition-status.select-property.ts"
import type { Statement } from "./properties/statement.file-property.ts"

export type Proposition = Page & {
  title: Title
  propositionKind: PropositionKind
  propositionStatus: PropositionStatus
  statement?: Statement
}
