import { resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { descent } from "akasha/command/argument/pages/descent.argument.ts"
import { paths } from "akasha/command/argument/pages/paths.argument.ts"
import { rootDomain } from "akasha/command/argument/pages/root-domain.argument.ts"
import { up } from "akasha/command/argument/pages/up.argument.ts"
import { refusedBy } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { reportedBy } from "akasha/command/modules/report-answering/report-answering.module.code.ts"
import { domainDag as page } from "akasha/command/pages/domain/dag/domain-dag.command.ts"
import { dagLines } from "akasha/command/pages/domain/modules/drawing/domain-drawing.module.code.ts"

const NAMED = [paths, descent, rootDomain, up]

export function domainDag(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  const wanted = {
    rooted: taken.rootDomain,
    above: taken.up,
    paths: taken.paths,
    descent: taken.descent,
  }
  return reportedBy(() => dagLines(wanted, resolve(given.root)))
}
