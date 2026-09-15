import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import type { Ran } from "akasha/infrastructure/service/workstation/modules/service-installing/service-installing.module.code.ts"
import { NO_CODE } from "akasha/utils/run/modules/running/running.module.code.ts"

export type Running = (args: readonly string[]) => Ran

export function asked(run: Running, args: readonly string[]): Ran {
  try {
    return run(args)
  } catch (thrown) {
    return { code: NO_CODE, out: whyOf(thrown) }
  }
}
