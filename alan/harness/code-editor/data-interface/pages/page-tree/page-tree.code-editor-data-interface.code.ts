import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const pageTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  detail: z.string().nullable(),
})

export type PageTreeRow = z.infer<typeof pageTreeRowFields> & {
  readonly children: readonly PageTreeRow[]
}

const pageTreeRowSchema: z.ZodType<PageTreeRow> = pageTreeRowFields.extend({
  children: z.lazy(() => z.array(pageTreeRowSchema).readonly()),
})

export const pageTreeStateSchema = z.object({
  roots: z.array(pageTreeRowSchema).readonly(),
  unreached: z.array(z.string()).readonly(),
})

export type PageTreeState = z.infer<typeof pageTreeStateSchema>
