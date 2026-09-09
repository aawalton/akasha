import type { DepSentence } from "@akasha/plain-language/dependency-graph"
import { makeSentence } from "@akasha/plain-language/dependency-graph"
import { loadParser } from "@akasha/plain-language/onnx-parsing"
import { foundIn } from "../prose-pattern/prose-pattern.module.code.ts"
import { type Pattern, rewritesFor, rewritten } from "../prose-rewrite/prose-rewrite.module.code.ts"

export type Passage = {
  readonly path: string
  readonly key: string
  readonly under: readonly string[]
  readonly text: string
}

export type Restatement = {
  readonly passage: Passage
  readonly now: string
}

export type Parsing = (text: string) => Promise<readonly DepSentence[]>

export async function parsingNow(): Promise<Parsing> {
  const parser = await loadParser()
  return async (text) => (await parser.parse(text)).map(makeSentence)
}

export async function restatedIn(
  passages: readonly Passage[],
  spellings: ReadonlySet<string>,
  patterns: readonly Pattern[],
  parsing: Parsing
): Promise<readonly Restatement[]> {
  const found: Restatement[] = []
  for (const passage of passages) {
    const sentences = await parsing(passage.text)
    const rewrites = sentences.flatMap((one) =>
      rewritesFor(passage.text, foundIn(one, spellings), patterns)
    )
    if (rewrites.length === 0) continue
    const now = rewritten(passage.text, rewrites)
    if (now === passage.text) continue
    found.push({ passage, now })
  }
  return found
}
