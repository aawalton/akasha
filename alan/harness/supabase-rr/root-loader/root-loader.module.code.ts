import { data } from "react-router"
import { type AuthRouteConfig, authGuard } from "../auth-guard/auth-guard.module.code.ts"

export async function guardedRootData<Nonce>(
  request: Request,
  config: AuthRouteConfig,
  nonce: Nonce
) {
  const guard = await authGuard(request, config)
  if (guard instanceof Response) return guard
  return data({ nonce }, { headers: guard.headers })
}
