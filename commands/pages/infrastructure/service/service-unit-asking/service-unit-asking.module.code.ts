import {
  DATA,
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { systemctl } from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import { readFor } from "akasha/infrastructure/services/workstations/service-reading/service-reading.module.code.ts"
import { installedUnitName } from "akasha/infrastructure/services/workstations/unit-writing/unit-writing.module.code.ts"

const NOT_ASKED = "dry-run\tsystemd was not asked; run it again without `--dry-run` to carry it out"

export type Named = {
  readonly workstationService: string
  readonly dryRun: boolean
}

export function asked(act: string, named: Named, given: Given): Answer {
  const slug = named.workstationService
  const read = readFor(given.root, slug)
  if ("unnamed" in read) return refused(read.unnamed, INPUT)
  if ("refused" in read) return refused(read.refused, DATA)
  const found = read.services[0]
  if (found === undefined) {
    return refused(`no workstation service is slugged \`${slug}\``, INPUT)
  }

  const unit = installedUnitName(found)
  if (named.dryRun) return told([`${act}\t${unit}`, NOT_ASKED])

  const done = systemctl([act, unit])
  if (done.code !== 0) {
    return refusedBy([`${unit} was refused: ${done.out}`], OPERATIONAL)
  }
  return told([`${act}\t${unit}`])
}
