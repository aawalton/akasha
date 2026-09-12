import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { declarationSubject } from "akasha/commands/arguments/pages/declaration-subject.argument.ts"
import { refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { reportedBy } from "akasha/commands/modules/report-answering/report-answering.module.code.ts"
import { domainDeclarationList as page } from "akasha/commands/pages/domain/declaration-list/domain-declaration-list.command.ts"
import {
  declarationLines,
  SUBJECTS,
} from "akasha/commands/pages/domain/drawing/domain-drawing.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export function wrongIn(said: readonly string[]): readonly string[] {
  const named = namesDrawn(SUBJECTS)
  return said
    .filter((one) => !SUBJECTS.includes(one))
    .map((one) => `\`${one}\` is no subject — \`${declarationSubject.said}\` names ${named}`)
}

export function domainDeclarationList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [declarationSubject])
  if ("refused" in read) return refusedBy(read.refused)
  const subjects = read.taken.declarationSubject
  const wrong = wrongIn(subjects)
  if (wrong.length > 0) return refusedBy(wrong)
  return reportedBy(() => declarationLines(subjects, resolve(given.root)))
}
