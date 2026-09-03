import { AuthPageContent } from "@akasha/design-patterns/auth-page-content"
import { safeRedirectTarget } from "@akasha/pages-url/safe-target"
import { signUpWithPassword } from "@akasha/supabase-rr/auth-client"
import { useNavigate, useSearchParams } from "react-router"

export function meta() {
  return [{ title: "Sign Up" }]
}

const ALLOWED_REDIRECT_HOSTS = ["archiveofworlds.app"] as const

export default function SignUpRoute() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  return (
    <AuthPageContent
      mode="sign-up"
      allowModeToggle
      onModeChange={() => {
        const next = searchParams.get("next")
        navigate(next != null ? `/sign-in?next=${encodeURIComponent(next)}` : "/sign-in")
      }}
      onSubmit={async (payload: { email: string; password: string }) => {
        const { error } = await signUpWithPassword(payload.email, payload.password)
        if (error) return { error: error.message ?? "Sign up failed" }
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
