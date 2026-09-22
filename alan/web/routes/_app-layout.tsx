import { loader as appLayoutLoader } from "akasha/alan/web/.server/app-layout-loading/app-layout-loading.module.code.ts"
import { AppShell } from "akasha/alan/web/modules/alan-app-shell/alan-app-shell.module.code.tsx"
import { AuthProvider } from "akasha/alan/web/modules/alan-auth-provider/alan-auth-provider.module.code.tsx"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export const loader = appLayoutLoader

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProvider reader={loaderData.reader} accountId={loaderData.accountId}>
      <AppShell
        signedIn={loaderData.signedIn}
        accountId={loaderData.accountId}
        ssrNavItems={loaderData.navItems}
      >
        <Outlet />
      </AppShell>
      <Toaster />
    </AuthProvider>
  )
}
