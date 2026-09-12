import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Linking } from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import type { Ran } from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { NO_CODE } from "akasha/utils/run/running/running.module.code.ts"

const A_TIMER = ".timer"

const RESTART = "try-restart"

const ARMED = "armed"

const STARTED = "started"

export const PUT_RIGHT = "`akasha deploy service-workstation` puts it right"

export type Starting = {
  readonly unit: string
  readonly why: string
}

export type Running = (args: readonly string[]) => Ran

export function asked(run: Running, args: readonly string[]): Ran {
  try {
    return run(args)
  } catch (thrown) {
    return { code: NO_CODE, out: whyOf(thrown) }
  }
}

export function howOf(unit: string): string {
  return unit.endsWith(A_TIMER) ? ARMED : STARTED
}

export function startedOver(run: Running, starting: readonly Starting[]): Linking {
  const said: string[] = []
  const wrong: string[] = []
  for (const one of starting) {
    const done = asked(run, [RESTART, one.unit])
    if (done.code !== 0) {
      wrong.push(`${one.unit} runs as it did, and ${one.why} — ${done.out}; ${PUT_RIGHT}`)
      continue
    }
    said.push(`${howOf(one.unit)} ${one.unit} again — ${one.why}`)
  }
  return { said, wrong }
}
