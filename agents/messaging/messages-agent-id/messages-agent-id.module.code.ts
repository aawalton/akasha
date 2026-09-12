import { requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export async function getAgentId(): Promise<string> {
  return requireEnv("AGENT_ID")
}
