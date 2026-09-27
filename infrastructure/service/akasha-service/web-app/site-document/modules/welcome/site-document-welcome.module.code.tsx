import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import {
  type DocumentData,
  SITE_DOCUMENT,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"

const READ = [SITE_DOCUMENT]

export function SiteDocumentWelcome({ loaderData }: { loaderData: DocumentData }) {
  useLoaderFollowing(READ)
  const { document } = loaderData
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{document.title}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="mx-auto max-w-2xl py-12 text-center">
          {document.lead === null ? null : (
            <p className="text-lg text-secondary">{document.lead}</p>
          )}
          {document.description === null ? null : (
            <p className="text-secondary text-sm">{document.description}</p>
          )}
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
