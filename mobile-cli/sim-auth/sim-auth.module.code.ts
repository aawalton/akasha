import { OperationalError } from "@akasha/errors-core/exit-code"
import { assertCredentialPathAllowed } from "@akasha/supabase-auth/protected-user"
import { z } from "zod"

export const SUPABASE_STORAGE_KEY = "sb-supabase-auth-token"

const authEnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  BROWSER_TEST_EMAIL: z.string().min(1),
  BROWSER_TEST_PASSWORD: z.string().min(1),
})

export interface SimAuthEnv {
  readonly supabaseUrl: string
  readonly anonKey: string
  readonly email: string
  readonly password: string
}

export function parseSimAuthEnv(env: Record<string, string | undefined>): SimAuthEnv {
  const parsed = authEnvSchema.safeParse(env)
  if (!parsed.success) {
    const missing = parsed.error.issues.map((i) => i.path.join(".")).join(", ")
    throw new OperationalError(
      `sim auth env incomplete (${missing}) — add SUPABASE_URL, SUPABASE_ANON_KEY, ` +
        "BROWSER_TEST_EMAIL, BROWSER_TEST_PASSWORD to ~/.secrets.env (throwaway identity)."
    )
  }
  return {
    supabaseUrl: parsed.data.SUPABASE_URL,
    anonKey: parsed.data.SUPABASE_ANON_KEY,
    email: parsed.data.BROWSER_TEST_EMAIL,
    password: parsed.data.BROWSER_TEST_PASSWORD,
  }
}

export function readSimAuthEnv(): SimAuthEnv {
  return parseSimAuthEnv(process.env)
}

const realUserAuthEnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  BROWSER_TEST_REAL_USER_EMAIL: z.string().min(1),
  BROWSER_TEST_REAL_USER_PASSWORD: z.string().min(1),
})

export function parseRealUserSimAuthEnv(env: Record<string, string | undefined>): SimAuthEnv {
  const parsed = realUserAuthEnvSchema.safeParse(env)
  if (!parsed.success) {
    const missing = parsed.error.issues.map((i) => i.path.join(".")).join(", ")
    throw new OperationalError(
      `sim real-user auth env incomplete (${missing}) — add SUPABASE_URL, SUPABASE_ANON_KEY, ` +
        "BROWSER_TEST_REAL_USER_EMAIL, BROWSER_TEST_REAL_USER_PASSWORD to ~/.secrets.env " +
        "(Alan's live identity — READ-ONLY use only)."
    )
  }
  return {
    supabaseUrl: parsed.data.SUPABASE_URL,
    anonKey: parsed.data.SUPABASE_ANON_KEY,
    email: parsed.data.BROWSER_TEST_REAL_USER_EMAIL,
    password: parsed.data.BROWSER_TEST_REAL_USER_PASSWORD,
  }
}

export function readRealUserSimAuthEnv(): SimAuthEnv {
  return parseRealUserSimAuthEnv(process.env)
}

const tokenResponseSchema = z
  .object({
    access_token: z.string().min(1),
    refresh_token: z.string().min(1),
    user: z.object({ id: z.string().min(1) }).passthrough(),
  })
  .passthrough()

export interface MintedSession {
  readonly session: unknown
  readonly userId: string
}

const AUTH_TIMEOUT_MS = 20_000

async function mintSession(env: SimAuthEnv): Promise<MintedSession> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS)
  let res: Response
  try {
    res = await fetch(`${env.supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: env.anonKey,
        authorization: `Bearer ${env.anonKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: env.email, password: env.password }),
      signal: controller.signal,
    })
  } catch (err) {
    const reason =
      err instanceof Error && err.name === "AbortError"
        ? `timed out after ${AUTH_TIMEOUT_MS}ms`
        : `transport error: ${err instanceof Error ? err.message : String(err)}`
    throw new OperationalError(`Supabase sign-in ${reason} (${env.supabaseUrl})`)
  } finally {
    clearTimeout(timer)
  }

  if (!res.ok) {
    throw new OperationalError(
      `Supabase sign-in failed (HTTP ${res.status}) — check the sim creds in ~/.secrets.env.`
    )
  }
  const parsed = tokenResponseSchema.safeParse(await res.json().catch(() => null))
  if (!parsed.success) {
    throw new OperationalError("Supabase sign-in returned an unexpected token-response shape")
  }
  return { session: parsed.data, userId: parsed.data.user.id }
}

export async function mintThrowawaySession(env: SimAuthEnv): Promise<MintedSession> {
  const minted = await mintSession(env)
  assertCredentialPathAllowed({ resolvedUserId: minted.userId })
  return minted
}

export async function mintRealUserSession(env: SimAuthEnv): Promise<MintedSession> {
  const minted = await mintSession(env)
  assertCredentialPathAllowed({
    resolvedUserId: minted.userId,
    deliberateRealUserOptIn: true,
    readOnly: true,
  })
  return minted
}
