import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const gapTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  gaps: z.number(),
})

export type GapTreeRow = z.infer<typeof gapTreeRowFields> & {
  readonly children: readonly GapTreeRow[]
}

const gapTreeRowSchema: z.ZodType<GapTreeRow> = gapTreeRowFields.extend({
  children: z.lazy(() => z.array(gapTreeRowSchema).readonly()),
})

export const gapTreeStateSchema = z.object({
  roots: z.array(gapTreeRowSchema).readonly(),
  unreached: z.array(z.string()).readonly(),
})

export type GapTreeState = z.infer<typeof gapTreeStateSchema>
