#!/usr/bin/env bun

import { standingDirections } from "./direction-pages.ts"
import type { Direction } from "./direction-pages.ts"
import { rowsMatching, show, USAGE } from "./evidence.ts"
import type { Row } from "./evidence.ts"
import { unsettled } from "./history.ts"
import { digest, moved } from "./eval/snapshot.ts"
import { EVIDENCE_COMMAND, runSeat } from "./seat.ts"
import { NOT_A_CATEGORY, offerable } from "./eval/agent.ts"
import { loadCategoryRules } from "./rule-documents.ts"
import { categoryTitles, readFlags } from "./rule-pages.ts"
import { placeDirOf } from "../page/page-types.ts"
import { array, num, object, optional, str } from "./shape.ts"

const HERE = import.meta.dir
const REPO = `${HERE}/..`
const TASKS = `${REPO}/${placeDirOf("task")}`
const DOMAINS = `${REPO}/domains`

const ROOT_DOMAIN = "semantic-categorization"

const TIMEOUT_MINUTES = 45

const MODEL = "sonnet"

function frontmatterParent(text: string): string | null {
  for (const line of text.split("\n")) {
    const one = line.match(/^domain-parent-slug: (\S+)$/)
    if (one?.[1] !== undefined) return one[1]
  }
  return null
}

async function domainClosure(slug: string): Promise<readonly { slug: string; text: string }[]> {
  const held = new Map<string, string>()
  const pending = [slug]
  while (pending.length > 0) {
    const next = pending.shift()
    if (next === undefined || held.has(next)) continue
    const text = await Bun.file(`${DOMAINS}/${next}.md`).text()
    held.set(next, text)
    const parent = frontmatterParent(text)
    if (parent !== null) pending.push(parent)
  }
  return [...held.entries()].reverse().map(([s, text]) => ({ slug: s, text }))
}

async function taskText(slug: string): Promise<string> {
  return Bun.file(`${TASKS}/${ROOT_DOMAIN}/${slug}.md`).text()
}

async function selectSet(
  accounts: readonly string[],
  from: string,
  to: string,
  limit: number
): Promise<readonly Row[]> {
  const rows = await rowsMatching(
    { accountContains: accounts, from, to, uncategorizedOnly: true },
    limit,
    false
  )
  return unsettled((await loadCategoryRules()).rules, rows)
}

function section(heading: string, body: string): string {
  return `\n\n${"=".repeat(72)}\n${heading}\n${"=".repeat(72)}\n\n${body}`
}

function directionText(direction: Direction): string {
  return [
    `## ${direction.name}`,
    "",
    `APPLIES WHEN: ${direction.appliesWhen}`,
    "",
    `DIRECTS: ${direction.directs}`,
    "",
    `VALIDATED BY: the task above, \`${direction.task}\`.`,
  ].join("\n")
}

const REPLY = [
  "Reply with one JSON object and nothing else, shaped:",
  "",
  '{"verdicts": [{"id": "<a transaction id from the set>",',
  '               "outcome": "settled" | "person",',
  '               "category": "<one category name>" | null,',
  '               "reasoning": "<why, in your own words>",',
  '               "read": ["<the ids of rows you read to decide>"]}],',
  ' "findings": [{"about": ["<ids>"], "says": "<what is true of those rows together>"}]}',
  "",
  "One verdict per row in the set, every row, in the order given. A verdict may",
  "also name a row you read that the set does not hold: where a cycle of money",
  "runs through rows that already carry a category, those rows are part of your",
  "answer too.",
  "`settled` carries a category name spelled exactly as listed. `person` carries",
  "`category: null` — naming a likely category there would put your doubt in two",
  "places at once, and neither would then mean what it says. Put what you suspect",
  "in `reasoning`, where the person who answers it will read it.",
  "",
  "`findings` is for what is true of several rows together, said once. Leave it",
  "empty where you found nothing of the kind.",
].join("\n")

