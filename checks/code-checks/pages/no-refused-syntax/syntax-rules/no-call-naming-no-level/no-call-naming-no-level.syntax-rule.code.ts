import type {
  Given,
  Marking,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf, literalPartIn } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

const MARKED = /`akasha[ \t]+([^`\n]+)`/g

const OPENS_MARKED = "`akasha"

export const mark: Marking = (text) => text.includes(OPENS_MARKED)

const RECORDS_WHAT_WAS_SAID = /\.finding\.tsx?$/

const WORD = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const APART = /[ \t]+/

const NAMESPACE = "namespace"

const SPACE = " "

const UNDER = "-"

const INSTEAD = "walk the tree from the level before it, or write the call as it is now"

export type Lost = {
  readonly walked: string
  readonly word: string
}

function lostIn(said: string, standing: Given): Lost | null {
  const words = said.split(APART).filter((one) => one !== "")
  const first = words[0]
  if (first === undefined || standing.namedAt(first) !== first) return null
  let slug = first
  const walked = [first]
  for (const word of words.slice(1)) {
    if (standing.typedAt(slug) !== NAMESPACE) return null
    if (!WORD.test(word)) return null
    const under = `${slug}${UNDER}${word}`
    if (standing.namedAt(under) !== word) return { walked: walked.join(SPACE), word }
    slug = under
    walked.push(word)
  }
  return null
}

export function noCallNamingNoLevel(standing: Given): readonly Refusal[] {
  if (RECORDS_WHAT_WAS_SAID.test(standing.path)) return []
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    const text = literalPartIn(node)
    for (const one of text === null ? [] : text.matchAll(MARKED)) {
      const said = one[1] ?? ""
      const lost = lostIn(said, standing)
      if (lost !== null) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `this literal marks \`akasha ${said}\` as a call, and \`${lost.word}\` names no level under \`akasha ${lost.walked}\` — ${INSTEAD}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
