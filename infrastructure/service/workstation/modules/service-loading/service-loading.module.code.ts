const PATHS = ".paths"

const AKASHA = "akasha/"

const HOME = "%h"

const RUN = "bun"

const LOADED: ReadonlySet<string> = new Set([
  "apns-push-notifier",
  "code-editor-data-watcher",
  "dcgm-exporter",
  "maintain-seat-pending",
  "monarch-poll",
  "node-exporter",
  "recipient-resolver",
  "repos-empty-dir-purge",
  "surplus-fall-notifier",
  "sweep-cost-records",
  "sweep-log-days",
  "sweep-stray-processes",
  "sweep-subagent-pages",
  "sweep-supervisor-logs",
  "temper-watcher",
  "ttc-client",
])

export const STAGING = ".local/state/workstation-services"

export const LOADER_FILE = "service-loader.ts"

export function loadedHere(slug: string): boolean {
  return LOADED.has(slug)
}

export function loaderRun(slug: string): string {
  return `${RUN} ${HOME}/${STAGING}/${LOADER_FILE} ${slug}`
}

export function manifestFile(slug: string): string {
  return `${slug}${PATHS}`
}

export function manifestText(paths: Iterable<string>): string {
  return `${[...paths].sort().join("\n")}\n`
}

export function loaderText(root: string, port: number, runner: string): string {
  return String.raw`import { plugin } from "bun"
import { readFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"

const ROOT = ${JSON.stringify(root)}
const READ = ${JSON.stringify(`http://127.0.0.1:${port}/read`)}
const RUNNER = ${JSON.stringify(AKASHA + runner)}
const PATHS = ${JSON.stringify(PATHS)}
const AKASHA = ${JSON.stringify(AKASHA)}
const WIRE = "wire"
const SAID = "service-loader:"
const REFUSED_EXIT = 2
const ANSWER_IN = 20000
const ASK_AGAIN_FOR = 60000
const FIRST_WAIT = 250
const LONGEST_WAIT = 2000

process.env["AKASHA_ROOT"] ??= ROOT

const slug = process.argv[2]
if (slug === undefined) {
  process.stderr.write(SAID + " name the service to run\n")
  process.exit(REFUSED_EXIT)
}

const held = new Map<string, string>()
let late = 0

function waited(ms: number): Promise<undefined> {
  return new Promise((go) => setTimeout(go, ms))
}

async function answered(paths: readonly string[]): Promise<string> {
  const body = JSON.stringify({ paths })
  const stopAt = Date.now() + ASK_AGAIN_FOR
  let wait = FIRST_WAIT
  let tries = 0
  let why = "it was never reached"
  for (;;) {
    tries += 1
    try {
      const answer = await fetch(READ, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        signal: AbortSignal.timeout(ANSWER_IN),
      })
      if (answer.ok) return await answer.text()
      why = "it answered " + answer.status
    } catch (thrown) {
      why = thrown instanceof Error ? thrown.message : String(thrown)
    }
    if (stopAt - Date.now() <= 0) break
    process.stderr.write(
      SAID + " " + READ + " did not answer (" + why + "); asking again in " + wait + "ms\n"
    )
    await waited(wait)
    wait = Math.min(wait * 2, LONGEST_WAIT)
  }
  process.stderr.write(
    SAID + " the pages service did not answer at " + READ + ", over " + tries +
      " tries: " + why + "\n"
  )
  process.exit(REFUSED_EXIT)
}

async function asked(paths: readonly string[]): Promise<undefined> {
  if (paths.length === 0) return
  const said = JSON.parse(await answered(paths)) as {
    bodies?: { path: string; content: string | null }[]
    refused?: string
  }
  if (said.refused !== undefined) throw new Error(SAID + " " + said.refused)
  for (const one of said.bodies ?? []) {
    if (one.content !== null) held.set(one.path, one.content)
  }
}

async function bodyOf(path: string): Promise<string> {
  const kept = held.get(path)
  if (kept !== undefined) return kept
  late += 1
  await asked([path])
  const got = held.get(path)
  if (got === undefined) throw new Error(SAID + " nothing was answered for " + path)
  return got
}

await asked(
  readFileSync(join(import.meta.dir, slug + PATHS), "utf8")
    .split("\n")
    .filter((one) => one !== "")
)

plugin({
  name: "akasha-over-the-wire",
  setup(build) {
    build.onResolve({ filter: /^akasha\// }, (args) => ({
      path: join(ROOT, args.path.slice(AKASHA.length)),
      namespace: WIRE,
    }))
    build.onResolve({ filter: /^\./, namespace: WIRE }, (args) => ({
      path: join(dirname(args.importer), args.path),
      namespace: WIRE,
    }))
    build.onLoad({ filter: /.*/, namespace: WIRE }, async (args) => ({
      contents: await bodyOf(relative(ROOT, args.path)),
      loader: "ts",
    }))
  },
})

process.on("exit", () => {
  if (late > 0) process.stderr.write(SAID + " " + late + " asked for one at a time\n")
})

const running = (await import(RUNNER)) as {
  runNamedService: (argv: readonly string[], root?: string, codeAt?: string) => Promise<number>
}
process.exitCode = await running.runNamedService([slug], ROOT, "")
`
}

export function loaderFiles(
  root: string,
  port: number,
  runner: string,
  closures: ReadonlyMap<string, ReadonlySet<string>>
): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  held.set(LOADER_FILE, loaderText(root, port, runner))
  for (const [slug, built] of closures) held.set(manifestFile(slug), manifestText(built))
  return held
}
