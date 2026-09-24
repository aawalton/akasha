import { redirectSignedInHome } from "akasha/alan/web/modules/signed-in-redirect/signed-in-redirect.module.code.ts"
import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import { SiteDocumentDrawing } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/drawing/site-document-drawing.module.code.tsx"
import {
  metaOf,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"

const WEB_APP = namedAs("web-app", alanwaltonWeb.slug, null)

const READ = [SITE_DOCUMENT]

export async function loader({ request }: { request: Request }) {
  await redirectSignedInHome(request)
  return { document: await siteDocumentAt(WEB_APP, "") }
}

type LandingLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: LandingLoaderData | undefined }) {
  return metaOf(data?.document, null)
}

export default function LandingRoute({ loaderData }: { loaderData: LandingLoaderData }) {
  useLoaderFollowing(READ)
  return <SiteDocumentDrawing document={loaderData.document} />
}
