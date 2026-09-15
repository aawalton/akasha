import { runAuditServing } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"

export async function runService(): Promise<void> {
  await runAuditServing()
}
