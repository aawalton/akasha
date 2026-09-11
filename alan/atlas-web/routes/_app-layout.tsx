import { ATLAS_APP_SLUG } from "akasha/alan/atlas-web/atlas-app-id/atlas-app-id.module.code.ts"
import { AppShell } from "akasha/alan/atlas-web/atlas-app-shell/atlas-app-shell.module.code.tsx"
import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import { createServerClient } from "akasha/alan/harness/supabase-rr/server-client/server-client.module.code.ts"
import { SupabaseProvider } from "akasha/alan/harness/supabase-rr/supabase-provider/supabase-provider.module.code.tsx"
import { Toaster } from "akasha/design/interfaces/primitives/sonner/sonner.module.code.tsx"
import { getPages } from "akasha/pages/access/get/get.module.code.ts"
import { AuthProvider } from "akasha/pages/ui/components/auth-provider/auth-provider.module.code.tsx"
import { useEffect } from "react"
import { data, Outlet } from "react-router"
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
        where: [{ key: "appSlug", eq: ATLAS_APP_SLUG }],
        limit: 200,
      })
      navItems = result.rows
    } catch (err) {
      console.error("[atlas/web/_app-layout] nav SSR fetch failed:", err)
    }
    for (const [key, value] of navHeaders) {
      headers.append(key, value)
    }
  }

  return data({ user: userEnvelope, navItems }, { headers })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  useEffect(() => {
    let cancelled = false
    void import(
      "akasha/alan/atlas-web/location-capture-client/location-capture-client.module.code.ts"
    ).then((m) => {
      if (!cancelled) void m.startLocationCapture()
    })
    return () => {
      cancelled = true
    }
  }, [])

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
