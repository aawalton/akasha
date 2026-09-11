import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { namesDrawn } from "akasha/commands/pages/infrastructure/service/name-drawing/name-drawing.module.code.ts"
import {
  homeAt,
  installing,
  ourInstalled,
  planFor,
  systemctl,
} from "akasha/services/workstation-services/service-installing/service-installing.module.code.ts"
import {
  everyService,
  readFor,
} from "akasha/services/workstation-services/service-reading/service-reading.module.code.ts"
import { installedUnitName } from "akasha/services/workstation-services/unit-writing/unit-writing.module.code.ts"

const INPUT = 1
const DATA = 2
const OPERATIONAL = 3
const SWEEP = "sweep"
const RESTART = "restart"
const START = "start"
const STOP = "stop"
const ASKED: readonly string[] = [RESTART, START, STOP]
const ACTS: readonly string[] = [SWEEP, ...ASKED]
const DRY_RUN = "--dry-run"
const NOT_ASKED = "dry-run\tsystemd was not asked; run it again without `--dry-run` to carry it out"
const NOT_SWEPT =
  "dry-run\tnothing was taken away; run it again without `--dry-run` to carry it out"
const ALL_ACCOUNTED = "nothing\tevery unit akasha owns is accounted for by a page"

function acts(): string {
  return namesDrawn(ACTS)
}

function swept(argv: readonly string[], given: Given): Answer {
  const dryRun = argv.includes(DRY_RUN)
  const named = argv.filter((one) => !one.startsWith("-"))
  const strange = argv.find((one) => one.startsWith("-") && one !== DRY_RUN)

  if (strange !== undefined) {
    return refused(`\`${strange}\` is nothing \`akasha infrastructure service sweep\` takes`, INPUT)
  }

  const slug = named[0]
  if (slug !== undefined) {
    return refused(
      `a sweep reaches every unit akasha owns rather than one service, and \`${slug}\` was named`,
      INPUT
    )
  }

  const read = everyService(given.root)
  if ("refused" in read) return refused(read.refused, DATA)

  const home = homeAt()
  if (home === null) {
    return refused("no home directory is stated, so no unit has anywhere to sit", OPERATIONAL)
  }

  const remove = planFor(read.services, ourInstalled(home)).remove
  if (remove.length === 0) return { report: [ALL_ACCOUNTED], refusals: [], code: 0 }

  const report = remove.map((name) => `remove\t${name}`)
  if (dryRun) return { report: [...report, NOT_SWEPT], refusals: [], code: 0 }

  const done = installing(home, { write: new Map(), enable: [], stop: [], remove })
  const said = [...report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return { report: said, refusals: done.refused, code: OPERATIONAL }
  return { report: said, refusals: [], code: 0 }
}

function asked(act: string, argv: readonly string[], given: Given): Answer {
  const dryRun = argv.includes(DRY_RUN)
  const named = argv.filter((one) => !one.startsWith("-"))
  const strange = argv.find((one) => one.startsWith("-") && one !== DRY_RUN)

  if (strange !== undefined) {
    return refused(
      `\`${strange}\` is nothing \`akasha infrastructure service ${act}\` takes`,
      INPUT
    )
  }

  const slug = named[0]
  if (slug === undefined) return refused(`name the service to ${act} by its slug`, INPUT)
  if (named.length > 1) return refused(`this ${act}s one service at a time`, INPUT)

  const read = readFor(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  const found = read.services[0]
  if (found === undefined) return refused(`no workstation service is slugged \`${slug}\``, DATA)

  const unit = installedUnitName(found)
  if (dryRun) return { report: [`${act}\t${unit}`, NOT_ASKED], refusals: [], code: 0 }

  const done = systemctl([act, unit])
  if (done.code !== 0) {
    return { report: [], refusals: [`${unit} was refused: ${done.out}`], code: OPERATIONAL }
  }
  return { report: [`${act}\t${unit}`], refusals: [], code: 0 }
}

export function infrastructureService(argv: readonly string[], given: Given): Answer {
  const act = argv[0]
  if (act === undefined) {
    return refused(`\`akasha infrastructure service\` takes an act, which is ${acts()}`, INPUT)
  }
  if (!ACTS.includes(act)) {
    return refused(
      `\`${act}\` is no act of \`akasha infrastructure service\`, which takes ${acts()}`,
      INPUT
    )
  }
  const rest = argv.slice(1)
  return act === SWEEP ? swept(rest, given) : asked(act, rest, given)
}
