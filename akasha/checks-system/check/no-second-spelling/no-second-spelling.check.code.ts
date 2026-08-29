import { speltIn } from "../../../code-system/code-rule/code-rule.module.code.ts"
import { everyOfType } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { shadowFor } from "../../../pages-system/indexes/index-shadow/index-shadow.module.code.ts"
import { besideAt } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { textIn } from "../../checking/checking.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"

const MODULE = "module"

const CODE = "code"

const HELD = "ts"

const TS = ".ts"

export type Owner = {
  readonly path: string
  readonly name: string
}

export function ownedIn(leaving: Leaving): ReadonlyMap<string, Owner> {
  const cast = shadowFor(leaving)
  if ("refused" in cast) throw new Error(cast.refused)
  const found = new Map<string, Owner>()
  for (const one of everyOfType(cast.shadow.reading, MODULE)) {
    const at = besideAt(one.path, CODE, HELD)
    if (at === null) continue
    const text = textIn(leaving, at)
    if (text === null) continue
    for (const each of speltIn(at, text)) {
      if (each.exported && !found.has(each.rule))
        found.set(each.rule, { path: at, name: each.name })
    }
  }
  return found
}

export function reasonsIn(
  path: string,
  text: string,
  owned: ReadonlyMap<string, Owner>
): readonly string[] {
  const said: string[] = []
  for (const one of speltIn(path, text)) {
    const by = owned.get(one.rule)
    if (by === undefined || by.path === path) continue
    said.push(
      `\`${one.name}\` spells again what \`${by.name}\` in ${by.path} already says — import it ` +
        "rather than saying it twice"
    )
  }
  return said
}

export function noSecondSpelling(leaving: Leaving): readonly Judged[] {
  const owned = ownedIn(leaving)
  const said: Judged[] = []
  for (const path of leaving.changed) {
    if (!path.endsWith(TS)) continue
    const text = textIn(leaving, path)
    if (text === null) continue
    for (const reason of reasonsIn(path, text, owned)) said.push({ path, reason })
  }
  return said
}
