import { createRequire } from "node:module"
import { join } from "node:path"
import { saidBy } from "@akasha/command-system/fault-saying"
import { everyOfType, typeSlugOf } from "@akasha/indexes"
import type { Change } from "@akasha/pages-system/change"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, namedIn } from "@akasha/pages-system/page-file-name"
import type { Shadow } from "@akasha/pages-system/shadow"
import { PAGES } from "../change-walking/change-walking.module.code.ts"
import type { Judged, Running } from "../judging/judging.module.code.ts"

const MODEL_CHECK_TYPE = "01a05911-aa15-776e-9726-ed4131cd6b51"

const ASKER_AT = "akasha/agents-system/models/model-asking/model-asking.module.code.ts"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export type Asked = {
  readonly statement: string
  readonly prompt: string
}

export type Compiling = (page: unknown) => readonly Asked[]

export type Held = {
  readonly slug: string
  readonly model: string
  readonly compile: Compiling
}

export type Judgement = {
  readonly slug: string
  readonly page: string
  readonly onPatch: number
  readonly onAudit: number
  readonly run: Running
}

function valueAt(at: string, slug: string): Record<string, unknown> | null {
  const mod = loadFrom(at) as Record<string, unknown>
  const named = mod[exportedAs(slug)]
  if (named === null || typeof named !== "object") return null
  return named as Record<string, unknown>
}

function countIn(stated: Record<string, unknown>, named: string): number {
  const said = stated[named]
  return typeof said === "number" && Number.isInteger(said) && said >= 0 ? said : -1
}

function slugsIn(stated: Record<string, unknown>, named: string): readonly string[] | null {
  const said = stated[named]
  if (!Array.isArray(said) || said.some((one) => typeof one !== "string")) return null
  return said as readonly string[]
}

function pathOfSlug(root: string, slug: string): string {
  const tailed = slug.slice(slug.indexOf("/") + 1)
  const found = everyOfType(root, slug.slice(0, slug.indexOf("/"))).filter(
    (one) => (namedIn(one.path)?.stem ?? "") === tailed
  )
  const first = found[0]
  if (first === undefined) throw new Error(`\`${slug}\` reaches no page a model check can put`)
  return first.path
}

function testHeld(root: string, slug: string): Held {
  const page = pathOfSlug(root, slug)
  const stem = namedIn(page)?.stem ?? ""
  const stated = valueAt(join(root, page), stem)
  if (stated === null) throw new Error(`${page} answers to no \`${exportedAs(stem)}\``)
  const family = stated["modelFamilySlug"]
  if (typeof family !== "string") throw new Error(`${page} names no model family`)
  const at = pathOfSlug(root, family)
  const named = valueAt(join(root, at), namedIn(at)?.stem ?? "")
  const model = named === null ? undefined : named["name"]
  if (typeof model !== "string") throw new Error(`${at} names no model a call can reach`)
  const beside = besideAt(page, CODE, TS)
  if (beside === null) throw new Error(`${page} has no code file beside it`)
  const mod = loadFrom(join(root, beside)) as Record<string, unknown>
  const compile = mod[exportedAs(stem)]
  if (typeof compile !== "function") throw new Error(`${beside} answers to no \`${stem}\``)
  return { slug: stem, model, compile: compile as Compiling }
}

function askedOf(root: string, model: string, prompts: readonly string[]): readonly string[] {
  const said = Bun.spawnSync({
    cmd: ["bun", "run", join(root, ASKER_AT)],
    stdin: new TextEncoder().encode(JSON.stringify({ model, prompts })),
    stdout: "pipe",
    stderr: "pipe",
    cwd: root,
  })
  if (said.exitCode !== 0) {
    throw new Error(`the model was not reached — ${said.stderr.toString().slice(0, 400)}`)
  }
  const held: unknown = JSON.parse(said.stdout.toString())
  const answers =
    typeof held === "object" && held !== null ? (held as { answers?: unknown }).answers : undefined
  if (!Array.isArray(answers) || answers.some((one) => typeof one !== "string")) {
    throw new Error("the asker answered nothing a runner can read")
  }
  return answers as readonly string[]
}

