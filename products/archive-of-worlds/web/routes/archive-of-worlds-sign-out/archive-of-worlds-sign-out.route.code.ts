import {
  signOutAction,
  signOutLoader,
} from "akasha/alan/harness/supabase-rr/sign-out-route/sign-out-route.module.code.ts"

export async function action({ request }: { request: Request }) {
  return signOutAction(request)
}

export function loader() {
  return signOutLoader()
}
