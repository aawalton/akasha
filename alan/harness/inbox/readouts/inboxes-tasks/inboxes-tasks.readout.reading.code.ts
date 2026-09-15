import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"

const TASKS = "inbox-tasks"

export function tasksIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[TASKS])
}
