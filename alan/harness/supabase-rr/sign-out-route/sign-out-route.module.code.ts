import { redirect } from "react-router"
import { refreshSession } from "../session-refresh/session-refresh.module.code.ts"

export async function signOutAction(request: Request): Promise<Response> {
  const { supabase, headers } = await refreshSession(request)
  await supabase.auth.signOut()
  return redirect("/sign-in", { headers })
}

export function signOutLoader(): Response {
  return redirect("/")
}
