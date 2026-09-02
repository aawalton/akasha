import { getBrowserClient } from "@akasha/supabase-rr/browser-client"
import { API_ORIGIN } from "../api-origin/api-origin.module.code.ts"
import { isNativeShell } from "../capacitor-bridge/capacitor-bridge.module.code.ts"

export function buildApiRequest(
  input: string,
  init: RequestInit | undefined,
  ctx: { native: boolean; origin: string; token: string | null }
): { url: string; init: RequestInit } {
  if (!ctx.native) return { url: input, init: init ?? {} }
  const headers = new Headers(init?.headers)
  if (ctx.token != null) headers.set("Authorization", `Bearer ${ctx.token}`)
  return { url: `${ctx.origin}${input}`, init: { ...init, headers } }
}

export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  const native = isNativeShell()
  const token = native
    ? ((await getBrowserClient().auth.getSession()).data.session?.access_token ?? null)
    : null
  const built = buildApiRequest(input, init, { native, origin: API_ORIGIN, token })
  return fetch(built.url, built.init)
}
