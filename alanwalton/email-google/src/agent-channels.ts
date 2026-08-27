import { askNamed } from "@shared/pages-query"
import { z } from "zod"

const PERSONA_QUERY = "persona-all"

export const agentChannelRowSchema = z.object({
  slug: z.string().optional(),
  emailAddress: z.string().optional(),
})
export type AgentChannelRow = z.infer<typeof agentChannelRowSchema>

export function projectAgentChannels(
  rows: readonly AgentChannelRow[]
): ReadonlyMap<string, string> {
  const out = new Map<string, string>()
  for (const row of rows) {
    if (row.slug === undefined || row.slug.length === 0) continue
    const address = (row.emailAddress ?? "").trim().toLowerCase()
    if (address.length === 0) continue
    out.set(address, row.slug)
  }
  return out
}

export async function loadAgentChannels(): Promise<ReadonlyMap<string, string>> {
  const asked = await askNamed(PERSONA_QUERY)
  if (!asked.ok) throw new Error(`agent channels went unread: ${asked.why}`)
  const parsed: AgentChannelRow[] = []
  for (const row of asked.answer.rows) {
    const slug = row.values["slug"]
    const emailAddress = row.values["email-address"]
    const result = agentChannelRowSchema.safeParse({ slug, emailAddress })
    if (result.success) parsed.push(result.data)
  }
  return projectAgentChannels(parsed)
}
