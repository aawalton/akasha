import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Icon } from "../../../temper/things/properties/icon.text-property.ts"
import type { About } from "./properties/about.select-property.ts"
import type { IdentityStatementLevel } from "./properties/identity-statement-level.number-property.ts"
import type { IdentityStatementRank } from "./properties/identity-statement-rank.select-property.ts"
import type { IdentityStatementStatus } from "./properties/identity-statement-status.select-property.ts"
import type { IdentityStatementTags } from "./properties/identity-statement-tags.text-property.ts"
import type { IdentityStatementValue } from "./properties/identity-statement-value.relation-property.ts"
import type { NotionId } from "./properties/notion-id.text-property.ts"
import type { ParentStatement } from "./properties/parent-statement.relation-property.ts"
import type { ReplacedByStatements } from "./properties/replaced-by-statements.relation-property.ts"
import type { ReplacesStatements } from "./properties/replaces-statements.relation-property.ts"
import type { SubStatements } from "./properties/sub-statements.relation-property.ts"

export type IdentityStatement = Page & {
  title: Title
  about?: About
  identityStatementLevel: IdentityStatementLevel
  notionId: NotionId
  parentStatement?: ParentStatement
  identityStatementRank: IdentityStatementRank
  replacedByStatements?: ReplacedByStatements
  replacesStatements?: ReplacesStatements
  identityStatementStatus: IdentityStatementStatus
  subStatements?: SubStatements
  identityStatementTags?: IdentityStatementTags
  identityStatementValue: IdentityStatementValue
  icon: Icon
}