function opensYes(said: string): boolean {
  return said
    .replace(/[^A-Za-z]/g, "")
    .toUpperCase()
    .startsWith("YES")
}

function priorOf(change: Change, path: string): string | null {
  const bytes = change.before(path)
  return bytes === null ? null : new TextDecoder().decode(bytes)
}

function freshIn(prior: string | null, definition: string, statement: string): boolean {
  if (prior === null) return true
  if (!prior.includes(definition)) return true
  return !prior.includes(statement)
}

function askingFor(
  change: Change,
  shadow: Shadow,
  held: readonly Held[]
): readonly (Asked & { readonly path: string; readonly test: string })[] {
  const found: (Asked & { readonly path: string; readonly test: string })[] = []
  for (const given of PAGES.from(change, shadow)) {
    const loaded: unknown = given.value
    const value =
      typeof loaded === "object" && loaded !== null
        ? (loaded as { value?: unknown }).value
        : undefined
    const definition =
      typeof value === "object" && value !== null
        ? (value as { definition?: unknown }).definition
        : undefined
    if (typeof definition !== "string") continue
    const prior = priorOf(change, given.path)
    for (const one of held) {
      for (const asked of one.compile(value)) {
        if (!freshIn(prior, definition, asked.statement)) continue
        found.push({ ...asked, path: given.path, test: one.slug })
      }
    }
  }
  return found
}

function runningFor(root: string, slug: string, held: readonly Held[], runs: number): Running {
  const run = (change: Change, shadow: Shadow): readonly Judged[] => {
    if (runs <= 0) return []
    const asking = askingFor(change, shadow, held)
    if (asking.length === 0) return []
    const model = held[0]?.model ?? ""
    const prompts: string[] = []
    for (const one of asking) for (let run = 0; run < runs; run += 1) prompts.push(one.prompt)
    const answers = askedOf(root, model, prompts)
    const said: Judged[] = []
    for (let at = 0; at < asking.length; at += 1) {
      const one = asking[at]
      if (one === undefined) continue
      const mine = answers.slice(at * runs, at * runs + runs)
      const yes = mine.filter((answer) => opensYes(answer)).length
      if (yes === 0) continue
      said.push({
        path: one.path,
        reason: `\`${slug}\` put this to \`${one.test}\` and it said yes ${yes} of ${runs} times — ${one.statement}`,
      })
    }
    return said
  }
  return Object.assign(run, { isInput: PAGES.isInput })
}

export function modelChecksIn(root: string): readonly Judgement[] {
  let pages: readonly string[]
  try {
    pages = [
      ...new Set(everyOfType(root, typeSlugOf(root, MODEL_CHECK_TYPE)).map((one) => one.path)),
    ]
  } catch {
    return []
  }
  const found: Judgement[] = []
  for (const path of [...pages].sort()) {
    const slug = namedIn(path)?.stem
    if (slug === undefined) continue
    const stated = valueAt(join(root, path), slug)
    if (stated === null) throw new Error(`${path} is a model check, and answers to no value`)
    const named = slugsIn(stated, "modelTestSlugs")
    if (named === null) throw new Error(`${path} is a model check, and names no test`)
    const onPatch = countIn(stated, "patchRuns")
    const onAudit = countIn(stated, "auditRuns")
    if (onPatch < 0 || onAudit < 0) {
      throw new Error(`${path} is a model check, and states no count of runs a runner can honour`)
    }
    let held: readonly Held[]
    try {
      held = named.map((one) => testHeld(root, one))
    } catch (thrown) {
      throw new Error(`${path} is a model check, and its tests would not load — ${saidBy(thrown)}`)
    }
    found.push({
      slug,
      page: path,
      onPatch,
      onAudit,
      run: runningFor(root, slug, held, onPatch > 0 ? onPatch : onAudit),
    })
  }
  return found
}
