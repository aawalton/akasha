import { AuthPageContent } from "@akasha/design-patterns/auth-page-content"
import { safeRedirectTarget } from "@akasha/pages-url/safe-target"
import { signInWithPassword } from "@akasha/supabase-rr/auth-client"
import { useNavigate, useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Sign In" }]
}

const ALLOWED_REDIRECT_HOSTS = ["archiveofworlds.app"] as const

export default function SignInRoute() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  return (
    <AuthPageContent
      mode="sign-in"
      allowModeToggle
      onModeChange={() => {
        const next = searchParams.get("next")
        navigate(next != null ? `/sign-up?next=${encodeURIComponent(next)}` : "/sign-up")
      }}
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
