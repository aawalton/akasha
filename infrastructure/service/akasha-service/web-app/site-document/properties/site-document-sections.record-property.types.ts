import type { SectionAnchor } from "akasha/infrastructure/service/akasha-service/web-app/site-document/properties/section-anchor.text-property.types.ts"
import type { SectionText } from "akasha/infrastructure/service/akasha-service/web-app/site-document/properties/section-text.markdown-property.types.ts"
import type { SiteDocumentLead } from "akasha/infrastructure/service/akasha-service/web-app/site-document/properties/site-document-lead.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type SiteDocumentSections = List<{
  anchor: SectionAnchor
  title: Title
  lead?: SiteDocumentLead
  text?: SectionText
}>
