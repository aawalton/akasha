import { getUser, getUserFromBearerToken, parseBearerToken } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"

export type DeviceTokenContext =
  | { authenticated: true; userId: string; headers: Headers }
  | { authenticated: false; headers: Headers }

async function resolveBearerContext(request: Request): Promise<DeviceTokenContext | null> {
  const token = parseBearerToken(request.headers.get("authorization"))
  if (token === null) return null
  const { user } = await getUserFromBearerToken(token)
  if (user == null) return { authenticated: false, headers: new Headers() }
  return { authenticated: true, userId: user.id, headers: new Headers() }
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
