import {
  getUser,
  getUserFromBearerToken,
  parseBearerToken,
} from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"
import { createServerClient } from "akasha/alan/harness/supabase-rr/modules/server-client/server-client.module.code.ts"

export type DeviceTokenContext =
  | { authenticated: true; userId: string; headers: Headers }
  | { authenticated: false; headers: Headers }

async function resolveBearerContext(request: Request): Promise<DeviceTokenContext | null> {
  const token = parseBearerToken(request.headers.get("authorization"))
  if (token === null) return null
  const { user } = await getUserFromBearerToken(token)
  if (user != null) return { authenticated: true, userId: user.id, headers: new Headers() }
  process.stderr.write("[device-token] the bearer token named nobody; reading the session\n")
  return null
}

export async function resolveDeviceTokenContext(request: Request): Promise<DeviceTokenContext> {
  const bearer = await resolveBearerContext(request)
  if (bearer != null) return bearer

  const { user, headers } = await getUser(request)
  if (user == null) return { authenticated: false, headers }
  const { headers: dbHeaders } = createServerClient(request)
  for (const [key, value] of dbHeaders) headers.append(key, value)
  return { authenticated: true, userId: user.id, headers }
}
