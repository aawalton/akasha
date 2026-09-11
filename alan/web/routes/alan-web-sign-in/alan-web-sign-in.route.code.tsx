import { SignInForm } from "akasha/alan/harness/supabase-rr/sign-in-form/sign-in-form.module.code.tsx"
import { redirectSignedInHome } from "akasha/alan/web/signed-in-redirect/signed-in-redirect.module.code.ts"

export function meta() {
  return [{ title: "Sign In" }]
}

export async function loader({ request }: { request: Request }) {
  return redirectSignedInHome(request)
}

export default function SignInRoute() {
  return <SignInForm />
}
