import { signInWithPassword } from "akasha/alan/harness/supabase-rr/auth-client/auth-client.module.code.ts"
import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import { AuthPageContent } from "akasha/design/patterns/auth-page-content/auth-page-content.module.code.tsx"
import { safeRedirectTarget } from "akasha/pages/url/safe-target/safe-target.module.code.ts"
import { redirect, useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Sign In" }]
}

export async function loader({ request }: { request: Request }) {
  const { user, headers } = await getUser(request)
  if (user) throw redirect("/home", { headers })
  return null
}

const ALLOWED_REDIRECT_HOSTS = ["alanwalton.com"] as const

export default function SignInRoute() {
  const [searchParams] = useSearchParams()

  return (
    <AuthPageContent
      mode="sign-in"
      onSubmit={async (payload: { email: string; password: string }) => {
        const { error } = await signInWithPassword(payload.email, payload.password)
        if (error) return { error: error.message ?? "Sign in failed" }
        const redirectUrl =
          safeRedirectTarget({
            next: searchParams.get("next"),
            allowedHosts: ALLOWED_REDIRECT_HOSTS,
          }) ?? "/"
        return { redirect: redirectUrl }
      }}
    />
  )
}
