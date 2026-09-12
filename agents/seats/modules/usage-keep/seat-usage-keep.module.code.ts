import {
  keepSeatUsage,
  type UsageReading,
  usageIn,
} from "akasha/agents/seats/modules/usage/seat-usage.module.code.ts"

function parseUsageReading(held: unknown): UsageReading {
  return usageIn(held)
}

async function keepUsageFromStdin(agent: string): Promise<undefined> {
  if (agent === "") return
  try {
    const said: unknown = JSON.parse(await Bun.stdin.text())
    keepSeatUsage(agent, parseUsageReading(said))
  } catch {
    return
  }
}

if (import.meta.main) await keepUsageFromStdin(process.argv[2] ?? "")
