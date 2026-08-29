import type { Corpus, Filed } from "../../../write-system/corpus.module.code.ts"
import type { Judged } from "../../../checks-system/judging.module.code.ts"
import type { Whole } from "../../checking.module.code.ts"
import { corpusFor } from "../../checking.module.code.ts"

const NOT_A_PROPERTY = new Set(["id", "slug", "pageTypeSlug"])

function kebab(key: string): string {
  return key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}

function namesIn(held: unknown): readonly string[] {
  if (typeof held === "string") return [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function relationFindings(corpus: Corpus): readonly Judged[] {
  const said: Judged[] = []
  const seen = (at: Filed, key: string, named: string, wanted: string): void => {
    const what = corpus.resolve(named, wanted)
    if (what.kind === "one") return
    if (what.kind === "many") {
      said.push({
        path: at.path,
        reason:
          `\`${key}\` names \`${named}\`, and ` +
          `${what.among.map((one) => `\`${one.pageTypeSlug}\``).join(" and ")} both carry it`,
      })
      return
    }
    const anywhere = corpus.resolve(named, null)
    if (anywhere.kind === "none") {
      said.push({
        path: at.path,
        reason: `\`${key}\` names \`${named}\`, and no page carries that slug`,
      })
      return
    }
    const is = anywhere.kind === "one" ? anywhere.at.pageTypeSlug : "page of another type"
    said.push({
      path: at.path,
      reason: `\`${key}\` may name a \`${wanted}\`, and \`${named}\` is a \`${is}\``,
    })
  }

  for (const at of corpus.every()) {
    const value = corpus.valueOf(at.path)
    if (value === null) continue
    for (const [key, held] of Object.entries(value)) {
      if (NOT_A_PROPERTY.has(key) || held === null) continue
      const wanted = corpus.targetFor(kebab(key))
      if (wanted === null) continue
      for (const named of namesIn(held)) seen(at, key, named, wanted)
    }
  }
  return said
}

export function relationResolves(given: Whole): readonly Judged[] {
  const read = corpusFor(given)
  if (read.kind === "unread") return [{ path: given.root, reason: read.reason }]
  return relationFindings(read.corpus).map((one) => ({
    path: read.back(one.path),
    reason: one.reason,
  }))
}
