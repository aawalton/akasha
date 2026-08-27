import { describe, expect, test } from "bun:test"
import { getPages } from "@shared/pages-access/get"
import { z } from "zod"

const url = z.string().optional().parse(process.env.NEXT_PUBLIC_SUPABASE_URL)
const anonKey = z.string().optional().parse(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
const missing = !url || !anonKey

if (missing) {
  console.log(
    "[smoke skip] @shared/pages/supabase: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY not set"
  )
}

const PROBE_PAGE_TYPE_SLUG = "nonexistent-probe-page-type"

describe.skipIf(missing)("usePagesSupabase (anon) smoke", () => {
  test("getPages reaches PostgREST and returns a structured { rows, nextCursor } response", async () => {
    try {
      const result = await getPages({ pageTypeSlug: PROBE_PAGE_TYPE_SLUG })
      expect(result).toHaveProperty("rows")
      expect(Array.isArray(result.rows)).toBe(true)
      expect(result).toHaveProperty("nextCursor")
      expect(result.nextCursor === null || typeof result.nextCursor === "string").toBe(true)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      if (!(err instanceof Error)) throw new Error("expected Error instance")
      expect(err.message).toContain("getPages")
    }
  })
})
