import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  byCpu,
  type Chosen,
  type Costs,
  costOf,
  latestOf,
  linesOf,
  partsIn,
  type Run,
  rankedOf,
  runningOf,
  runsRead,
  totalOf,
  underRan,
  windowOf,
  withinOf,
} from "akasha/checks/modules/measuring/check-measuring.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { runWindow } from "akasha/commands/arguments/pages/run-window.argument.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { measureDeploy as page } from "akasha/commands/pages/measure/deploy/measure-deploy.command.ts"
import {
  everyOfType,
  listedAt,
} from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"

const DEPLOY = "deploy"

const ENTRIES = "entries"

const PAGE_TYPE = "page-type"

const WHOLE = "service-workstation"

const KINDS: readonly string[] = [
  "container-recipe",
  "eso-addon",
  "ios-app",
  "service-cluster",
  "service-inference",
  "service-workstation",
  "web-app",
]

interface Gathered {
  readonly runs: readonly Run[]
  readonly unread: readonly string[]
  readonly torn: readonly string[]
}

function putUpIn(root: string): readonly string[] {
  const found = new Set<string>()
  for (const kind of KINDS) {
    for (const one of everyOfType(root, kind)) found.add(one.path)
  }
  for (const one of listedAt(root, PAGE_TYPE, WHOLE)) found.add(one.path)
  return [...found].sort()
}

function besideIn(root: string, pages: readonly string[]): Gathered {
  const runs: Run[] = []
  const unread: string[] = []
  const torn: string[] = []
  for (const at of pages.flatMap((one) => partsIn(root, one, ENTRIES))) {
    let body: string
    try {
      body = readFileSync(join(root, at), "utf8")
    } catch {
      unread.push(at)
      continue
    }
    const read = runsRead(body)
    for (const one of read.runs) runs.push(one)
    if (read.torn > 0) torn.push(at)
  }
  return { runs, unread, torn }
}

function costsOf(gathered: Gathered, now: number, chosen: Chosen): Costs {
  const held = gathered.runs.filter((one) => one.phase === DEPLOY)
  const within =
    chosen.by === "period"
      ? withinOf(held, now, chosen.ms)
      : runningOf(held, rankedOf(latestOf(held), chosen.runs))
  const rows = [...underRan(within)].map(([ran, runs]) => costOf(ran, runs))
  return {
    checks: [...rows].sort(byCpu),
    total: totalOf(within),
    unread: gathered.unread,
    torn: gathered.torn,
  }
}

export function measureDeploy(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [runWindow])
  if ("refused" in read) return mistaking(read.refused)
  const chose = windowOf(read.taken.runWindow)
  if (chose.chosen === null) return mistaking(chose.refusals)
  const gathered = besideIn(given.root, putUpIn(given.root))
  return told([...linesOf(costsOf(gathered, Date.now(), chose.chosen), DEPLOY)])
}
