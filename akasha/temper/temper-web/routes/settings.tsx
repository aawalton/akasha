import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { Suspense } from "react"
import { data, redirect, useSearchParams } from "react-router"
import { SettingsPageContent } from "../settings-page-content/settings-page-content.module.code.tsx"
import { tabDefaultFor } from "../tab-defaults/tab-defaults.module.code.ts"
import type { Route } from "./+types/settings"

export function meta() {
  return [{ title: "Temper | Settings" }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  if (!user) {
    const target = redirect("/sign-in")
    for (const [k, v] of headers) {
      if (k.toLowerCase() === "set-cookie") target.headers.append("set-cookie", v)
    }
    return target
  }
  return data({ user: { id: user.id, email: user.email } }, { headers })
}

export default function SettingsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/settings") ?? "account"
  return (
    <Suspense
      fallback={
        <PageLayoutSkeleton
          config={tabbedPageSkeleton({
            initialTab: tab,
            defaultTab: "account",
            tabs: ["account", "inventory", "automation", "notifications"],
            titleWidth: 108,
          })}
        />
      }
    >
      <SettingsPageContent user={loaderData.user} initialTab={tab} />
    </Suspense>
  )
}
