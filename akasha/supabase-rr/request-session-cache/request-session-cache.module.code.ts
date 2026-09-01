import { getClaimsUser } from "@akasha/supabase-auth/auth"
import type { SupabaseUser } from "@akasha/supabase-auth/supabase-user"
import { createRequestMemo } from "../request-memo/request-memo.module.code.ts"
import {
  createServerClient,
  type SupabaseServerClient,
} from "../server-client/server-client.module.code.ts"

export type RequestServerClient = { supabase: SupabaseServerClient; headers: Headers }

const clientMemo = createRequestMemo<RequestServerClient>()
const sessionMemo = createRequestMemo<Promise<SupabaseUser | null>>()

export function getRequestServerClient(request: Request): RequestServerClient {
  return clientMemo.get(request, () => createServerClient(request))
}

export async function resolveRequestSession(
  request: Request
): Promise<{ user: SupabaseUser | null; headers: Headers }> {
  const { supabase, headers } = getRequestServerClient(request)
  const user = await sessionMemo.get(request, () => getClaimsUser(supabase))
  return { user, headers }
}
