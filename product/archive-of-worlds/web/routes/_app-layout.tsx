import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { getUser } from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"
import { createServerClient } from "akasha/alan/harness/supabase-rr/modules/server-client/server-client.module.code.ts"
import { SupabaseProvider } from "akasha/alan/harness/supabase-rr/modules/supabase-provider/supabase-provider.module.code.tsx"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { ARCHIVE_OF_WORLDS_APP_SLUG } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-app-id/archive-of-worlds-app-id.module.code.ts"
import { AppShell } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-app-shell/archive-of-worlds-app-shell.module.code.tsx"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  const signedIn = user !== null || (await signedInAs(ARCHIVE_OF_WORLDS_SITE, request)) !== null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (signedIn) {
    const { headers: navHeaders } = createServerClient(request)
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "appSlug", eq: ARCHIVE_OF_WORLDS_APP_SLUG }],
        limit: 200,
      })
      navItems = result.rows
    } catch (err) {
      console.error("[archive-of-worlds/web/_app-layout] nav SSR fetch failed:", err)
    }
    for (const [key, value] of navHeaders) {
      headers.append(key, value)
    }
  }

  return data({ signedIn, navItems }, { headers })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <AppShell signedIn={loaderData.signedIn} ssrNavItems={loaderData.navItems}>
          <Outlet />
        </AppShell>
        <Toaster />
      </AuthProvider>
    </SupabaseProvider>
  )
}
