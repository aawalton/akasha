import { createRequire } from "node:module"
import { join } from "node:path"
import { opensYes } from "akasha/agents/models/modules/answer/model-answer.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { ran as spawned } from "akasha/utils/run/running/running.module.code.ts"

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

const YES = "YES"

const SIGNS = /\{[a-z]+\}/g

const loadFrom = createRequire(import.meta.url)

export type Case = {
  readonly id: string
  readonly page: string
  readonly definition: string
  readonly asked?: string
  readonly against?: string
  readonly statement: string
  readonly answer: string
}

export type PageReading = (pageTypeSlug: string, slug: string) => Record<string, unknown> | null

export type Asking = (one: Case, reading: PageReading) => string | null

export type Keeping = (one: Case, got: string) => boolean

export type Beside = { readonly asking: Asking; readonly keeping: Keeping }

export type Judged = {
  readonly one: Case
  readonly got: string
  readonly kept: boolean
  readonly reached: boolean
}

export function modelOf(root: string, family: string): string {
  const slug = family.slice(family.indexOf("/") + 1)
  const held = valuedAt(root, FAMILY, slug).value[NAME]
  if (typeof held !== "string") throw new Error(`\`${slug}\` names no model a call can reach`)
  return held
}

export function askedOf(
  root: string,
  model: string,
  prompts: readonly string[]
): readonly string[] | null {
  if (prompts.length === 0) return []
  const asker = besideAt(valuedAt(root, MODULE, ASKER).path, CODE, TS)
  if (asker === null) return null
  const answered = spawned(["bun", "run", join(root, asker)], {
    stdin: new TextEncoder().encode(JSON.stringify({ model, prompts })),
    cwd: root,
  })
  if (answered.code !== 0) return null
  let held: unknown
  try {
    held = JSON.parse(answered.out)
  } catch {
    return null
  }
  const answers =
    typeof held === "object" && held !== null ? (held as { answers?: unknown }).answers : undefined
  if (!Array.isArray(answers) || answers.some((one) => typeof one !== "string")) return null
  return answers as readonly string[]
}

export function casesIn(text: string): readonly Case[] {
  const found: Case[] = []
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    let parsed: unknown
    try {
      parsed = JSON.parse(line)
    } catch {
      continue
    }
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) continue
    found.push(parsed as Case)
  }
  return found
}

export function filling(prompt: string, values: Readonly<Record<string, string>>): string {
  return prompt.replace(SIGNS, (sign) => values[sign] ?? sign)
}

export function keptBy(one: Case, got: string): boolean {
  return opensYes(got) === (one.answer === YES)
}

export function readingIn(root: string): PageReading {
  return (pageTypeSlug, slug) => {
    try {
      return valuedAt(root, pageTypeSlug, slug).value
    } catch {
      return null
    }
  }
}

function besideIn(root: string, at: string): Beside {
  const mod = loadFrom(join(root, at)) as Record<string, unknown>
  const asking = mod[ASKING]
  const keeping = mod[KEEPING]
  if (typeof asking !== "function") throw new Error(`\`${at}\` exports no \`${ASKING}\``)
  if (typeof keeping !== "function") throw new Error(`\`${at}\` exports no \`${KEEPING}\``)
  return { asking: asking as Asking, keeping: keeping as Keeping }
}

export async function everyCase(root: string, slug: string): Promise<readonly Case[]> {
  const at = besideAt(valuedAt(root, TEST, slug).path, CASES, JSONL)
  if (at === null) throw new Error(`\`${slug}\` has no cases beside it`)
  return casesIn(await Bun.file(join(root, at)).text())
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
  const asked: Case[] = []
  const missed: Judged[] = []
  for (const one of await everyCase(root, from)) {
    const prompt = asking(one, reading)
    if (prompt === null) {
      missed.push({ one, got: "", kept: false, reached: false })
      continue
    }
    prompts.push(prompt)
    asked.push(one)
  }
  const answers = askedOf(root, modelOf(root, family), prompts)
  if (answers === null) throw new Error(`\`${slug}\` reached no model, so nothing was judged`)
  const judged: Judged[] = []
  for (let at = 0; at < asked.length; at += 1) {
    const one = asked[at]
    if (one === undefined) continue
    const got = answers[at] ?? ""
    judged.push({ one, got, kept: keeping(one, got), reached: true })
  }
  return [...judged, ...missed]
}
