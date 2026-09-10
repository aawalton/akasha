import { keepSeatUsage, type UsageReading, usageIn } from "../seat-usage/seat-usage.module.code.ts"

function parseUsageReading(held: unknown): UsageReading {
  return usageIn(held)
}

export async function keepUsageFromStdin(agent: string): Promise<undefined> {
  if (agent === "") return
  try {
    const said: unknown = JSON.parse(await Bun.stdin.text())
    keepSeatUsage(agent, parseUsageReading(said))
  } catch {
    return
  }
}

if (import.meta.main) await keepUsageFromStdin(process.argv[2] ?? "")
