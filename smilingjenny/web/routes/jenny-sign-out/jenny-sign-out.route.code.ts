import { refreshSession } from "akasha/alan/harness/supabase-rr/session-refresh/session-refresh.module.code.ts"
import { SIGN_IN_PATH } from "akasha/smilingjenny/web/.server/jenny-session/jenny-session.module.code.ts"
import { redirect } from "react-router"

export async function action({ request }: { request: Request }) {
  const { supabase, headers } = await refreshSession(request)
  await supabase.auth.signOut()
  return redirect(SIGN_IN_PATH, { headers })
}

export function loader() {
  return redirect("/")
}
