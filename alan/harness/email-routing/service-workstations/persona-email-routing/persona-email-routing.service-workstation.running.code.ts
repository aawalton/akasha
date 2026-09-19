import { runPersonaRouting } from "akasha/alan/harness/email-routing/modules/persona-routing-run/persona-routing-run.module.code.ts"

export async function runService(): Promise<void> {
  await runPersonaRouting()
}
