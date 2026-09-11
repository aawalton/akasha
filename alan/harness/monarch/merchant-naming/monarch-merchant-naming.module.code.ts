import { AKASHA } from "akasha/alan/harness/monarch/files/monarch-files.module.code.ts"
import {
  descriptionOf,
  type Subject,
} from "akasha/alan/harness/monarch/transaction/monarch-transaction.module.code.ts"
import {
  normalize,
  type VocabularyEntry,
} from "akasha/alan/harness/rules-engine/rule-vocabulary/rule-vocabulary.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const TYPE = "monarch-merchant"

function vocabulary(): readonly VocabularyEntry[] {
  const entries: VocabularyEntry[] = []
  for (const page of valuesOfType(AKASHA, TYPE)) {
    const title = page.value.title
    const patterns = page.value.merchantPatterns
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
