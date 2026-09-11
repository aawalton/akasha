import { SignInForm } from "akasha/alan/harness/supabase-rr/sign-in-form/sign-in-form.module.code.tsx"

export function meta() {
  return [{ title: "Sign In" }]
}

export default function SignInRoute() {
  return <SignInForm />
}
