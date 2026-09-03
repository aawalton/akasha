import { readdirSync } from "node:fs"
import { join } from "node:path"
import { valueAt } from "@akasha/pages-system/page-value"
import { normalize, type VocabularyEntry } from "@akasha/rules-engine/rule-vocabulary"
import { AKASHA, MERCHANT_FOLDER } from "../files/monarch-files.module.code.ts"
import { descriptionOf, type Subject } from "../transaction/monarch-transaction.module.code.ts"

const TYPE = "monarch-merchant"

/**
 * The merchant vocabulary is one `monarch-merchant` page per merchant, its title the value and
 * its `merchantPatterns` the runs of the bank's own words naming it. It used to be one markdown
 * body under a `# Vocabulary` heading, which is why `parseVocabulary` is no longer called here.
 */
function vocabulary(): readonly VocabularyEntry[] {
  const folder = join(AKASHA, MERCHANT_FOLDER)
  const names = readdirSync(folder)
    .filter((name) => name.endsWith(`.${TYPE}.ts`))
    .sort()
  const entries: VocabularyEntry[] = []
  for (const name of names) {
    const value = valueAt(`${MERCHANT_FOLDER}/${name}`, AKASHA)
    if (value === null) continue
    const title = value.title
    const patterns = value.merchantPatterns
    if (typeof title !== "string" || !Array.isArray(patterns)) continue
    entries.push({
      value: title.toLowerCase(),
      patterns: patterns.flatMap((one) => (typeof one === "string" ? [one.toLowerCase()] : [])),
    })
  }
  return entries
}

let held: readonly VocabularyEntry[] | null = null

export function merchantOf(subject: Pick<Subject, "merchant" | "statement">): string {
  held ??= vocabulary()
  return normalize(held, descriptionOf(subject))
}
