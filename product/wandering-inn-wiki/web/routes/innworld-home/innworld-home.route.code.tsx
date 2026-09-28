import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import { innworldWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/innworld-web.web-app.ts"
import {
  type DocumentData,
  loaderAt,
  metaFor,
  SITE_DOCUMENT,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { INNWORLD_APP } from "akasha/product/wandering-inn-wiki/web/modules/innworld-app-id/innworld-app-id.module.code.ts"
import type { ShownType } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import {
  type Shelved,
  shelvesOf,
} from "akasha/product/wandering-inn-wiki/web/modules/innworld-shelves/innworld-shelves.module.code.ts"
import { useMemo } from "react"
import { Link, useRouteLoaderData } from "react-router"

const FRAME = "routes/_app-layout"

const NAV = "nav"

const VIEW = "view"

const READ = [SITE_DOCUMENT, VIEW]

const VIEWS_AT_ONCE = 500

type Row = Readonly<Record<string, unknown>>

type FrameData = {
  readonly shownTypes: readonly ShownType[]
  readonly navItems: readonly Row[]
}

type HomeData = DocumentData & { readonly views: readonly Row[] }

const documentRead = loaderAt(namedAs("web-app", innworldWeb.slug, null), "")

async function viewsOfNavs(): Promise<readonly Row[]> {
  const navs = await getPages({
    pageTypeSlug: NAV,
    where: [{ key: "app", eq: INNWORLD_APP }],
    select: ["slug"],
    limit: VIEWS_AT_ONCE,
  })
  const named: string[] = []
  for (const nav of navs.rows) {
    if (typeof nav["slug"] === "string") named.push(namedAs(NAV, nav["slug"], null))
  }
  if (named.length === 0) return []
  const views = await getPages({
    pageTypeSlug: VIEW,
    where: [{ key: NAV, in: named }],
    select: ["nav", "pageType", "viewPlace"],
    limit: VIEWS_AT_ONCE,
  })
  return views.rows
}

export async function loader(): Promise<HomeData> {
  const [site, views] = await Promise.all([documentRead(), viewsOfNavs()])
  return { ...site, views }
}

export const meta = metaFor(null)

function Entry({ one }: { one: Shelved }) {
  return (
    <li className="flex items-baseline gap-2">
      <Icon name={one.icon} aria-hidden className="size-4 shrink-0 translate-y-0.5" />
      <span>
        <Link className="font-medium underline" to={one.href}>
          {one.label}
        </Link>
        {one.definition === null ? null : (
          <span className="text-secondary"> — {one.definition}</span>
        )}
      </span>
    </li>
  )
}

export default function InnworldHome({
  loaderData: { document, views },
}: {
  loaderData: HomeData
}) {
  useLoaderFollowing(READ)
  const loaderData = useRouteLoaderData<FrameData>(FRAME)
  const shelves = useMemo(
    () => shelvesOf(loaderData?.navItems ?? [], loaderData?.shownTypes ?? [], views),
    [loaderData, views]
  )
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{document.title}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        {document.sections.map((section) =>
          section.text === null ? null : (
            <MarkdownRenderer
              key={section.anchor}
              content={section.text}
              className="text-secondary [&_a]:underline"
            />
          )
        )}
        <div className="mt-6 space-y-6">
          {shelves.map((shelf) => (
            <section key={shelf.heading ?? `loose-${shelf.under[0]?.href ?? ""}`}>
              {shelf.heading === null ? null : (
                <h2 className="mb-2 font-semibold text-secondary text-sm uppercase tracking-wide">
                  {shelf.heading}
                </h2>
              )}
              <ul className="space-y-2">
                {shelf.under.map((one) => (
                  <Entry key={one.href} one={one} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
