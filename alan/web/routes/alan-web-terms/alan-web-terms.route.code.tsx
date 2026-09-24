import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import { SiteDocumentDrawing } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/drawing/site-document-drawing.module.code.tsx"
import {
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"

const WEB_APP = namedAs("web-app", alanwaltonWeb.slug, null)

const READ = [SITE_DOCUMENT]

export async function loader() {
  return { document: await siteDocumentAt(WEB_APP, "terms") }
}

type TermsLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: TermsLoaderData | undefined }) {
  if (data === undefined) return []
  const { title, description } = data.document
  return [
    { title: `${title} — Alan Walton` },
    ...(description === null ? [] : [{ name: "description", content: description }]),
  ]
}

export default function TermsRoute({ loaderData }: { loaderData: TermsLoaderData }) {
  useLoaderFollowing(READ)
  return <SiteDocumentDrawing document={loaderData.document} />
}
