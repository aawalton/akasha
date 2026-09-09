import { resolve } from "node:path"
import {
  type DomainRow as Drawn,
  domainsDrawn,
} from "akasha/domains/modules/rows/domain-rows.module.code.ts"
import {
  championTree,
  type DomainRow,
} from "akasha/editor-extension/champions-tree/champions-tree.module.code.ts"
import { sayAnswer } from "../../../modules/answer-bytes/answer-bytes.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { AUTHOR } from "../../../modules/committing/committing.module.code.ts"
import { whyOf } from "../../../modules/fault-saying/fault-saying.module.code.ts"
import { writerIn } from "../../../modules/reading/reading.module.code.ts"
import { rootOf } from "../../../modules/rooting/rooting.module.code.ts"

export function rowsFrom(drawn: readonly Drawn[]): readonly DomainRow[] {
  return drawn.map((one) => ({
    slug: one.slug,
    relPath: one.path,
    persona: one.persona,
    parent: one.parent,
    sequence: one.sequence,
  }))
}

export function domainRowsIn(repo: string): readonly DomainRow[] {
  return rowsFrom(domainsDrawn(repo))
}

export function treeSaid(repo: string, rows: readonly DomainRow[]): string {
  const { roots, unreached } = championTree(rows)
  return JSON.stringify({ repo, roots, unreached })
}

export function refusalsIn(argv: readonly string[]): readonly string[] {
  return argv.map((one) => `\`${one}\` is no word this takes — this takes no word at all`)
}

export function domainTree(argv: readonly string[], given: Given): Answer {
  const refusals = refusalsIn(argv)
  if (refusals.length > 0) return { report: [], refusals, code: 1 }
  try {
    const repo = resolve(given.root)
    return { report: [treeSaid(repo, domainRowsIn(repo))], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}

function outsideHere(): Given {
  const stated = process.env.AKASHA_ROOT
  const said = process.env.AKASHA_WRITER
  return {
    root: stated === undefined || stated === "" ? rootOf(import.meta.path) : resolve(stated),
    calledAs: "akasha domain-tree",
    from: process.cwd(),
    writer: said === undefined || said === "" ? AUTHOR : said,
    agentId: writerIn(process.env),
  }
}

if (import.meta.main) {
  const answer = domainTree(process.argv.slice(2), outsideHere())
  if (answer.report.length > 0) sayAnswer(answer.report.map((one) => `${one}\n`).join(""))
  for (const one of answer.refusals) process.stderr.write(`${one}\n`)
  process.exitCode = answer.code
}
