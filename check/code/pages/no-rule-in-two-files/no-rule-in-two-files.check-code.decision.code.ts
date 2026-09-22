import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  bodyOf,
  overEachFile,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { astHashOf } from "akasha/code/reading/modules/ast-hash/ast-hash.module.code.ts"
import { speltIn } from "akasha/code/reading/modules/code-rule/code-rule.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export type Said = {
  readonly path: string
  readonly name: string
}

export type Saying = (rule: string) => readonly Said[]

export function sayingOver(paged: Paged): Saying {
  return (rule) => paged.index.astHashesOf(astHashOf(rule))
}

export function reasonsIn(path: string, text: string, every: Saying): readonly string[] {
  const said: string[] = []
  for (const one of speltIn(path, text)) {
    if (one.forwards || one.literal) continue
    const apart = every(one.rule).filter((each) => each.path !== path)
    const first = apart[0]
    if (first === undefined) continue
    const more = apart.length > 1 ? `, and in ${apart.length - 1} more` : ""
    said.push(
      `\`${one.name}\` says what \`${first.name}\` in ${first.path} says${more} — ` +
        "one rule belongs in one file, reached by importing it"
    )
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  if (!change.changed.some(textNamed)) return []
  const every = sayingOver(shadow)
  return overEachFile(change, textNamed, (given) => reasonsIn(given.path, bodyOf(given), every))
}
