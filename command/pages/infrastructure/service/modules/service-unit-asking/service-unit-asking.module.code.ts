import {
  DATA,
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { systemctl } from "akasha/infrastructure/service/workstation/modules/service-installing/service-installing.module.code.ts"
import { readFor } from "akasha/infrastructure/service/workstation/modules/service-reading/service-reading.module.code.ts"
import { installedUnitName } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

export type Named = {
  readonly workstationService: string
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
  const done = systemctl([act, unit])
  if (done.code !== 0) {
    return refusedBy([`${unit} was refused: ${done.out}`], OPERATIONAL)
  }
  return told([`${act}\t${unit}`])
}
