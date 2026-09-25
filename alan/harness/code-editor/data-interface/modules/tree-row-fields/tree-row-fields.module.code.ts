import { z } from "zod"

export const TREE_ROW_FIELDS = {
  key: z.string(),
  label: z.string(),
  at: z.string().nullable(),
  color: z.string().nullable(),
}
