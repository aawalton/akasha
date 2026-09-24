import type { UrlPath } from "akasha/code/route/properties/url-path.text-property.types.ts"
import type { SiteDocumentLead } from "akasha/infrastructure/service/akasha-service/web-app/site-document/properties/site-document-lead.text-property.types.ts"
import type { SiteDocumentSections } from "akasha/infrastructure/service/akasha-service/web-app/site-document/properties/site-document-sections.record-property.types.ts"
import type { SiteDocumentWebApp } from "akasha/infrastructure/service/akasha-service/web-app/site-document/properties/site-document-web-app.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type SiteDocument = Page & {
  webApp: SiteDocumentWebApp
  urlPath: UrlPath
  lead?: SiteDocumentLead
  sections?: SiteDocumentSections
}
