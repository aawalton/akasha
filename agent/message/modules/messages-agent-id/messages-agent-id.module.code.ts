import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"

export async function getAgentId(): Promise<string> {
  return requireEnv("AGENT_ID")
}
