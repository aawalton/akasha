import { signUpLoader } from "akasha/alan/harness/supabase-rr/sign-up-route/sign-up-route.module.code.ts"

export function loader() {
  return signUpLoader()
}

export default function SignUpRoute() {
  return null
}
