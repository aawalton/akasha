#!/usr/bin/env bun

import { readHistory } from "../history.ts"
import { loadCategoryRules } from "../rule-documents.ts"
import { categoryTitles, readFlags } from "../rule-pages.ts"
import type { Proposal } from "./agent.ts"
import { BATCH, MODEL, offerable, runBatch } from "./agent.ts"
import type { Candidate, Pool } from "./population.ts"
import { STRATA, draw, population } from "./population.ts"
import type { Digest } from "./snapshot.ts"
import { digest, moved } from "./snapshot.ts"

const PARALLEL = 4

export interface RunFile {
  readonly pool: Pool
  readonly model: string
  readonly startedAt: string
  readonly finishedAt: string
  readonly perStratum: number
  readonly reruns: boolean
  readonly offered: readonly string[]
  readonly populationSummary: {
    readonly total: number
    readonly ruleReached: number
    readonly unanswered: number
    readonly scorable: number
    readonly byStratum: Readonly<Record<string, number>>
  }
  readonly drawn: readonly {
    readonly monarchId: string
    readonly stratum: string
    readonly standingCategory: string
    readonly merchant: string
    readonly statement: string
    readonly account: string
    readonly amount: number
    readonly date: string
    readonly isSplit: boolean
  }[]
  readonly proposals: readonly Proposal[]
  readonly costUsd: number
  readonly calls: number
  readonly digestBefore: Digest
  readonly digestAfter: Digest
  readonly pagesMoved: readonly string[]
}

function chunk<T>(items: readonly T[], size: number): readonly (readonly T[])[] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

async function ask(
  categories: readonly string[],
  batches: readonly (readonly Candidate[])[]
): Promise<{ proposals: readonly Proposal[]; costUsd: number }> {
  const proposals: Proposal[] = []
  let costUsd = 0
  let done = 0
  for (const wave of chunk(batches, PARALLEL)) {
    const results = await Promise.all(wave.map((batch) => runBatch(categories, batch)))
    for (const result of results) {
      proposals.push(...result.proposals)
      costUsd += result.costUsd
    }
    done += wave.length
    process.stderr.write(
      `  ${done}/${batches.length} batches, $${costUsd.toFixed(2)} so far\n`
    )
  }
  return { proposals, costUsd }
}

if (import.meta.main) {
  const flags = readFlags(process.argv.slice(2))
  const pool = (flags.get("pool")?.[0] ?? "DEV").toUpperCase() as Pool
  if (pool !== "DEV" && pool !== "HOLDOUT") throw new Error(`--pool takes DEV or HOLDOUT, got ${pool}`)
  const perStratum = Number.parseInt(flags.get("per-stratum")?.[0] ?? "40", 10)
  if (!Number.isFinite(perStratum) || perStratum <= 0) throw new Error("--per-stratum takes a count")
  const again = flags.has("again")
  const said = flags.get("out")?.[0]
  const home = process.env.HOME
  if (said === undefined && (home === undefined || home === "")) {
    throw new Error(
      "$HOME is unset and --out names no path, so nothing says where the run file stands. A " +
        "default here would put it somewhere plausible and wrong, and the holdout guard reads a " +
        "misplaced file as a set never seen."
    )
  }
  const out = said ?? `${home}/monarch-eval-18119/${pool.toLowerCase()}-${perStratum}.json`

  if (pool === "HOLDOUT" && !again && (await Bun.file(out).exists())) {
    throw new Error(
      `${out} already stands, so the held-out set has been read once and reading it again is ` +
        "not holding it out. Score that file, or pass --again and say in the report that this " +
        "figure was taken after a first one had been seen."
    )
  }

  const startedAt = new Date().toISOString()
  const digestBefore = await digest()
  process.stderr.write("reading the transactions...\n")
  const history = await readHistory()
  const rules = (await loadCategoryRules()).rules
  const pop = population(history, rules)
  const drawn = draw(pop.scorable, pool, perStratum)

  const byStratum: Record<string, number> = {}
  for (const stratum of STRATA) {
    byStratum[stratum] = pop.scorable.filter((c) => c.stratum === stratum).length
    const got = drawn.filter((c) => c.stratum === stratum).length
    if (got < perStratum) {
      process.stderr.write(`  ${stratum}: only ${got} of ${perStratum} available in ${pool}\n`)
    }
  }

  const categories = offerable((await categoryTitles()).values())
  const batches = chunk(drawn, BATCH)
  process.stderr.write(`asking ${MODEL} about ${drawn.length} in ${batches.length} batches...\n`)
  const { proposals, costUsd } = await ask(categories, batches)

  const digestAfter = await digest()
  const file: RunFile = {
    pool,
    model: MODEL,
    startedAt,
    finishedAt: new Date().toISOString(),
    perStratum,
    reruns: again,
    offered: categories,
    populationSummary: {
      total: pop.total,
      ruleReached: pop.ruleReached,
      unanswered: pop.unanswered,
      scorable: pop.scorable.length,
      byStratum,
    },
    drawn: drawn.map((c) => ({
      monarchId: c.row.monarchId,
      stratum: c.stratum,
      standingCategory: c.row.standingCategory,
      merchant: c.row.merchant,
      statement: c.row.statement,
      account: c.row.account,
      amount: c.row.amount,
      date: c.row.date,
      isSplit: c.row.isSplit,
    })),
    proposals,
    costUsd,
    calls: batches.length,
    digestBefore,
    digestAfter,
    pagesMoved: moved(digestBefore, digestAfter),
  }
  await Bun.write(out, `${JSON.stringify(file, null, 2)}\n`)
  process.stderr.write(
    `wrote ${out} — ${proposals.length} proposals over ${drawn.length} drawn, ` +
      `$${costUsd.toFixed(2)} across ${batches.length} calls\n`
  )
  process.stderr.write(
    file.pagesMoved.length === 0
      ? "no monarch- page type moved across the run\n"
      : `PAGES MOVED: ${file.pagesMoved.join("; ")}\n`
  )
}
