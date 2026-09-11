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
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export type Said = {
  readonly path: string
  readonly name: string
}

export function everySpeltIn(change: Change, shadow: Shadow): ReadonlyMap<string, readonly Said[]> {
  const spelt = [...everyFileOf(shadow.index)].flatMap((path) => {
    if (!textNamed(path)) return []
    const text = textIn(change, path)
    if (text === null) return []
    return speltIn(path, text)
      .filter((one) => !one.forwards)
      .map((one) => ({ rule: one.rule, path, name: one.name }))
  })
  return Map.groupBy(spelt, (one) => one.rule)
}

export function reasonsIn(
  path: string,
  text: string,
  every: ReadonlyMap<string, readonly Said[]>
): readonly string[] {
  const said: string[] = []
  for (const one of speltIn(path, text)) {
    if (one.forwards) continue
    const apart = (every.get(one.rule) ?? []).filter((each) => each.path !== path)
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
  const every = everySpeltIn(change, shadow)
  return overEachFile(change, (given) => {
    if (!textNamed(given.path)) return []
    return reasonsIn(given.path, bodyOf(given), every)
  })
}
