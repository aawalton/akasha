import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const refusalTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  refusals: z.number(),
})

export type RefusalTreeRow = z.infer<typeof refusalTreeRowFields> & {
  readonly children: readonly RefusalTreeRow[]
}

const refusalTreeRowSchema: z.ZodType<RefusalTreeRow> = refusalTreeRowFields.extend({
  children: z.lazy(() => z.array(refusalTreeRowSchema).readonly()),
})

export const refusalTreeStateSchema = z.object({
  roots: z.array(refusalTreeRowSchema).readonly(),
  unreached: z.array(z.string()).readonly(),
})

export type RefusalTreeState = z.infer<typeof refusalTreeStateSchema>
