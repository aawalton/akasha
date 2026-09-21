import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppEditingProvider } from "akasha/page/ui/component/modules/app-editing/app-editing.module.code.tsx"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { Outlet } from "react-router"

export default function AppLayout() {
  return (
    <AuthProvider reader={null} accountId={null}>
      <AppEditingProvider editing={false}>
        <LayoutRouterAdapter>
          <PagesUIRouterAdapter>
            <main className="mx-auto max-w-5xl p-4">
              <Outlet />
            </main>
          </PagesUIRouterAdapter>
        </LayoutRouterAdapter>
      </AppEditingProvider>
    </AuthProvider>
  )
}
