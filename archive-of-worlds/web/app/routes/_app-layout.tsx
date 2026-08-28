import { Toaster } from "@shared/design-primitives/components/sonner"
import { getPages } from "@shared/pages-access/get"
import { SupabaseProvider } from "@shared/supabase-rr/provider"
import { getUser } from "@shared/supabase-rr/auth/server"
import { createServerClient } from "@shared/supabase-rr/server"
import { data, Outlet } from "react-router"
import { AppShell } from "~/components/app-shell"
import { AuthProvider } from "~/components/auth-provider"
import { ARCHIVE_OF_WORLDS_APP_ID } from "~/lib/app-id"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  const userEnvelope = user ? { id: user.id, email: user.email ?? undefined } : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (user) {
    const { headers: navHeaders } = createServerClient(request)
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "app", eq: ARCHIVE_OF_WORLDS_APP_ID }],
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

  return data({ user: userEnvelope, navItems }, { headers })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <AppShell user={loaderData.user} ssrNavItems={loaderData.navItems}>
          <Outlet />
        </AppShell>
        <Toaster />
      </AuthProvider>
    </SupabaseProvider>
  )
}
