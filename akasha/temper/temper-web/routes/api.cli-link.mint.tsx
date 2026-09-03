import { getUser } from "@akasha/supabase-rr/auth-server"
import { getSupabaseServiceClient } from "../.server/supabase-service-client/supabase-service-client.module.code.ts"
import type { Route } from "./+types/api.cli-link.mint"

const MIN_PORT = 1024
const MAX_PORT = 65535

type MintBody = {
  port?: unknown
  state?: unknown
}

function mergeHeaders(authHeaders: Headers, extra: Record<string, string>): Headers {
  const merged = new Headers(authHeaders)
  for (const [k, v] of Object.entries(extra)) merged.set(k, v)
  return merged
}

function jsonWithAuthHeaders(
  authHeaders: Headers,
  body: unknown,
  init: { status?: number } = {}
): Response {
  const headers = mergeHeaders(authHeaders, { "Content-Type": "application/json" })
  return new Response(JSON.stringify(body), { status: init.status ?? 200, headers })
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  const { user, headers: authHeaders } = await getUser(request)
  if (!user) {
    return jsonWithAuthHeaders(authHeaders, { error: "Not authenticated" }, { status: 401 })
  }
  if (user.email == null) {
    return jsonWithAuthHeaders(
      authHeaders,
      { error: "Authenticated user has no email" },
      { status: 400 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonWithAuthHeaders(authHeaders, { error: "Invalid JSON body" }, { status: 400 })
  }
  if (body === null || typeof body !== "object") {
    return jsonWithAuthHeaders(authHeaders, { error: "Invalid JSON body" }, { status: 400 })
  }
  const { port, state }: MintBody = body
  if (typeof port !== "number" || !Number.isInteger(port) || port < MIN_PORT || port > MAX_PORT) {
    return jsonWithAuthHeaders(
      authHeaders,
      { error: `port must be an integer between ${MIN_PORT} and ${MAX_PORT}` },
      { status: 400 }
    )
  }
  if (typeof state !== "string" || state.length === 0) {
    return jsonWithAuthHeaders(
      authHeaders,
      { error: "state must be a non-empty string" },
      { status: 400 }
    )
  }

  const admin = getSupabaseServiceClient()

  const linkResult = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: user.email,
  })
  if (linkResult.error) {
    return jsonWithAuthHeaders(
      authHeaders,
      { error: `generateLink failed: ${linkResult.error.message}` },
      { status: 500 }
    )
  }
  const hashedToken = linkResult.data.properties?.hashed_token
  if (hashedToken == null || hashedToken === "") {
    return jsonWithAuthHeaders(
      authHeaders,
      { error: "generateLink did not return a hashed_token" },
      { status: 500 }
    )
  }

  const verifyResult = await admin.auth.verifyOtp({
    token_hash: hashedToken,
    type: "email",
  })
  if (verifyResult.error) {
    return jsonWithAuthHeaders(
      authHeaders,
      { error: `verifyOtp failed: ${verifyResult.error.message}` },
      { status: 500 }
    )
  }
  const session = verifyResult.data.session
  if (!session) {
    return jsonWithAuthHeaders(
      authHeaders,
      { error: "verifyOtp did not return a session" },
      { status: 500 }
    )
  }

  return jsonWithAuthHeaders(authHeaders, {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: session.expires_in,
  })
}
