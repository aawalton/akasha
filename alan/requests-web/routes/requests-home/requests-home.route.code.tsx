import { requests } from "akasha/page/nav/pages/requests.nav.ts"
import { ViewPageContent } from "akasha/page/ui/component/modules/view-page-content/view-page-content.module.code.tsx"
import { buildPageHrefParam } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const NAV_PARAM = buildPageHrefParam({
  pageTypeSlug: toPageTypeSlug("nav"),
  slug: requests.slug,
  fallbackSlugSource: requests.title,
  id: requests.id,
})

export function meta() {
  return [
    { title: "Requests" },
    {
      name: "description",
      content: "What people have asked Alan to build, and the points behind each ask.",
    },
  ]
}

export default function HomeRoute() {
  return <ViewPageContent navItemIdParam={NAV_PARAM} />
}
