import { readFileSync } from "node:fs"
import { normalize, parseVocabulary } from "@akasha/rules-engine/rule-vocabulary"
import { pageFileIn } from "../page/page-file.ts"
import { placeDirOf } from "../page/page-types.ts"
import { descriptionOf, type Subject } from "./transaction.ts"

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "")
const DIR = placeDirOf("category-rule-merchant")
const MERCHANTS = `${ROOT}/${pageFileIn(ROOT, DIR, "merchants") ?? `${DIR}/merchants.md`}`

const VOCABULARY = parseVocabulary(readFileSync(MERCHANTS, "utf8"))

export function merchantOf(subject: Pick<Subject, "merchant" | "statement">): string {
  return normalize(VOCABULARY, descriptionOf(subject))
}
