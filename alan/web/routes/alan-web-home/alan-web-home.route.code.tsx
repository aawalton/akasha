import { getUser } from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"
import { getRequestServerClient } from "akasha/alan/harness/supabase-rr/request-session-cache/request-session-cache.module.code.ts"
import { readHomeNavItemParam } from "akasha/alan/web/.server/home-dni-param/home-dni-param.module.code.ts"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { ViewPageContent } from "akasha/pages/ui/components/view-page-content/view-page-content.module.code.tsx"
import { data, redirect } from "react-router"

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
