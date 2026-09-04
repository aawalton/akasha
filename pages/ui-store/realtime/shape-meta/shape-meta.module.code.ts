import { z } from "zod"

export const ShapeResumeStateSchema = z
  .object({
    offset: z.string(),
    handle: z.string(),
  })
  .strict()

export type ShapeResumeState = Readonly<z.infer<typeof ShapeResumeStateSchema>>
