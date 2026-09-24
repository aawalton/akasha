import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import {
  PageTabsTrigger,
  Tabs,
  TabsContent,
  TabsList,
} from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import {
  metaOf,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { List } from "lucide-react"

const WEB_APP = namedAs("web-app", alanwaltonWeb.slug, null)

const READ = [SITE_DOCUMENT]

export async function loader() {
  return { document: await siteDocumentAt(WEB_APP, "principles") }
}

type PrinciplesLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: PrinciplesLoaderData | undefined }) {
  return metaOf(data?.document, null)
}

export default function PrinciplesRoute({ loaderData }: { loaderData: PrinciplesLoaderData }) {
  useLoaderFollowing(READ)
  const { document } = loaderData
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{document.title}</PageTitle>
      </PageLayout.Header>

      <Tabs defaultValue="all">
        <PageLayout.Tabs>
          <TabsList>
            <PageTabsTrigger value="all" icon={<List />} label="All Principles" />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <TabsContent value="all">
            <PageTabHeader title="All Principles" />
            <ResponsiveColumns>
              {document.sections.map((section) => (
                <PanelCard key={section.anchor} id={section.anchor} title={section.title}>
                  <div className="space-y-3">
                    {section.lead === null ? null : (
                      <Heading variant="subsection-accent">{section.lead}</Heading>
                    )}
                    {section.text === null ? null : (
                      <p className="text-secondary text-sm">{section.text}</p>
                    )}
                  </div>
                </PanelCard>
              ))}
            </ResponsiveColumns>
          </TabsContent>
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
