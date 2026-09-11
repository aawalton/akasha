import {
  type AuthRouteConfig,
  authGuard,
} from "akasha/alan/harness/supabase-rr/auth-guard/auth-guard.module.code.ts"
import { data } from "react-router"

export async function guardedRootData<Nonce>(
  request: Request,
  config: AuthRouteConfig,
  nonce: Nonce
) {
  const guard = await authGuard(request, config)
  if (guard instanceof Response) return guard
  return data({ nonce }, { headers: guard.headers })
}
