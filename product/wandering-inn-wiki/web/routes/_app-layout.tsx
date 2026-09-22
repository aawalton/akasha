import { AppEditingProvider } from "akasha/page/ui/component/modules/app-editing/app-editing.module.code.tsx"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { AppShell } from "akasha/product/wandering-inn-wiki/web/modules/innworld-app-shell/innworld-app-shell.module.code.tsx"
import { shownTypesRead } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { INNWORLD_VISITOR } from "akasha/product/wandering-inn-wiki/web/modules/innworld-visitor/innworld-visitor.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader() {
  return data({ shownTypes: await shownTypesRead() })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProvider reader={INNWORLD_VISITOR} accountId={null}>
      <AppEditingProvider editing={false}>
        <AppShell shownTypes={loaderData.shownTypes}>
          <Outlet />
        </AppShell>
      </AppEditingProvider>
    </AuthProvider>
  )
}
