import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { Separator } from "akasha/design/interface/primitive/modules/separator/separator.module.code.tsx"
import { audhdalanWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/audhdalan-web.web-app.ts"
import {
  metaOf,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import type { Components } from "react-markdown"

const WEB_APP = namedAs("web-app", audhdalanWeb.slug, null)

const READ = [SITE_DOCUMENT]

const TABLED: Components = {
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-accent border-b-2">{children}</thead>,
  tr: ({ children }) => <tr className="border-white/10 border-b">{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-primary text-sm uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 align-top text-base text-secondary leading-relaxed first:font-bold first:text-lg first:text-primary [&:nth-child(2)]:font-semibold">
      {children}
    </td>
  ),
}

export async function loader() {
  return { document: await siteDocumentAt(WEB_APP, "safety-levels") }
}

type SafetyLevelsLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: SafetyLevelsLoaderData | undefined }) {
  return metaOf(data?.document, "audhdalan")
}

export default function SafetyLevelsPage({ loaderData }: { loaderData: SafetyLevelsLoaderData }) {
  useLoaderFollowing(READ)
  const { document } = loaderData
  return (
    <PageLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pt-20 pb-16">
        <div className="flex flex-col gap-4">
          <Heading variant="subsection" as="h2" className="font-bold text-5xl text-primary">
            {document.title}
          </Heading>
          <Separator className="w-24 bg-accent" />
        </div>
        {document.sections.map((section) =>
          section.text === null ? null : (
            <MarkdownRenderer key={section.anchor} content={section.text} components={TABLED} />
          )
        )}
      </div>
    </PageLayout>
  )
}
