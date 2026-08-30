import { speltIn } from "../../../code-system/code-rule/code-rule.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import { bodyOf, everyFileIn, overEachFile, textIn } from "../../checking/checking.module.code.ts"
import type { Change, Judged } from "../../judging/judging.module.code.ts"

const TS = ".ts"

export type Said = {
  readonly path: string
  readonly name: string
}

export function everySpeltIn(change: Change, shadow: Shadow): ReadonlyMap<string, readonly Said[]> {
  const spelt = [...everyFileIn(change.root, shadow.reading)].flatMap((path) => {
    if (!path.endsWith(TS)) return []
    const text = textIn(change, path)
    if (text === null) return []
    return speltIn(path, text).map((one) => ({ rule: one.rule, path, name: one.name }))
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

export function noRuleInTwoFiles(change: Change, shadow: Shadow): readonly Judged[] {
  const every = everySpeltIn(change, shadow)
  return overEachFile(change, (given) => {
    if (!given.path.endsWith(TS)) return []
    const text = bodyOf(given)
    if (text === null) return []
    return reasonsIn(given.path, text, every)
  })
}
