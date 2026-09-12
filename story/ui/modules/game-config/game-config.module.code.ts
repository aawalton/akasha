import { z } from "zod"

export const STORY_READER_BASE_URL = z
  .string()
  .min(1)
  .transform((u) => u.replace(/\/+$/, ""))
  .optional()
  .parse(process.env["AWEN_STORY_READER_BASE_URL"])
