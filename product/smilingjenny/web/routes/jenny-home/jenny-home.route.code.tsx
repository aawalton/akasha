import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { smilingjennyWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/smilingjenny-web.web-app.ts"
import {
  type DocumentData,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { requireJenny } from "akasha/product/smilingjenny/web/.server/jenny-session/jenny-session.module.code.ts"
import { data } from "react-router"

const READ = [SITE_DOCUMENT]

export async function loader({ request }: { request: Request }) {
  const { headers } = await requireJenny(request)
  const document = await siteDocumentAt(namedAs("web-app", smilingjennyWeb.slug, null), "")
  return data({ document }, { headers })
}

export default function Home({ loaderData: { document } }: { loaderData: DocumentData }) {
  useLoaderFollowing(READ)
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{document.lead ?? document.title}</PageTitle>
      </PageLayout.Header>
    </PageLayout>
  )
}
