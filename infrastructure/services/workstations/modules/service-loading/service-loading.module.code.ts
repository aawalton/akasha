const PATHS = ".paths"

const AKASHA = "akasha/"

const HOME = "%h"

const RUN = "bun"

const LOADED: ReadonlySet<string> = new Set([
  "apns-push-notifier",
  "code-editor-data-watcher",
  "memory-reaper",
  "surplus-fall-notifier",
  "sweep-log-days",
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

const slug = process.argv[2]
if (slug === undefined) {
  process.stderr.write(SAID + " name the service to run\n")
  process.exit(REFUSED_EXIT)
}

const held = new Map<string, string>()
let late = 0

function asked(paths: readonly string[]): undefined {
  if (paths.length === 0) return
  const answer = Bun.spawnSync({
    cmd: [
      "curl", "-s", "-m", "60", "-X", "POST", READ,
      "-H", "content-type: application/json",
      "--data-binary", "@-",
    ],
    stdin: new TextEncoder().encode(JSON.stringify({ paths })),
  })
  const said = JSON.parse(answer.stdout.toString()) as {
    bodies?: { path: string; content: string }[]
    refused?: string
  }
  if (said.refused !== undefined) throw new Error(SAID + " " + said.refused)
  for (const one of said.bodies ?? []) held.set(one.path, one.content)
}

function bodyOf(path: string): string {
  const kept = held.get(path)
  if (kept !== undefined) return kept
  late += 1
  asked([path])
  const got = held.get(path)
  if (got === undefined) throw new Error(SAID + " nothing was answered for " + path)
  return got
}

asked(
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
    build.onLoad({ filter: /.*/, namespace: WIRE }, (args) => ({
      contents: bodyOf(relative(ROOT, args.path)),
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
