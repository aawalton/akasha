import { z } from "zod"

export const TREE_ROW_FIELDS = {
  key: z.string(),
  label: z.string(),
  at: z.string().nullable(),
  color: z.string().nullable(),
}

const treeRowSchema = z.object(TREE_ROW_FIELDS)

export type TreeRow = Readonly<z.infer<typeof treeRowSchema>>
