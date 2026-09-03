import { AuthPageContent } from "@akasha/design-patterns/auth-page-content"
import { safeRedirectTarget } from "@akasha/pages-url/safe-target"
import { signInWithPassword } from "@akasha/supabase-rr/auth-client"
import { useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Sign In" }]
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
