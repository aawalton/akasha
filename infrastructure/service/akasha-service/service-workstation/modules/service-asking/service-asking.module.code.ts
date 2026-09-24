import { NO_CODE } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import type { Ran } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-installing/service-installing.module.code.ts"

export type Running = (args: readonly string[]) => Ran

export function asked(run: Running, args: readonly string[]): Ran {
  try {
    return run(args)
  } catch (thrown) {
    return { code: NO_CODE, out: whyOf(thrown) }
  }
}
