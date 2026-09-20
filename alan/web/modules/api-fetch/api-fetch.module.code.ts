import { API_ORIGIN } from "akasha/alan/web/modules/api-origin/api-origin.module.code.ts"
import { isNativeShell } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"

export function buildApiRequest(
  input: string,
  init: RequestInit | undefined,
  ctx: { native: boolean; origin: string }
): { url: string; init: RequestInit } {
  if (!ctx.native) return { url: input, init: init ?? {} }
  return { url: `${ctx.origin}${input}`, init: { ...init, credentials: "include" } }
}

export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  const built = buildApiRequest(input, init, { native: isNativeShell(), origin: API_ORIGIN })
  return fetch(built.url, built.init)
}
