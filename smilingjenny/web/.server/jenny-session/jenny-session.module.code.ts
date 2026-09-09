import type { SupabaseUser } from "@akasha/supabase-auth/supabase-user"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { redirect } from "react-router"

export const SIGN_IN_PATH = "/sign-in"

export const JENNY_USER_ID = "9bc63b11-d301-4a51-8839-7371336262c7"

export type SignedIn = { user: SupabaseUser; headers: Headers }

export type SessionReader = (
  request: Request
) => Promise<{ user: SupabaseUser | null; headers: Headers }>

function isJenny(user: SupabaseUser | null): user is SupabaseUser {
  return user !== null && user.id === JENNY_USER_ID
}

export async function requireJenny(
  request: Request,
  read: SessionReader = getUser
): Promise<SignedIn> {
  const { user, headers } = await read(request)
  if (!isJenny(user)) throw redirect(SIGN_IN_PATH, { headers })
  return { user, headers }
}

export async function requireApiJenny(
  request: Request,
  read: SessionReader = getUser
): Promise<SignedIn> {
  const { user, headers } = await read(request)
  if (!isJenny(user)) {
    throw Response.json({ ok: false, error: "Not signed in." }, { status: 401 })
  }
  return { user, headers }
}
