import { AppEditingProvider } from "akasha/page/ui/component/modules/app-editing/app-editing.module.code.tsx"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { AppShell } from "akasha/product/wandering-inn-wiki/web/modules/innworld-app-shell/innworld-app-shell.module.code.tsx"
import { collectionsRead } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader() {
  return data({ collections: await collectionsRead() })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProvider reader={null} accountId={null}>
      <AppEditingProvider editing={false}>
        <AppShell collections={loaderData.collections}>
          <Outlet />
        </AppShell>
      </AppEditingProvider>
    </AuthProvider>
  )
}
