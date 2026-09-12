import {
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  DRY_RUN,
  slugIn,
} from "akasha/commands/pages/infrastructure/service/service-slug-arguing/service-slug-arguing.module.code.ts"
import { systemctl } from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { readFor } from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import { installedUnitName } from "akasha/infrastructure/services/workstations/unit-writing/unit-writing.module.code.ts"

const NOT_ASKED = "dry-run\tsystemd was not asked; run it again without `--dry-run` to carry it out"

export function asked(told: string, argv: readonly string[], given: Given): Answer {
  const named = slugIn(argv, given.calledAs, [DRY_RUN])
  if ("refused" in named) return refused(named.refused, INPUT)

  const read = readFor(given.root, named.slug)
  if ("unnamed" in read) return refused(read.unnamed, INPUT)
  if ("refused" in read) return refused(read.refused, DATA)
  const found = read.services[0]
  if (found === undefined) {
    return refused(`no workstation service is slugged \`${named.slug}\``, INPUT)
  }

  const unit = installedUnitName(found)
  if (named.dryRun) return { report: [`${told}\t${unit}`, NOT_ASKED], refusals: [], code: OK }

  const done = systemctl([told, unit])
  if (done.code !== 0) {
    return { report: [], refusals: [`${unit} was refused: ${done.out}`], code: OPERATIONAL }
  }
  return { report: [`${told}\t${unit}`], refusals: [], code: OK }
}
