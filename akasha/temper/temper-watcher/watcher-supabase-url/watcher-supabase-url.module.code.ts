import { z } from "zod"

declare const __SUPABASE_URL__: string
declare const __SUPABASE_ANON_KEY__: string

export const SUPABASE_URL =
  typeof __SUPABASE_URL__ !== "undefined" && __SUPABASE_URL__ !== ""
    ? __SUPABASE_URL__
    : z.string().default("https://supabase.alanwalton.com").parse(process.env.SUPABASE_URL)

export const SUPABASE_ANON_KEY =
  typeof __SUPABASE_ANON_KEY__ !== "undefined" && __SUPABASE_ANON_KEY__ !== ""
    ? __SUPABASE_ANON_KEY__
    : z.string().default("").parse(process.env.SUPABASE_ANON_KEY)
