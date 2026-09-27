import { archiveOfWorldsWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/archive-of-worlds-web.web-app.ts"
import {
  type DocumentData,
  loaderAt,
  metaFor,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { SiteDocumentWelcome } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/welcome/site-document-welcome.module.code.tsx"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export const loader = loaderAt(namedAs("web-app", archiveOfWorldsWeb.slug, null), "")

export const meta = metaFor(null)

export default function ArchiveOfWorldsHome({ loaderData }: { loaderData: DocumentData }) {
  return <SiteDocumentWelcome loaderData={loaderData} />
}
