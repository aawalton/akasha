import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { supabaseClientEnvDefine } from "./vite"

const ENV_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN",
  "NEXT_PUBLIC_API_ORIGIN",
] as const

const ENV_VALUE_SCHEMA = z.string().optional()

describe("supabaseClientEnvDefine", () => {
  const saved: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>> = {}

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      saved[key] = ENV_VALUE_SCHEMA.parse(process.env[key])
      delete process.env[key]
    }
  })

  afterEach(() => {
    for (const key of ENV_KEYS) {
      const prior = saved[key]
      if (prior === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = prior
      }
    }
  })

  test("returns JSON-stringified values keyed under process.env when all vars are set", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://supabase.alanwalton.com"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-abc123"
    process.env.NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN = ".alanwalton.com"

    expect(supabaseClientEnvDefine()).toEqual({
      "process.env.NEXT_PUBLIC_SUPABASE_URL": JSON.stringify("https://supabase.alanwalton.com"),
      "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY": JSON.stringify("anon-key-abc123"),
      "process.env.NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN": JSON.stringify(".alanwalton.com"),
      "process.env.NEXT_PUBLIC_API_ORIGIN": JSON.stringify(""),
    })
  })

  test("serializes COOKIE_DOMAIN as undefined-literal when unset (matches cookie-options unset path)", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://supabase.alanwalton.com"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-abc123"

    const result = supabaseClientEnvDefine()
    expect(result["process.env.NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN"]).toBe(JSON.stringify(undefined))
  })

  test("serializes COOKIE_DOMAIN as empty-string literal when set to empty string (host-only cookie path)", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://supabase.alanwalton.com"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-abc123"
    process.env.NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN = ""

    const result = supabaseClientEnvDefine()
    expect(result["process.env.NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN"]).toBe(JSON.stringify(""))
  })

  test("inlines NEXT_PUBLIC_API_ORIGIN as an empty-string literal when unset (relative same-origin, SSR web build)", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://supabase.alanwalton.com"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-abc123"

    const result = supabaseClientEnvDefine()
    expect(result["process.env.NEXT_PUBLIC_API_ORIGIN"]).toBe(JSON.stringify(""))
  })

  test("inlines NEXT_PUBLIC_API_ORIGIN as the absolute origin when set (cross-origin capacitor SPA build)", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://supabase.alanwalton.com"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-abc123"
    process.env.NEXT_PUBLIC_API_ORIGIN = "https://alanwalton.com"

    const result = supabaseClientEnvDefine()
    expect(result["process.env.NEXT_PUBLIC_API_ORIGIN"]).toBe(
      JSON.stringify("https://alanwalton.com")
    )
  })

  test("throws when NEXT_PUBLIC_SUPABASE_URL is unset, naming the missing variable", () => {
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-abc123"
    expect(() => supabaseClientEnvDefine()).toThrow(/NEXT_PUBLIC_SUPABASE_URL/)
  })

  test("throws when NEXT_PUBLIC_SUPABASE_ANON_KEY is unset, naming the missing variable", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://supabase.alanwalton.com"
    expect(() => supabaseClientEnvDefine()).toThrow(/NEXT_PUBLIC_SUPABASE_ANON_KEY/)
  })

  test("throws when NEXT_PUBLIC_SUPABASE_URL is an empty string", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ""
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-abc123"
    expect(() => supabaseClientEnvDefine()).toThrow(/NEXT_PUBLIC_SUPABASE_URL/)
  })
})
