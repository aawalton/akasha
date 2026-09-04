import {
  homeAt,
  installing,
  ourInstalled,
  ownedByService,
  planFor,
  systemctl,
} from "@akasha/service-system/service-installing"
import { everyService, readFor } from "@akasha/service-system/service-reading"
import { installedUnitName } from "@akasha/service-system/unit-writing"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"

const INPUT = 1
const DATA = 2
const OPERATIONAL = 3
const INSTALL = "install"
const RESTART = "restart"
const START = "start"
const STOP = "stop"
const ASKED: readonly string[] = [RESTART, START, STOP]
const ACTS: readonly string[] = [INSTALL, ...ASKED]
const ALL = "--all"
const DRY_RUN = "--dry-run"
const NOT_ASKED = "dry-run\tsystemd was not asked; run it again without `--dry-run` to carry it out"
const NOT_WRITTEN = "dry-run\tnothing was written; run it again without `--dry-run` to carry it out"

function acts(): string {
  return ACTS.map((one) => `\`${one}\``).join(", ")
}

function installed(argv: readonly string[], given: Given): Answer {
  const dryRun = argv.includes(DRY_RUN)
  const all = argv.includes(ALL)
  const named = argv.filter((one) => !one.startsWith("-"))
  const strange = argv.find((one) => one.startsWith("-") && one !== ALL && one !== DRY_RUN)

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

  const read = slug === undefined ? everyService(given.root) : readFor(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)

  const home = homeAt()
  if (home === null) {
    return refused("no home directory is stated, so no unit has anywhere to stand", OPERATIONAL)
  }

  const owned = slug === undefined ? ourInstalled(home) : ownedByService(ourInstalled(home), slug)
  const plan = planFor(read.services, owned)

  const report: string[] = []
  for (const name of plan.write.keys()) report.push(`write\t${name}`)
  for (const name of plan.enable) report.push(`enable\t${name}`)
  for (const name of plan.stop) report.push(`stop\t${name}`)
  for (const name of plan.remove) report.push(`remove\t${name}`)

  if (dryRun) return { report: [...report, NOT_WRITTEN], refusals: [], code: 0 }

  const done = installing(home, plan)
  const said = [...report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return { report: said, refusals: done.refused, code: OPERATIONAL }
  return { report: said, refusals: [], code: 0 }
}

function asked(act: string, argv: readonly string[], given: Given): Answer {
  const dryRun = argv.includes(DRY_RUN)
  const named = argv.filter((one) => !one.startsWith("-"))
  const strange = argv.find((one) => one.startsWith("-") && one !== DRY_RUN)

  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`akasha service ${act}\` takes`, INPUT)
  }

  const slug = named[0]
  if (slug === undefined) return refused(`name the service to ${act} by its slug`, INPUT)
  if (named.length > 1) return refused(`this ${act}s one service at a time`, INPUT)

  const read = readFor(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  const one = read.services[0]
  if (one === undefined) return refused(`no workstation service is slugged \`${slug}\``, DATA)

  const unit = installedUnitName(one)
  if (dryRun) return { report: [`${act}\t${unit}`, NOT_ASKED], refusals: [], code: 0 }

  const done = systemctl([act, unit])
  if (done.code !== 0) {
    return { report: [], refusals: [`${unit} was refused: ${done.out}`], code: OPERATIONAL }
  }
  return { report: [`${act}\t${unit}`], refusals: [], code: 0 }
}

export function service(argv: readonly string[], given: Given): Answer {
  const act = argv[0]
  if (act === undefined) {
    return refused(`\`akasha service\` takes an act, which is ${acts()}`, INPUT)
  }
  if (!ACTS.includes(act)) {
    return refused(`\`${act}\` is no act of \`akasha service\`, which takes ${acts()}`, INPUT)
  }
  const rest = argv.slice(1)
  return act === INSTALL ? installed(rest, given) : asked(act, rest, given)
}
