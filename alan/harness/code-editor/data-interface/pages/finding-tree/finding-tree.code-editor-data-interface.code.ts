import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const findingTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  findings: z.number(),
})

type FindingTreeRow = z.infer<typeof findingTreeRowFields> & {
  readonly children: readonly FindingTreeRow[]
}

const findingTreeRowSchema: z.ZodType<FindingTreeRow> = findingTreeRowFields.extend({
  children: z.lazy(() => z.array(findingTreeRowSchema).readonly()),
})

export const findingTreeStateSchema = z.object({
  roots: z.array(findingTreeRowSchema).readonly(),
  unreached: z.array(z.string()).readonly(),
})

export type FindingTreeState = z.infer<typeof findingTreeStateSchema>
