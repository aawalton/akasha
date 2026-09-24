import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import { SiteDocumentDrawing } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/drawing/site-document-drawing.module.code.tsx"
import {
  metaOf,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { SmsOptInForm } from "akasha/person/modules/sms-opt-in/sms-opt-in.module.code.tsx"

const WEB_APP = namedAs("web-app", alanwaltonWeb.slug, null)

const READ = [SITE_DOCUMENT]

const BENEATH = { "opt-in": <SmsOptInForm /> }

export async function loader() {
  return { document: await siteDocumentAt(WEB_APP, "sms") }
}

type SmsLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: SmsLoaderData | undefined }) {
  return metaOf(data?.document, null)
}

export default function SmsRoute({ loaderData }: { loaderData: SmsLoaderData }) {
  useLoaderFollowing(READ)
  return <SiteDocumentDrawing document={loaderData.document} beneath={BENEATH} />
}
