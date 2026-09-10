import { refreshSession } from "akasha/alan/harness/supabase-rr/session-refresh/session-refresh.module.code.ts"
import { redirect } from "react-router"

export async function action({ request }: { request: Request }) {
  const { supabase, headers } = await refreshSession(request)
  await supabase.auth.signOut()
  return redirect("/sign-in", { headers })
}

export function loader() {
  return redirect("/")
}
