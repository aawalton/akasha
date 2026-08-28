import { PageLayout, PageTitle } from "@shared/design-system"
import { ViewPageContent } from "@shared/pages-ui/components/view-page-content"
import { getUser } from "@shared/supabase-rr/auth/server"
import { getRequestServerClient } from "@shared/supabase-rr/request-session-cache"
import { data } from "react-router"
import { readHomeNavItemParam } from "~/lib/home-dni.server"
import type { Route } from "./+types/home"

export function meta() {
  return [{ title: "Home" }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = getRequestServerClient(request)
  const { user } = await getUser(request)
  if (!user) return data({ navItemIdParam: null }, { headers })
  const navItemIdParam = await readHomeNavItemParam()
  return data({ navItemIdParam }, { headers })
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
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
