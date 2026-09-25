import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const domainTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  persona: z.string().nullable(),
  position: z.number().nullable(),
})

export type DomainTreeRow = z.infer<typeof domainTreeRowFields> & {
  readonly children: readonly DomainTreeRow[]
}

const domainTreeRowSchema: z.ZodType<DomainTreeRow> = domainTreeRowFields.extend({
  children: z.lazy(() => z.array(domainTreeRowSchema).readonly()),
})

export const domainTreeStateSchema = z.object({
  roots: z.array(domainTreeRowSchema).readonly(),
  unreached: z.array(z.string()).readonly(),
})

export type DomainTreeState = z.infer<typeof domainTreeStateSchema>
