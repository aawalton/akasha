import { contextTokensOf, modelOf } from "../seat-usage/seat-usage.module.code.ts"

export function usageLineFor(agent: string): string {
  const model = agent === "" ? null : modelOf(agent)
  const tokens = agent === "" ? null : contextTokensOf(agent)
  if (model === null && tokens === null) return "{}\n"
  const read = tokens?.at ?? model?.at ?? null
  return `${JSON.stringify({
    agent_id: agent,
    model: model?.value ?? null,
    context_tokens: tokens === null ? null : Number(tokens.value),
    read_at: read === null ? null : new Date(read).toISOString(),
  })}\n`
}

if (import.meta.main) process.stdout.write(usageLineFor(process.argv[2] ?? ""))
