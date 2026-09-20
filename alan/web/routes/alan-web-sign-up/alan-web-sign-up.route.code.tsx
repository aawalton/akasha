import { SIGN_IN_PATH } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { redirect } from "react-router"

export function loader(): Response {
  return redirect(SIGN_IN_PATH)
}

export default function SignUpRoute() {
  return null
}
