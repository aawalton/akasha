import { signInWithPassword } from "akasha/alan/harness/supabase-rr/auth-client/auth-client.module.code.ts"
import { AuthPageContent } from "akasha/design/interfaces/patterns/auth-page-content/auth-page-content.module.code.tsx"
import { safeRedirectTarget } from "akasha/pages/url/safe-target/safe-target.module.code.ts"
import { useSearchParams } from "react-router"

const ALLOWED_REDIRECT_HOSTS = ["alanwalton.com"] as const

export function SignInForm() {
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
