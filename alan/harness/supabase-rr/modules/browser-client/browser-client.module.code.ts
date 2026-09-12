import { createBrowserClient as createSsrBrowserClient } from "@supabase/ssr"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { parseSupabaseCookieOptions } from "akasha/alan/harness/supabase-rr/cookie-options/cookie-options.module.code.ts"
import { resolveBrowserAuthMode } from "akasha/alan/harness/supabase-rr/modules/auth-mode/auth-mode.module.code.ts"
import { z } from "zod"

const OPTIONAL_ENV_SCHEMA = z.string().min(1).optional()

export type SupabaseBrowserClient = SupabaseClient

export type BrowserAuthStorage = {
  getItem: (key: string) => string | null | Promise<string | null>
  setItem: (key: string, value: string) => void | Promise<void>
  removeItem: (key: string) => void | Promise<void>
}

export type CreateBrowserClientOptions = {
  url?: string
  anonKey?: string
  protocol?: string
  storage?: BrowserAuthStorage
}

function currentProtocol(): string | undefined {
  return typeof window !== "undefined" ? window.location.protocol : undefined
}

function createBrowserClient(options: CreateBrowserClientOptions = {}): SupabaseBrowserClient {
  const url = options.url ?? OPTIONAL_ENV_SCHEMA.parse(import.meta.env.VITE_SUPABASE_URL)
  const anonKey =
    options.anonKey ?? OPTIONAL_ENV_SCHEMA.parse(import.meta.env.VITE_SUPABASE_ANON_KEY)
  if (url == null) {
    throw new Error("createBrowserClient: VITE_SUPABASE_URL is not set")
  }
  if (anonKey == null) {
    throw new Error("createBrowserClient: VITE_SUPABASE_ANON_KEY is not set")
  }

  const mode = resolveBrowserAuthMode(options.protocol ?? currentProtocol())
  if (mode === "capacitor-local") {
    const storage =
      options.storage ?? (typeof window !== "undefined" ? window.localStorage : undefined)
    return createClient(url, anonKey, {
      auth: {
        storage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        flowType: "pkce",
      },
    })
  }

  return createSsrBrowserClient(url, anonKey, {
    cookieOptions: parseSupabaseCookieOptions(import.meta.env.VITE_SUPABASE_COOKIE_DOMAIN),
  })
}

let singleton: SupabaseBrowserClient | null = null

export function getBrowserClient(): SupabaseBrowserClient {
  if (!singleton) {
    singleton = createBrowserClient()
  }
  return singleton
}
