import type { Candidate } from "../eval-population/monarch-eval-population.module.code.ts"
import { array, num, object, str } from "../shape/monarch-shape.module.code.ts"

export const MODEL = "sonnet"
export const BATCH = 10

export const NOT_A_CATEGORY = "Uncategorized"

export function offerable(titles: Iterable<string>): readonly string[] {
  return [...new Set(titles)].filter((name) => name !== NOT_A_CATEGORY).sort()
}

export interface Proposal {
  readonly monarchId: string
  readonly category: string
  readonly confidence: "high" | "medium" | "low"
  readonly reason: string
}

export interface BatchResult {
  readonly proposals: readonly Proposal[]
  readonly costUsd: number
  readonly ids: readonly string[]
}

function money(amount: number): string {
  return amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `+$${amount.toFixed(2)}`
}

function line(candidate: Candidate, index: number): string {
  const row = candidate.row
  return (
    `${index + 1}. id=${row.monarchId} | date=${row.date} | amount=${money(row.amount)} | ` +
    `account=${JSON.stringify(row.account)} | merchant=${JSON.stringify(row.merchant)} | ` +
    `statement=${JSON.stringify(row.statement)} | ` +
    `recurring=${row.isRecurring ? "yes" : "no"} | split=${row.isSplit ? "yes" : "no"}`
  )
}

export function prompt(categories: readonly string[], batch: readonly Candidate[]): string {
  return [
    "You are categorizing transactions for one household's personal finances.",
    "",
    "Choose exactly one category for each transaction, spelled exactly as it appears here:",
    ...categories.map((name) => `- ${name}`),
    "",
    "How this household uses them:",
    "- `Shopping` is a deliberate catch-all for household spending falling in no other",
    "  category. Groceries and some eating out land there.",
    "- A category named for a person — `Jenny's Spending`, `Lizzy's Tithing` and the like —",
    "  is that person's own budget envelope. The same payee can belong to a different",
    "  person's envelope on a different day.",
    "- `Transfer` is money moving between accounts this household already holds, rather",
    "  than money spent or earned.",
    "- A negative amount is money leaving, a positive one money arriving.",
    "",
    "Give each a confidence:",
    "- `high` — what the transaction carries settles it beyond doubt, and it is fit to",
    "  apply without asking anyone.",
    "- `medium` — likely, but a person could reasonably choose otherwise.",
    "- `low` — the transaction does not carry what would settle it.",
    "",
    "Every transaction gets a category. `low` is how you decline one — say the closest",
    "category and mark it `low`, rather than reaching for a catch-all. Saying you are",
    "unsure is worth doing: a wrong category applied without asking is never looked at",
    "again, while one handed to a person costs a single question.",
    "",
    "Transactions:",
    ...batch.map(line),
    "",
    "Reply with a JSON array and nothing else — one object per transaction, in the order",
    "given, each shaped:",
    '{"id": "<the id given>", "category": "<one name from the list above>",',
    ' "confidence": "high" | "medium" | "low", "reason": "<one short line>"}',
  ].join("\n")
}

const CONFIDENCES = new Set(["high", "medium", "low"])

function readProposal(value: unknown, path: string): Proposal {
  const row = object(value, path)
  const confidence = str(row.confidence, `${path}.confidence`).toLowerCase()
  if (!CONFIDENCES.has(confidence)) {
    throw new Error(`${path}.confidence: expected high, medium or low, got "${confidence}"`)
  }
  return {
    monarchId: str(row.id, `${path}.id`),
    category: str(row.category, `${path}.category`),
    confidence: confidence as Proposal["confidence"],
    reason: str(row.reason, `${path}.reason`),
  }
}

function parseProposals(text: string): readonly Proposal[] {
  const open = text.indexOf("[")
  const close = text.lastIndexOf("]")
  if (open === -1 || close <= open) {
    throw new Error(`no JSON array in the reply: ${text.slice(0, 200)}`)
  }
  const parsed = array(JSON.parse(text.slice(open, close + 1)), "proposals")
  return parsed.map((row, i) => readProposal(row, `proposals[${i}]`))
}

export async function runBatch(
  categories: readonly string[],
  batch: readonly Candidate[]
): Promise<BatchResult> {
  const text = prompt(categories, batch)
  const child = Bun.spawn(["claude", "-p", "--model", MODEL, "--output-format", "json"], {
    stdin: new TextEncoder().encode(text),
    stdout: "pipe",
    stderr: "pipe",
  })
  const [out, err, code] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ])
  if (code !== 0) throw new Error(`claude -p exited ${code}\n${err.trim()}`)
  const envelope = object(JSON.parse(out), "claude -p")
  return {
    proposals: parseProposals(str(envelope.result, "claude -p.result")),
    costUsd: num(envelope.total_cost_usd, "claude -p.total_cost_usd"),
    ids: batch.map((c) => c.row.monarchId),
  }
}
