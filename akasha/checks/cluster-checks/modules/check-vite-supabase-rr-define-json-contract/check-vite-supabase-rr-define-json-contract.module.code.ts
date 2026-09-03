import { z } from "zod"

export const ViteSupabaseRrDefineViolationContractSchema = z
  .object({ file: z.string(), message: z.string() })
  .strict()

export type ViteSupabaseRrDefineViolation = z.infer<
  typeof ViteSupabaseRrDefineViolationContractSchema
>
