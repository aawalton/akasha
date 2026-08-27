import { refreshSession } from "@shared/supabase-rr/proxy"
import { redirect } from "react-router"
import { SIGN_IN_PATH } from "~/lib/session.server"
import type { Route } from "./+types/sign-out"

export async function action({ request }: Route.ActionArgs) {
  const { supabase, headers } = await refreshSession(request)
  await supabase.auth.signOut()
  return redirect(SIGN_IN_PATH, { headers })
}

export function loader() {
  return redirect("/")
}
