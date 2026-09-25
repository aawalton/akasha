import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const commandTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  kind: z.enum(["root", "namespace", "command"]),
  called: z.string(),
  detail: z.string().nullable(),
})

export type CommandTreeRow = z.infer<typeof commandTreeRowFields> & {
  readonly children: readonly CommandTreeRow[]
}

const commandTreeRowSchema: z.ZodType<CommandTreeRow> = commandTreeRowFields.extend({
  children: z.lazy(() => z.array(commandTreeRowSchema).readonly()),
})

export const commandTreeStateSchema = z.object({
  roots: z.array(commandTreeRowSchema).readonly(),
  unreached: z.array(z.string()).readonly(),
})

export type CommandTreeState = z.infer<typeof commandTreeStateSchema>
