import { linesOf, windowOf } from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { measureDeploy as page } from "akasha/command/pages/measure/deploy/measure-deploy.command.ts"
import {
  besideIn,
  costsOf,
} from "akasha/command/pages/measure/modules/gathering/measure-gathering.module.code.ts"
import {
  everyOfType,
  listedAt,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const DEPLOY = "deploy"

const PAGE_TYPE = "page-type"

const WHOLE = "service-workstation"

const KINDS: readonly string[] = [
  "container-recipe",
  "ios-app",
  "service-cluster",
  "service-inference",
  "service-workstation",
  "temper-addon",
  "web-app",
]

function putUpIn(root: string): readonly string[] {
  const found = new Set<string>()
  for (const kind of KINDS) {
    for (const one of everyOfType(root, kind)) found.add(one.path)
  }
  for (const one of listedAt(root, PAGE_TYPE, WHOLE)) found.add(one.path)
  return [...found].sort()
}

export function measureDeploy(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const gathered = besideIn(given.root, putUpIn(given.root))
  const costs = costsOf(gathered, Date.now(), chose.chosen, (one) => one.phase === DEPLOY)
  return told([...linesOf(costs, DEPLOY)])
}