async function brief(set: readonly Row[], directions: readonly Direction[]): Promise<string> {
  const closure = await domainClosure(ROOT_DOMAIN)
  const tasks = [...new Set(directions.map((d) => d.task))]
  const titles = offerable([...(await categoryTitles()).values()])
  const parts = [
    "You are reviewing transactions for one household's personal finances.",
    "Everything below binds you: the domains you are working inside, then the task",
    "you are running, then the directions standing right now.",
    ...closure.map(({ slug, text }) => section(`DOMAIN — ${slug}`, text.trim())),
    ...(await Promise.all(
      tasks.map(async (slug) => section(`TASK — ${slug}`, (await taskText(slug)).trim()))
    )),
    section("DIRECTIONS STANDING", directions.map(directionText).join("\n\n")),
    section(
      "CATEGORIES YOU MAY NAME",
      titles.map((name) => `- ${name}`).join("\n") +
        `\n\nThere is no "${NOT_A_CATEGORY}" among them. A row nothing settles goes to a` +
        "\nperson, which is an outcome rather than a category."
    ),
    section(
      "THE EVIDENCE YOU CAN READ",
      `Run this command, which is the only one you have:\n\n  ${EVIDENCE_COMMAND} <lookup> ...\n\n${USAGE}`
    ),
    section(
      `THE SET — ${set.length} transactions`,
      set.map((row) => `- ${show(row)}`).join("\n")
    ),
    section("YOUR REPLY", REPLY),
  ]
  return parts.join("")
}

interface Verdict {
  readonly monarchId: string
  readonly outcome: "settled" | "person"
  readonly category: string | null
  readonly reasoning: string
  readonly read: readonly string[]
}

interface Finding {
  readonly about: readonly string[]
  readonly says: string
}

function readVerdict(value: unknown, path: string, titles: ReadonlySet<string>): Verdict {
  const row = object(value, path)
  const outcome = str(row.outcome, `${path}.outcome`)
  if (outcome !== "settled" && outcome !== "person") {
    throw new Error(`${path}.outcome: expected settled or person, got "${outcome}"`)
  }
  const category = optional(row.category, `${path}.category`, str)
  if (outcome === "settled" && (category === null || !titles.has(category))) {
    throw new Error(`${path}: settled on "${category}", which is not a category standing`)
  }
  if (outcome === "person" && category !== null) {
    throw new Error(`${path}: handed to a person and still named "${category}"`)
  }
  return {
    monarchId: str(row.id, `${path}.id`),
    outcome,
    category,
    reasoning: str(row.reasoning, `${path}.reasoning`),
    read: array(row.read ?? [], `${path}.read`).map((id, i) => str(id, `${path}.read[${i}]`)),
  }
}

function parseReply(
  text: string,
  titles: ReadonlySet<string>
): { readonly verdicts: readonly Verdict[]; readonly findings: readonly Finding[] } {
  const open = text.indexOf("{")
  const close = text.lastIndexOf("}")
  if (open === -1 || close <= open) throw new Error(`no JSON object in the reply: ${text.slice(0, 300)}`)
  const parsed = object(JSON.parse(text.slice(open, close + 1)), "reply")
  const verdicts = array(parsed.verdicts, "reply.verdicts").map((row, i) =>
    readVerdict(row, `reply.verdicts[${i}]`, titles)
  )
  const findings = array(parsed.findings ?? [], "reply.findings").map((row, i) => {
    const held = object(row, `reply.findings[${i}]`)
    return {
      about: array(held.about, `reply.findings[${i}].about`).map((id, j) =>
        str(id, `reply.findings[${i}].about[${j}]`)
      ),
      says: str(held.says, `reply.findings[${i}].says`),
    }
  })
  return { verdicts, findings }
}

async function beyondSet(
  set: readonly Row[],
  verdicts: readonly Verdict[]
): Promise<readonly Row[]> {
  const held = new Set(set.map((row) => row.monarchId))
  const ids = [...new Set(verdicts.map((v) => v.monarchId))].filter((id) => !held.has(id))
  if (ids.length === 0) return []
  return rowsMatching({ ids }, ids.length, false)
}

