import { z } from "zod"

export const API_ORIGIN: string = z
  .string()
  .default("")
  .parse(import.meta.env.VITE_API_ORIGIN)
