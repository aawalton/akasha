import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const workTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  kind: z.enum(["root", "initiative", "intent"]),
  detail: z.string().nullable(),
  note: z.string().nullable(),
})

export type WorkTreeRow = z.infer<typeof workTreeRowFields> & {
  readonly children: readonly WorkTreeRow[]
}

const workTreeRowSchema: z.ZodType<WorkTreeRow> = workTreeRowFields.extend({
  children: z.lazy(() => z.array(workTreeRowSchema).readonly()),
})

export const workTreeStateSchema = z.object({
  roots: z.array(workTreeRowSchema).readonly(),
})

export type WorkTreeState = z.infer<typeof workTreeStateSchema>
