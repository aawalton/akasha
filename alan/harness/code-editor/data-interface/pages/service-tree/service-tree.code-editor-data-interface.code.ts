import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const serviceTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  kind: z.enum(["root", "kind", "service"]),
  detail: z.string().nullable(),
})

export type ServiceTreeRow = z.infer<typeof serviceTreeRowFields> & {
  readonly children: readonly ServiceTreeRow[]
}

const serviceTreeRowSchema: z.ZodType<ServiceTreeRow> = serviceTreeRowFields.extend({
  children: z.lazy(() => z.array(serviceTreeRowSchema).readonly()),
})

export const serviceTreeStateSchema = z.object({
  roots: z.array(serviceTreeRowSchema).readonly(),
})

export type ServiceTreeState = z.infer<typeof serviceTreeStateSchema>
