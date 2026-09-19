import { signedOutCookies } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  signOutAction,
  signOutLoader,
} from "akasha/alan/harness/supabase-rr/modules/sign-out-route/sign-out-route.module.code.ts"

export async function action({ request }: { request: Request }) {
  return signOutAction(request, await signedOutCookies(request))
}

export function loader() {
  return signOutLoader()
}
