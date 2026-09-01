import { createBrowserClient as createSsrBrowserClient } from "@supabase/ssr"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { z } from "zod"
import { resolveBrowserAuthMode } from "../auth-mode/auth-mode.module.code.ts"
import { parseSupabaseCookieOptions } from "../cookie-options/cookie-options.module.code.ts"

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

export function createBrowserClient(
  options: CreateBrowserClientOptions = {}
): SupabaseBrowserClient {
  const url = options.url ?? OPTIONAL_ENV_SCHEMA.parse(process.env.NEXT_PUBLIC_SUPABASE_URL)
  const anonKey =
    options.anonKey ?? OPTIONAL_ENV_SCHEMA.parse(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  if (url == null) {
    throw new Error("createBrowserClient: NEXT_PUBLIC_SUPABASE_URL is not set")
  }
  if (anonKey == null) {
    throw new Error("createBrowserClient: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set")
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
    cookieOptions: parseSupabaseCookieOptions(process.env.NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN),
  })
}

let singleton: SupabaseBrowserClient | null = null

export function getBrowserClient(): SupabaseBrowserClient {
  if (!singleton) {
    singleton = createBrowserClient()
  }
  return singleton
}
