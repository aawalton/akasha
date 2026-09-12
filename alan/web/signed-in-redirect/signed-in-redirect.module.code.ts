import { getUser } from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"
import { redirect } from "react-router"

export async function redirectSignedInHome(request: Request): Promise<null> {
  const { user, headers } = await getUser(request)
  if (user) throw redirect("/home", { headers })
  return null
}