function report(
  set: readonly Row[],
  beyond: readonly Row[],
  verdicts: readonly Verdict[],
  findings: readonly Finding[]
): void {
  const byId = new Map([...set, ...beyond].map((row) => [row.monarchId, row]))
  const settled = verdicts.filter((v) => v.outcome === "settled")
  console.log(`\n${set.length} rows in the set, ${verdicts.length} verdict(s)`)
  console.log(`  ${settled.length} settled, ${verdicts.length - settled.length} to a person`)
  if (beyond.length > 0) {
    console.log(`  ${beyond.length} on row(s) outside the set, reached by a cycle running through it`)
  }
  const missing = set.filter((row) => !verdicts.some((v) => v.monarchId === row.monarchId))
  if (missing.length > 0) {
    console.log(`  ${missing.length} row(s) came back with no verdict at all:`)
    for (const row of missing) console.log(`    ${show(row)}`)
  }
  console.log("\nsettled:")
  if (settled.length === 0) console.log("  none")
  for (const verdict of settled) {
    const row = byId.get(verdict.monarchId)
    const stands = row === undefined || row.category === NOT_A_CATEGORY ? null : row.category
    const note =
      stands === null ? "" : stands === verdict.category ? " (agrees)" : ` (CONTRADICTS ${stands})`
    console.log(`  ${verdict.category}${note} <- ${row === undefined ? verdict.monarchId : show(row)}`)
    console.log(`      ${verdict.reasoning}`)
    if (verdict.read.length > 0) console.log(`      read: ${verdict.read.join(", ")}`)
  }
  console.log("\nfindings:")
  if (findings.length === 0) console.log("  none")
  for (const finding of findings) {
    console.log(`  about ${finding.about.join(", ")}`)
    console.log(`    ${finding.says}`)
  }
}

if (import.meta.main) {
  const flags = readFlags(process.argv.slice(2))
  const one = (key: string): string | null => flags.get(key)?.[0] ?? null
  const accounts = flags.get("account") ?? []
  const from = one("from") ?? "0000-01-01"
  const to = one("to") ?? "9999-12-31"
  const limit = Number(one("limit") ?? "400")
  const model = one("model") ?? MODEL
  const minutes = Number(one("timeout-minutes") ?? String(TIMEOUT_MINUTES))
  const out = one("out") ?? `${process.env.HOME}/monarch-review/${Date.now()}.json`

  const directions = await standingDirections()
  if (directions.length === 0) {
    throw new Error("no direction stands, so there is nothing to review against")
  }
  const set = await selectSet(accounts, from, to, limit)
  if (set.length === 0) throw new Error("no transaction needing judgment matched that selection")
  const prompt = await brief(set, directions)
  if (flags.has("brief-only")) {
    console.log(prompt)
    process.exit(0)
  }

  const before = await digest()
  const seat = await runSeat(prompt, model, minutes)
  const after = await digest()
  const titles = new Set(offerable([...(await categoryTitles()).values()]))

  await Bun.write(
    out,
    JSON.stringify(
      {
        ranAt: new Date().toISOString(),
        model,
        selection: { accounts, from, to, limit },
        directions,
        set,
        prompt,
        reply: seat.text,
        costUsd: seat.costUsd,
        turns: seat.turns,
        commands: seat.commands,
        denials: seat.denials,
        digestBefore: before,
        digestAfter: after,
      },
      null,
      2
    )
  )
  console.log(`run file: ${out}`)
  console.log(`cost: $${seat.costUsd.toFixed(2)} over ${seat.turns} turns`)
  console.log(`the seat ran ${seat.commands.length} command(s):`)
  for (const command of seat.commands) console.log(`  ${command}`)
  if (seat.denials.length > 0) {
    console.log(`REFUSED — ${seat.denials.length} call(s) the harness would not admit:`)
    for (const denial of seat.denials) console.log(`  ${denial}`)
    console.log("This seat answered without evidence it asked for, so its verdicts are what a call")
    console.log("handed the bare rows would produce and are not this instrument's result.")
  }
  const changed = moved(before, after)
  console.log(
    changed.length === 0
      ? "nothing moved: every `monarch-` page type has the row count and last change it had"
      : `MOVED: ${changed.join("; ")}`
  )
  const { verdicts, findings } = parseReply(seat.text, titles)
  report(set, await beyondSet(set, verdicts), verdicts, findings)
}
