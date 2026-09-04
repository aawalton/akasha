import { describe, expect, test } from "bun:test"
import {
  parseRealUserSimAuthEnv,
  parseSimAuthEnv,
  SUPABASE_STORAGE_KEY,
} from "./sim-auth.module.code.ts"

describe("parseSimAuthEnv", () => {
  test("parses a complete env into the throwaway creds", () => {
    expect(
      parseSimAuthEnv({
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_ANON_KEY: "anon-key",
        BROWSER_TEST_EMAIL: "throwaway@example.com",
        BROWSER_TEST_PASSWORD: "pw",
      })
    ).toEqual({
      supabaseUrl: "https://supabase.alanwalton.com",
      anonKey: "anon-key",
      email: "throwaway@example.com",
      password: "pw",
    })
  })

  test("throws naming the missing vars (never a value)", () => {
    expect(() =>
      parseSimAuthEnv({
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_ANON_KEY: "anon-key",
      })
    ).toThrow(/BROWSER_TEST_EMAIL/)
  })
})

describe("parseRealUserSimAuthEnv", () => {
  test("parses a complete env into Alan's live (real-user) creds", () => {
    expect(
      parseRealUserSimAuthEnv({
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_ANON_KEY: "anon-key",
        BROWSER_TEST_REAL_USER_EMAIL: "alan@example.com",
        BROWSER_TEST_REAL_USER_PASSWORD: "pw",
      })
    ).toEqual({
      supabaseUrl: "https://supabase.alanwalton.com",
      anonKey: "anon-key",
      email: "alan@example.com",
      password: "pw",
    })
  })

  test("throws naming the missing real-user vars (never a value)", () => {
    expect(() =>
      parseRealUserSimAuthEnv({
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_ANON_KEY: "anon-key",
      })
    ).toThrow(/BROWSER_TEST_REAL_USER_EMAIL/)
  })

  test("does NOT accept the throwaway vars for the real-user path", () => {
    expect(() =>
      parseRealUserSimAuthEnv({
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_ANON_KEY: "anon-key",
        BROWSER_TEST_EMAIL: "throwaway@example.com",
        BROWSER_TEST_PASSWORD: "pw",
      })
    ).toThrow(/BROWSER_TEST_REAL_USER_EMAIL/)
  })
})

describe("SUPABASE_STORAGE_KEY", () => {
  test("is the supabase-ref localStorage key", () => {
    expect(SUPABASE_STORAGE_KEY).toBe("sb-supabase-auth-token")
  })
})
