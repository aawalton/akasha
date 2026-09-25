import { audhdalanWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/audhdalan-web.web-app.ts"
import {
  metaOf,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import {
  SLIDE,
  slidesOf,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/modules/reading/slide-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { DeckPageContent } from "akasha/product/audhdalan/web/modules/deck-page-content/deck-page-content.module.code.tsx"

const WEB_APP = namedAs("web-app", audhdalanWeb.slug, null)

const DECK = namedAs(SITE_DOCUMENT, "audhdalan-web-autcon-2026", null)

const READ = [SITE_DOCUMENT, SLIDE]

export async function loader() {
  const [document, slides] = await Promise.all([
    siteDocumentAt(WEB_APP, "autcon-2026"),
    slidesOf(DECK),
  ])
  return { document, slides }
}

type DeckLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: DeckLoaderData | undefined }) {
  return metaOf(data?.document, data?.document.lead ?? null)
}

export default function AutCon2026Page({ loaderData }: { loaderData: DeckLoaderData }) {
  useLoaderFollowing(READ)
  return <DeckPageContent slides={loaderData.slides} venue={loaderData.document.lead} />
}
