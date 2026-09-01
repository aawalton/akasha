import { askComposed } from "@shared/pages-query/ask"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { data } from "react-router"
import { ALANWALTON_APP_ID } from "~/lib/app-id"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  const userEnvelope = user ? { id: user.id, email: user.email ?? undefined } : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (user) {
    try {
      const asked = await askComposed({
        "page-type": "nav",
        where: { app: { is: ALANWALTON_APP_ID } },
        limit: 200,
      })
      if (!asked.ok) throw new Error(asked.why)
      navItems = asked.answer.rows.map((row) => row.values)
    } catch (err) {
      console.error("[alanwalton/web/_app-layout] nav SSR fetch failed:", err)
    }
  }

  return data({ user: userEnvelope, navItems }, { headers })
}
