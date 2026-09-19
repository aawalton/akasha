import { refreshSession } from "akasha/alan/harness/supabase-rr/modules/session-refresh/session-refresh.module.code.ts"
import { redirect } from "react-router"

export async function signOutAction(
  request: Request,
  alsoEnding: ReadonlyArray<string>
): Promise<Response> {
  const { supabase, headers } = await refreshSession(request)
  await supabase.auth.signOut()
  for (const ending of alsoEnding) headers.append("Set-Cookie", ending)
  return redirect("/sign-in", { headers })
}

export function signOutLoader(): Response {
  return redirect("/")
}
