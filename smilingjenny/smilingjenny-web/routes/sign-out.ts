import { refreshSession } from "@akasha/supabase-rr/session-refresh"
import { redirect } from "react-router"
import { SIGN_IN_PATH } from "../.server/jenny-session/jenny-session.module.code.ts"
import type { Route } from "./+types/sign-out"

export async function action({ request }: Route.ActionArgs) {
  const { supabase, headers } = await refreshSession(request)
  await supabase.auth.signOut()
  return redirect(SIGN_IN_PATH, { headers })
}

export function loader() {
  return redirect("/")
}
