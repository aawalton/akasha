import { runAuditServing } from "akasha/checks/modules/audit-serving/audit-serving.module.code.ts"

export async function runService(): Promise<void> {
  await runAuditServing()
}
