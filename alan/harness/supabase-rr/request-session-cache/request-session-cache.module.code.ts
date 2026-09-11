import { getClaimsUser } from "akasha/alan/harness/supabase-auth/auth/auth.module.code.ts"
import type { SupabaseUser } from "akasha/alan/harness/supabase-auth/supabase-user/supabase-user.module.code.ts"
import { createRequestMemo } from "akasha/alan/harness/supabase-rr/request-memo/request-memo.module.code.ts"
import {
  createServerClient,
  type SupabaseServerClient,
} from "akasha/alan/harness/supabase-rr/server-client/server-client.module.code.ts"

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
