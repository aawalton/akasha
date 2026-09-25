import { createRequire } from "node:module"
import { join } from "node:path"
import { endsYes } from "akasha/agent/model/modules/answer/model-answer.module.code.ts"
import { ran as spawned } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { z } from "zod"

const FAMILY = "model-family"

const MODULE = "module"

const ASKER = "model-asking"

const TEST = "model-test"

const CODE = "code"

const CASES = "cases"

const TS = "ts"

const JSONL = "jsonl"

const NAME = "name"

const MODEL_FAMILY = "modelFamily"

const ASKING = "asking"

const KEEPING = "keeping"

const SIGNS = /\{[a-z]+\}/g

const loadFrom = createRequire(import.meta.url)

const CASE = z
  .object({
    id: z.string(),
    page: z.string(),
    definition: z.string(),
    asked: z.string().optional(),
    against: z.string().optional(),
    statement: z.string(),
    answer: z.string(),
  })
  .readonly()

export type Case = z.infer<typeof CASE>

const ANSWERED = z.looseObject({ answers: z.array(z.string().nullable()) })

export type Answers = readonly (string | null)[]

export type PageReading = (pageTypeSlug: string, slug: string) => Record<string, unknown> | null

export type Asked = { readonly about: string; readonly prompt: string }

export type Got = { readonly about: string; readonly said: string }

export type Asking = (one: Case, reading: PageReading) => readonly Asked[]

export type Keeping = (one: Case, got: readonly Got[]) => boolean

export type Beside = { readonly asking: Asking; readonly keeping: Keeping }

export type Judged = {
  readonly one: Case
  readonly asked: readonly Asked[]
  readonly got: readonly Got[]
  readonly kept: boolean
  readonly reached: boolean
}

export function modelOf(root: string, family: string): string {
  const slug = family.slice(family.indexOf("/") + 1)
  const held = valuedAt(root, FAMILY, slug).value[NAME]
  if (typeof held !== "string") throw new Error(`\`${slug}\` names no model a call can reach`)
  return held
}

export function askedOf(root: string, model: string, prompts: readonly string[]): Answers | null {
  if (prompts.length === 0) return []
  const asker = besideAt(valuedAt(root, MODULE, ASKER).path, CODE, TS)
  if (asker === null) return null
  const answered = spawned(["bun", "run", join(root, asker)], {
    stdin: new TextEncoder().encode(JSON.stringify({ model, prompts })),
    cwd: root,
  })
  if (answered.code !== 0) return null
  try {
    return ANSWERED.safeParse(JSON.parse(answered.out)).data?.answers ?? null
  } catch {
    return null
  }
}

export function parseCases(text: string): readonly Case[] {
  const found: Case[] = []
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    let parsed: Case | undefined
    try {
      parsed = CASE.safeParse(JSON.parse(line)).data
    } catch {
      continue
    }
    if (parsed !== undefined) found.push(parsed)
  }
  return found
}

export function filling(prompt: string, values: Readonly<Record<string, string>>): string {
  return prompt.replace(SIGNS, (sign) => values[sign] ?? sign)
}

export function gotIn(
  asked: readonly Asked[],
  answers: Answers,
  opens: number
): readonly Got[] | null {
  const got: Got[] = []
  for (let at = 0; at < asked.length; at += 1) {
    const each = asked[at]
    const said = answers[opens + at]
    if (each === undefined || said === undefined || said === null) return null
    got.push({ about: each.about, said })
  }
  return got
}

export function anyYes(got: readonly Got[]): boolean {
  return got.some((one) => endsYes(one.said))
}

function readingIn(root: string): PageReading {
  return (pageTypeSlug, slug) => {
    try {
      return valuedAt(root, pageTypeSlug, slug).value
    } catch {
      return null
    }
  }
}

type Span = {
  readonly one: Case
  readonly opens: number
  readonly asked: readonly Asked[]
}

function besideIn(root: string, at: string): Beside {
  const mod = loadFrom(join(root, at)) as Record<string, unknown>
  const asking = mod[ASKING]
  const keeping = mod[KEEPING]
  if (typeof asking !== "function") throw new Error(`\`${at}\` exports no \`${ASKING}\``)
  if (typeof keeping !== "function") throw new Error(`\`${at}\` exports no \`${KEEPING}\``)
  return { asking: asking as Asking, keeping: keeping as Keeping }
}

async function everyCase(root: string, slug: string): Promise<readonly Case[]> {
  const at = besideAt(valuedAt(root, TEST, slug).path, CASES, JSONL)
  if (at === null) throw new Error(`\`${slug}\` has no cases beside it`)
  return parseCases(await Bun.file(join(root, at)).text())
}

export async function runningOf(
  root: string,
  slug: string,
  from: string = slug
): Promise<readonly Judged[]> {
  const page = valuedAt(root, TEST, slug)
  const family = page.value[MODEL_FAMILY]
  if (typeof family !== "string") throw new Error(`\`${slug}\` names no model family`)
  const codeAt = besideAt(page.path, CODE, TS)
  if (codeAt === null) throw new Error(`\`${slug}\` has no code beside it`)
  const { asking, keeping } = besideIn(root, codeAt)
  const reading = readingIn(root)
  const prompts: string[] = []
  const spans: Span[] = []
  const missed: Judged[] = []
  for (const one of await everyCase(root, from)) {
    const asked = asking(one, reading)
    if (asked.length === 0) {
      missed.push({ one, asked: [], got: [], kept: false, reached: false })
      continue
    }
    spans.push({ one, opens: prompts.length, asked })
    for (const each of asked) prompts.push(each.prompt)
  }
  const answers = askedOf(root, modelOf(root, family), prompts)
  if (answers === null) throw new Error(`\`${slug}\` reached no model, so nothing was judged`)
  const judged: Judged[] = spans.map((span) => {
    const got = gotIn(span.asked, answers, span.opens)
    if (got === null)
      return { one: span.one, asked: span.asked, got: [], kept: false, reached: false }
    return { one: span.one, asked: span.asked, got, kept: keeping(span.one, got), reached: true }
  })
  return [...judged, ...missed]
}
