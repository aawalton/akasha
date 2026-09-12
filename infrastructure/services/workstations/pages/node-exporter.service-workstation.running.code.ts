import { runBinary } from "akasha/infrastructure/services/workstations/modules/binary-running/binary-running.module.code.ts"

const ARGV = ["/home/linuxbrew/.linuxbrew/bin/node_exporter", "--web.listen-address=:9100"]

export async function runService(): Promise<never> {
  return await runBinary(ARGV)
}
