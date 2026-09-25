import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { AppEditingProvider } from "akasha/page/ui/component/modules/app-editing/app-editing.module.code.tsx"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { INNWORLD_APP } from "akasha/product/wandering-inn-wiki/web/modules/innworld-app-id/innworld-app-id.module.code.ts"
import { AppShell } from "akasha/product/wandering-inn-wiki/web/modules/innworld-app-shell/innworld-app-shell.module.code.tsx"
import { shownTypesRead } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { INNWORLD_VISITOR } from "akasha/product/wandering-inn-wiki/web/modules/innworld-visitor/innworld-visitor.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

const READ = ["page-type", "nav"]

export async function loader() {
  const [shownTypes, nav] = await Promise.all([
    shownTypesRead(),
    getPages({ pageTypeSlug: "nav", where: [{ key: "app", eq: INNWORLD_APP }], limit: 200 }),
  ])
  return data({ shownTypes, navItems: nav.rows })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  useLoaderFollowing(READ)
  return (
    <AuthProvider reader={INNWORLD_VISITOR} accountId={null}>
      <AppEditingProvider editing={false}>
        <AppShell ssrNavItems={loaderData.navItems}>
          <Outlet />
        </AppShell>
      </AppEditingProvider>
    </AuthProvider>
  )
}
