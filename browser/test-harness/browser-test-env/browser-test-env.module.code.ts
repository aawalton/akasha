import { z } from "zod"

export interface BrowserTestEnv {
  readonly url: string
  readonly email: string
  readonly password: string
  readonly supabaseUrl: string
  readonly supabaseAnonKey: string
  readonly supabaseServiceRoleKey: string
}

const EnvSchema = z.object({
  BROWSER_TEST_URL: z.string().url(),
  BROWSER_TEST_EMAIL: z.string().min(1),
  BROWSER_TEST_PASSWORD: z.string().min(1),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
})

export interface ReadBrowserTestEnvResult {
  readonly env: BrowserTestEnv | null
  readonly missing: boolean
}

export function readBrowserTestEnv(): ReadBrowserTestEnvResult {
  const parsed = EnvSchema.safeParse(process.env)
  if (!parsed.success) return { env: null, missing: true }
  const e = parsed.data
  return {
    env: {
      url: e.BROWSER_TEST_URL.replace(/\/+$/, ""),
      email: e.BROWSER_TEST_EMAIL,
      password: e.BROWSER_TEST_PASSWORD,
      supabaseUrl: e.SUPABASE_URL,
      supabaseAnonKey: e.SUPABASE_ANON_KEY,
      supabaseServiceRoleKey: e.SUPABASE_SERVICE_ROLE_KEY,
    },
    missing: false,
  }
}

export function logBrowserSkip(moduleLabel: string): undefined {
  console.log(
    `[browser skip] ${moduleLabel}: missing BROWSER_TEST_URL / BROWSER_TEST_EMAIL / BROWSER_TEST_PASSWORD / SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY`
  )
  return undefined
}

export interface RealUserOptInEnv {
  readonly url: string
  readonly email: string
  readonly password: string
  readonly supabaseUrl: string
  readonly supabaseAnonKey: string
}

const RealUserOptInSchema = z.object({
  BROWSER_TEST_URL: z.string().url(),
  BROWSER_TEST_REAL_USER_EMAIL: z.string().min(1),
  BROWSER_TEST_REAL_USER_PASSWORD: z.string().min(1),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
})

export function readRealUserOptInEnv(): { env: RealUserOptInEnv | null; missing: boolean } {
  const parsed = RealUserOptInSchema.safeParse(process.env)
  if (!parsed.success) return { env: null, missing: true }
  const e = parsed.data
  return {
    env: {
      url: e.BROWSER_TEST_URL.replace(/\/+$/, ""),
      email: e.BROWSER_TEST_REAL_USER_EMAIL,
      password: e.BROWSER_TEST_REAL_USER_PASSWORD,
      supabaseUrl: e.SUPABASE_URL,
      supabaseAnonKey: e.SUPABASE_ANON_KEY,
    },
    missing: false,
  }
}
