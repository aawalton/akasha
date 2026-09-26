import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const worldTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  url: z.string(),
})

export type WorldTreeRow = z.infer<typeof worldTreeRowFields> & {
  readonly children: readonly WorldTreeRow[]
}

const worldTreeRowSchema: z.ZodType<WorldTreeRow> = worldTreeRowFields.extend({
  children: z.lazy(() => z.array(worldTreeRowSchema).readonly()),
})

export const worldTreeStateSchema = z.object({
  roots: z.array(worldTreeRowSchema).readonly(),
  unreached: z.array(z.string()).readonly(),
})

export type WorldTreeState = z.infer<typeof worldTreeStateSchema>
