import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { readHomeNavItemParam } from "akasha/alan/web/.server/home-dni-param/home-dni-param.module.code.ts"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { ViewPageContent } from "akasha/page/ui/component/modules/view-page-content/view-page-content.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { data, redirect } from "react-router"

const READ = ["nav"]

export function meta() {
  return [{ title: "Home" }]
}

export async function loader({ request }: { request: Request }) {
  if ((await signedInAs(request)) === null) throw redirect("/sign-in")
  const navItemIdParam = await readHomeNavItemParam()
  return data({ navItemIdParam })
}

export default function HomeRoute({
  loaderData,
}: {
  loaderData: { navItemIdParam: string | null }
}) {
  useLoaderFollowing(READ)
  if (loaderData.navItemIdParam === null) {
    return (
      <PageLayout>
        <PageLayout.Header>
          <PageTitle>Home</PageTitle>
        </PageLayout.Header>
      </PageLayout>
    )
  }
  return <ViewPageContent navItemIdParam={loaderData.navItemIdParam} />
}
