import { keepSeatUsage, usageIn } from "../seat-usage/seat-usage.module.code.ts"

export async function keepUsageFromStdin(agent: string): Promise<undefined> {
  if (agent === "") return
  try {
    keepSeatUsage(agent, usageIn(JSON.parse(await Bun.stdin.text())))
  } catch {
    return
  }
}

if (import.meta.main) await keepUsageFromStdin(process.argv[2] ?? "")
