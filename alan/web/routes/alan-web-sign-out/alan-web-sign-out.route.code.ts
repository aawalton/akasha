import {
  SIGN_IN_PATH,
  signedOutCookies,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { redirect } from "react-router"

export async function action({ request }: { request: Request }): Promise<Response> {
  const headers = new Headers()
  for (const ending of await signedOutCookies(request)) headers.append("Set-Cookie", ending)
  return redirect(SIGN_IN_PATH, { headers })
}

export function loader(): Response {
  return redirect(SIGN_IN_PATH)
}
