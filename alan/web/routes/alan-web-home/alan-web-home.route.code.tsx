import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import { getRequestServerClient } from "akasha/alan/harness/supabase-rr/request-session-cache/request-session-cache.module.code.ts"
import { PageLayout, PageTitle } from "akasha/design/layout/page-layout/page-layout.module.code.tsx"
import { ViewPageContent } from "akasha/pages/ui/components/view-page-content/view-page-content.module.code.tsx"
import { data, redirect } from "react-router"
import { readHomeNavItemParam } from "../../.server/home-dni-param/home-dni-param.module.code.ts"

export function meta() {
  return [{ title: "Home" }]
}

export async function loader({ request }: { request: Request }) {
  const { headers } = getRequestServerClient(request)
  const { user } = await getUser(request)
  if (!user) throw redirect("/sign-in", { headers })
  const navItemIdParam = await readHomeNavItemParam()
  return data({ navItemIdParam }, { headers })
}

export default function HomeRoute({
  loaderData,
}: {
  loaderData: { navItemIdParam: string | null }
}) {
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
