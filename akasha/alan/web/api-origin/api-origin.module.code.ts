import { z } from "zod"

export const API_ORIGIN: string = z.string().default("").parse(process.env.NEXT_PUBLIC_API_ORIGIN)
