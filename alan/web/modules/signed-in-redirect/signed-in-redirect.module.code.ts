import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { redirect } from "react-router"

export async function redirectSignedInHome(request: Request): Promise<null> {
  if ((await signedInAs(request)) !== null) throw redirect("/home")
  return null
}
