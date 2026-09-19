import { getMountainMorningDayStr } from "akasha/alan/harness/day-boundary/modules/mountain-day/mountain-day.module.code.ts"
import { selectionPolicy } from "akasha/alan/value/health/fitness/selection-policy/pages/selection-policy.selection-policy.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { fitnessCooldown as page } from "akasha/command/pages/fitness/cooldown/fitness-cooldown.command.ts"
import {
  type Cool,
  cooledOf,
  coolFor,
  takenOn,
  workedOn,
} from "akasha/command/pages/fitness/cooldown/modules/cooling/cooling.module.code.ts"
import {
  coveredBy,
  KIT_TYPE,
  kitIn,
} from "akasha/command/pages/fitness/modules/kit-loading/kit-loading.module.code.ts"
import { weekIn } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

export function coolingIn(root: string, now: Date): Cool | null {
  const today = getMountainMorningDayStr(now)
  const week = weekIn(root, today, selectionPolicy.nearFailureRpeFloor)
  const kit = kitIn(valuesOfType(root, KIT_TYPE).map((one) => one.value))
  return coolFor(week.movements, {
    stretches: selectionPolicy.stretchesCoolingDown,
    seconds: selectionPolicy.secondsHoldingStretch,
    worked: workedOn(week.sets, today, week.movements),
    done: takenOn(week.sets, today),
    covered: coveredBy(kit),
  })
}

export function fitnessCooldown(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const cool = coolingIn(given.root, new Date())
    if (read.taken.json) return told([JSON.stringify(cool)])
    return told([...cooledOf(cool)])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
