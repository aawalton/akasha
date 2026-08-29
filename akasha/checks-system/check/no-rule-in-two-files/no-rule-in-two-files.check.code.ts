import { speltIn } from "../../../code-system/code-rule.module.code.ts"
import { bodyOf, everyFileIn, overEachFile, textIn } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const TS = ".ts"

export type Said = {
  readonly path: string
  readonly name: string
}

export function everySpeltIn(leaving: Leaving): ReadonlyMap<string, readonly Said[]> {
  const found = new Map<string, Said[]>()
  for (const path of everyFileIn(leaving.root)) {
    if (!path.endsWith(TS)) continue
    const text = textIn(leaving, path)
    if (text === null) continue
    for (const one of speltIn(path, text)) {
      const held = found.get(one.rule)
      if (held === undefined) found.set(one.rule, [{ path, name: one.name }])
      else held.push({ path, name: one.name })
    }
  }
  return found
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
    const more = apart.length > 1 ? `, and in ${apart.length - 1} file more` : ""
    said.push(
      `\`${one.name}\` says what \`${first.name}\` in ${first.path} says${more} — ` +
        "one rule belongs in one file, reached by importing it"
    )
  }
  return said
}

export function noRuleInTwoFiles(leaving: Leaving): readonly Judged[] {
  const every = everySpeltIn(leaving)
  return overEachFile(leaving, (given) => {
    if (!given.path.endsWith(TS)) return []
    const text = bodyOf(given)
    if (text === null) return []
    return reasonsIn(given.path, text, every)
  })
}
