import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { GoogleSignIn } from "akasha/alan/harness/better-auth-rr/modules/google-sign-in/google-sign-in.module.code.tsx"
import { redirect } from "react-router"

export function meta() {
  return [{ title: "Sign In" }]
}

export async function loader({ request }: { request: Request }) {
  if ((await signedInAs(request)) !== null) throw redirect("/home")
  return null
}

export default function SignInRoute() {
  return <GoogleSignIn />
}
