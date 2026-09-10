import { signInWithPassword } from "akasha/alan/harness/supabase-rr/auth-client/auth-client.module.code.ts"
import { AuthPageContent } from "akasha/design/patterns/auth-page-content/auth-page-content.module.code.tsx"

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
