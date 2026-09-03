import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { AUTHOR } from "@akasha/command-system/committing"
import { whyOf } from "@akasha/command-system/fault-saying"
import { writerIn } from "@akasha/command-system/reading"
import { rootOf } from "@akasha/command-system/rooting"
import { championTree, type DomainRow } from "@akasha/editor-extension/champions-tree"
import { type DomainRow as Drawn, domainsDrawn } from "@akasha/editor-extension/panel-domains"

// A domain as the panel reads it, said as the tree wants it. The two spell the path differently and
// the tree carries a champion the panel never reads, so the persona is null for every row.
export function rowsFrom(drawn: readonly Drawn[]): readonly DomainRow[] {
  return drawn.map((one) => ({
    slug: one.slug,
    relPath: one.path,
    persona: null,
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

// ASKED AS A CHILD OF ITS OWN, so this file is an entry point as well as a command. The editor
// spawns this rather than asking the held-open server, because a cheap read queued behind two
// expensive trees waits on both, and the outside a command is handed is composed here the way the
// command line composes it.
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
  for (const one of answer.report) process.stdout.write(`${one}\n`)
  for (const one of answer.refusals) process.stderr.write(`${one}\n`)
  process.exitCode = answer.code
}
