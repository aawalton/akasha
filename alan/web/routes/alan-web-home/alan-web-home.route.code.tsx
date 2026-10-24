import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { readHomeNavItem } from "akasha/alan/web/.server/home-dni-param/home-dni-param.module.code.ts"
import { navReachOf } from "akasha/alan/web/.server/nav-reach/nav-reach.module.code.ts"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import {
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { ViewPageContent } from "akasha/page/ui/component/modules/view-page-content/view-page-content.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { data, redirect } from "react-router"

const READ = ["nav", SITE_DOCUMENT]

const WEB_APP = namedAs("web-app", alanwaltonWeb.slug, null)

type HomeLoaderData = { readonly navItemIdParam: string | null; readonly title: string }

export function meta({ data: loaderData }: { data: HomeLoaderData | undefined }) {
  return loaderData === undefined ? [] : [{ title: loaderData.title }]
}

export async function loader({ request }: { request: Request }) {
  const signed = await signedInAs(request)
  if (signed === null) throw redirect("/sign-in")
  const reach = await navReachOf({ contributor: signed.contributor })
  const [navItem, document] = await Promise.all([
    readHomeNavItem(reach),
    siteDocumentAt(WEB_APP, "home"),
  ])
  if (navItem?.href != null) throw redirect(navItem.href)
  return data({
    navItemIdParam: navItem?.param ?? null,
    title: navItem?.title ?? document.title,
  })
}

export default function HomeRoute({ loaderData }: { loaderData: HomeLoaderData }) {
  useLoaderFollowing(READ)
  if (loaderData.navItemIdParam === null) {
    return (
      <PageLayout>
        <PageLayout.Header>
          <PageTitle>{loaderData.title}</PageTitle>
        </PageLayout.Header>
      </PageLayout>
    )
  }
  return <ViewPageContent navItemIdParam={loaderData.navItemIdParam} />
}
