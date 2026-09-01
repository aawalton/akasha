import {
  homeAt,
  installing,
  ourInstalled,
  ownedByService,
  planFor,
} from "@akasha/service-system/service-installing"
import { everyStanding, standingFor } from "@akasha/service-system/service-reading"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"

const INPUT = 1
const DATA = 2
const OPERATIONAL = 3
const INSTALL = "install"
const ALL = "--all"
const DRY_RUN = "--dry-run"

export function service(argv: readonly string[], given: Given): Answer {
  const act = argv[0]
  if (act === undefined) {
    return refused("`akasha service` takes an act, which is `install`", INPUT)
  }
  if (act !== INSTALL) {
    return refused(`\`${act}\` is no act of \`akasha service\`, which takes \`install\``, INPUT)
  }

  const rest = argv.slice(1)
  const dryRun = rest.includes(DRY_RUN)
  const all = rest.includes(ALL)
  const named = rest.filter((one) => !one.startsWith("-"))
  const strange = rest.find((one) => one.startsWith("-") && one !== ALL && one !== DRY_RUN)

  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`akasha service install\` takes`, INPUT)
  }

  const slug = named[0]
  if (slug === undefined && !all) {
    return refused("name the service to install by its slug, or say `--all` for every one", INPUT)
  }
  if (slug !== undefined && all) {
    return refused(
      `\`--all\` reaches every service, so naming \`${slug}\` beside it says two things`,
      INPUT
    )
  }
  if (named.length > 1) {
    return refused("this installs one service at a time, or every one with `--all`", INPUT)
  }

  const read = slug === undefined ? everyStanding(given.root) : standingFor(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)

  const home = homeAt()
  if (home === null) {
    return refused("no home directory is stated, so no unit has anywhere to stand", OPERATIONAL)
  }

  const standing = ourInstalled(home)
  const owned = slug === undefined ? standing : ownedByService(standing, slug)
  const plan = planFor(read.standing, owned)

  const report: string[] = []
  for (const name of plan.write.keys()) report.push(`write\t${name}`)
  for (const name of plan.enable) report.push(`enable\t${name}`)
  for (const name of plan.stop) report.push(`stop\t${name}`)
  for (const name of plan.remove) report.push(`remove\t${name}`)

  if (dryRun) {
    report.push("dry-run\tnothing was written; run it again without `--dry-run` to carry it out")
    return { report, refusals: [], code: 0 }
  }

  const done = installing(home, plan)
  const said = [...report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return { report: said, refusals: done.refused, code: OPERATIONAL }
  return { report: said, refusals: [], code: 0 }
}
