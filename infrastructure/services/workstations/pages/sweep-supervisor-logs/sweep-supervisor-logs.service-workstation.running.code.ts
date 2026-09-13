import { sweepSupervisorLogs } from "akasha/agents/seats/supervisors/modules/supervisor-log-sweeping/supervisor-log-sweeping.module.code.ts"

const REMOVE = "--remove"

export function runService(): undefined {
  const code = sweepSupervisorLogs([REMOVE])
  if (code !== 0) process.exit(code)
}
