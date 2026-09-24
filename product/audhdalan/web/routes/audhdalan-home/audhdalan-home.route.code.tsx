import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { Separator } from "akasha/design/interface/primitive/modules/separator/separator.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { audhdalanWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/audhdalan-web.web-app.ts"
import {
  type DrawnSection,
  metaOf,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { ResourceList } from "akasha/product/audhdalan/web/modules/resource-list/resource-list.module.code.tsx"
import { SubscribeForm } from "akasha/product/audhdalan/web/modules/subscribe-form/subscribe-form.module.code.tsx"

const WEB_APP = namedAs("web-app", audhdalanWeb.slug, null)

const READ = [SITE_DOCUMENT]

const ABOUT = "about-alan"

const RESOURCES = "resources"

export async function loader() {
  return { document: await siteDocumentAt(WEB_APP, "") }
}

type HomeLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: HomeLoaderData | undefined }) {
  return [{ title: "audhdalan" }, ...metaOf(data?.document, null).slice(1)]
}

function Titled({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Heading variant="subsection" as="h2" className="font-bold text-3xl text-primary">
        {title}
      </Heading>
      <Separator className="w-24 bg-accent" />
    </div>
  )
}

function AboutSection({ section }: { section: DrawnSection }) {
  return (
    <section className="flex flex-col gap-10 sm:flex-row sm:items-start">
      <div className="flex flex-1 flex-col gap-6">
        <Titled title={section.title} />
        {section.text === null ? null : (
          <Text variant="prose" className="text-lg">
            {section.text}
          </Text>
        )}
      </div>
      <img
        src="/autcon-2026/alan-winter.jpg"
        alt="Alan Walton"
        width={280}
        height={373}
        className="rounded-xl object-cover shadow-lg"
      />
    </section>
  )
}

function ResourcesSection({ section }: { section: DrawnSection }) {
  return (
    <section className="flex flex-col gap-6">
      <Titled title={section.title} />
      {section.text === null ? null : <ResourceList text={section.text} />}
    </section>
  )
}

export default function Home({ loaderData }: { loaderData: HomeLoaderData }) {
  useLoaderFollowing(READ)
  const { document } = loaderData
  const about = document.sections.find((one) => one.anchor === ABOUT)
  const resources = document.sections.find((one) => one.anchor === RESOURCES)
  return (
    <PageLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-20 px-6 pt-20 pb-16">
        <div className="flex flex-col gap-4">
          <Heading variant="subsection" as="h2" className="font-bold text-5xl text-primary">
            {document.title}
          </Heading>
          <Separator className="w-24 bg-accent" />
        </div>
        {about === undefined ? null : <AboutSection section={about} />}
        {resources === undefined ? null : <ResourcesSection section={resources} />}
        <SubscribeForm />
      </div>
    </PageLayout>
  )
}
