import { AuthPageContent } from "@shared/design-patterns/components/auth-page-content"
import { signInWithPassword } from "@shared/supabase-rr/auth/client"

export default function SignIn() {
  return (
    <AuthPageContent
      mode="sign-in"
      title="Smiling Jenny"
      submitLabel="Sign in"
      onSubmit={async (payload: { email: string; password: string }) => {
        const { error } = await signInWithPassword(payload.email, payload.password)
        if (error) return { error: error.message ?? "That did not sign you in." }
        return { redirect: "/" }
      }}
    />
  )
}
