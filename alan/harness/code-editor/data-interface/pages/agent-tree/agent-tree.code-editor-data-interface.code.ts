import { TREE_ROW_FIELDS } from "akasha/alan/harness/code-editor/data-interface/modules/tree-row-fields/tree-row-fields.module.code.ts"
import { z } from "zod"

const agentTreeRowFields = z.object({
  ...TREE_ROW_FIELDS,
  kind: z.enum(["root", "seat", "subagent"]),
  live: z.boolean(),
  stopped: z.boolean(),
  place: z.enum(["interactive", "headless"]).nullable(),
  state: z.string().nullable(),
  waitingOn: z.string().nullable(),
})

type AgentTreeRow = z.infer<typeof agentTreeRowFields> & {
  readonly children: readonly AgentTreeRow[]
}

const agentTreeRowSchema: z.ZodType<AgentTreeRow> = agentTreeRowFields.extend({
  children: z.lazy(() => z.array(agentTreeRowSchema).readonly()),
})

export const agentTreeStateSchema = z.object({
  roots: z.array(agentTreeRowSchema).readonly(),
  alanPrincipalCount: z.number(),
  runningCount: z.number(),
  unreadSeats: z.number(),
})

export type AgentTreeState = z.infer<typeof agentTreeStateSchema>
