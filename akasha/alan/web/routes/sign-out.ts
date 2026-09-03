import { refreshSession } from "@akasha/supabase-rr/session-refresh"
import { redirect } from "react-router"
import type { Route } from "./+types/sign-out"

export async function action({ request }: Route.ActionArgs) {
  const { supabase, headers } = await refreshSession(request)
  await supabase.auth.signOut()
  return redirect("/sign-in", { headers })
}

export function loader() {
  return redirect("/")
}
