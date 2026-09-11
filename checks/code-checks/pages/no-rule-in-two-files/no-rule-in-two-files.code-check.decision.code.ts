import {
  bodyOf,
  everyFileOf,
  overEachFile,
  textIn,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { speltIn } from "akasha/code-system/code-rule/code-rule.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import type { Said } from "akasha/pages/indexes/rule/index-rule.index.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export type Saying = (rule: string) => readonly Said[]

export function everySpeltIn(change: Change, shadow: Shadow): Saying {
  const spelt = [...everyFileOf(shadow.index)].flatMap((path) => {
    if (!textNamed(path)) return []
    const text = textIn(change, path)
    if (text === null) return []
    return speltIn(path, text)
      .filter((one) => !one.forwards)
      .map((one, place) => ({ rule: one.rule, path, place, name: one.name }))
  })
  const every = Map.groupBy(spelt, (one) => one.rule)
  return (rule) => every.get(rule) ?? []
}

export function everyFiledIn(shadow: Shadow): Saying {
  const named = new Set(everyFileOf(shadow.index))
  return (rule) => shadow.index.saidOf(rule).filter((one) => named.has(one.path))
}

export function reasonsIn(path: string, text: string, every: Saying): readonly string[] {
  const said: string[] = []
  for (const one of speltIn(path, text)) {
    if (one.forwards) continue
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

export function refusingBy(change: Change, every: Saying): readonly Judged[] {
  return overEachFile(change, (given) => {
    if (!textNamed(given.path)) return []
    return reasonsIn(given.path, bodyOf(given), every)
  })
}

export function refusalsOver(change: Change, shadow: Shadow, filed = false): readonly Judged[] {
  if (!change.changed.some(textNamed)) return []
  const whole = filed && shadow.index.ruleWhole()
  return refusingBy(change, whole ? everyFiledIn(shadow) : everySpeltIn(change, shadow))
}
