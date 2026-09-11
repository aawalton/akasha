import type { About } from "akasha/alan/self/identity-statements/properties/about.select-property.types.ts"
import type { IdentityStatementLevel } from "akasha/alan/self/identity-statements/properties/identity-statement-level.number-property.types.ts"
import type { IdentityStatementRank } from "akasha/alan/self/identity-statements/properties/identity-statement-rank.select-property.types.ts"
import type { IdentityStatementStatus } from "akasha/alan/self/identity-statements/properties/identity-statement-status.select-property.types.ts"
import type { IdentityStatementTags } from "akasha/alan/self/identity-statements/properties/identity-statement-tags.text-property.types.ts"
import type { IdentityStatementValue } from "akasha/alan/self/identity-statements/properties/identity-statement-value.relation-property.types.ts"
import type { NotionId } from "akasha/alan/self/identity-statements/properties/notion-id.text-property.types.ts"
import type { ParentStatement } from "akasha/alan/self/identity-statements/properties/parent-statement.relation-property.types.ts"
import type { ReplacedByStatements } from "akasha/alan/self/identity-statements/properties/replaced-by-statements.relation-property.types.ts"
import type { ReplacesStatements } from "akasha/alan/self/identity-statements/properties/replaces-statements.relation-property.types.ts"
import type { SubStatements } from "akasha/alan/self/identity-statements/properties/sub-statements.relation-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"

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
