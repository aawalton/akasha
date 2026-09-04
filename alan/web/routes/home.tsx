import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { ViewPageContent } from "@akasha/pages-ui-components/view-page-content"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { getRequestServerClient } from "@akasha/supabase-rr/request-session-cache"
import { data } from "react-router"
import { readHomeNavItemParam } from "../.server/home-dni-param/home-dni-param.module.code.ts"
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
