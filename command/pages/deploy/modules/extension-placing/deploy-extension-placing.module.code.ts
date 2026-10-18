import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export const EXTENSIONS = ".local/share/browser-extensions"

export const WORKER_FILE = "worker.js"

export const SITE_FILE = "site.js"

const MANIFEST_FILE = "manifest.json"

const WORKER = "worker.code"

const SITE = "site.code"

const TS = "ts"

const STUBS = "/var/tmp/akasha-extension-bundling"

type Bundled = { readonly text: string } | { readonly refused: string }

type Held = Readonly<Record<string, unknown>>

function isHeld(value: unknown): value is Held {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

export function placedAt(home: string, slug: string): string {
  return join(home, EXTENSIONS, slug)
}

function namesOnly(said: unknown, file: string): boolean {
  return Array.isArray(said) && said.length === 1 && said[0] === file
}

export function manifestFault(manifest: unknown): string | null {
  if (!isHeld(manifest)) return "the worker code exports no manifest"
  const background = manifest.background
  if (!isHeld(background) || background.service_worker !== WORKER_FILE) {
    return `the manifest names no \`${WORKER_FILE}\` as its worker`
  }
  const scripts = manifest.content_scripts
  if (!Array.isArray(scripts) || scripts.length === 0) {
    return "the manifest names no page the site code runs in"
  }
  for (const one of scripts) {
    if (!isHeld(one) || !namesOnly(one.js, SITE_FILE)) {
      return `the manifest names a file other than \`${SITE_FILE}\` as site code`
    }
  }
  return null
}

async function bundled(root: string, stub: string, entry: string, runs: string): Promise<Bundled> {
  await Bun.write(stub, `import { ${runs} } from ${JSON.stringify(entry)}\n\n${runs}()\n`)
  const was = process.cwd()
  process.chdir(root)
  try {
    const built = await Bun.build({ entrypoints: [stub], target: "browser", format: "iife" })
    if (!built.success) return { refused: built.logs.map(String).join("; ") }
    const first = built.outputs[0]
    if (first === undefined) return { refused: "the bundler wrote no file" }
    return { text: await first.text() }
  } catch (thrown) {
    return { refused: saidBy(thrown) }
  } finally {
    process.chdir(was)
  }
}

function codeAt(codeRoot: string, pagePath: string, group: string): string | null {
  const beside = besideAt(pagePath, group, TS)
  if (beside === null) return null
  const at = join(codeRoot, beside)
  return existsSync(at) ? at : null
}

function swapped(at: string, files: Readonly<Record<string, string>>): undefined {
  const next = `${at}.next`
  rmSync(next, { recursive: true, force: true })
  mkdirSync(next, { recursive: true })
  for (const [name, text] of Object.entries(files)) writeFileSync(join(next, name), text)
  rmSync(at, { recursive: true, force: true })
  renameSync(next, at)
}

export async function putUpExtension(
  codeRoot: string,
  slug: string,
  pagePath: string,
  up: string[] = [],
  home: string = homedir()
): Promise<Answer> {
  const worker = codeAt(codeRoot, pagePath, WORKER)
  const site = codeAt(codeRoot, pagePath, SITE)
  if (worker === null || site === null) {
    return refused(`\`${slug}\` keeps no worker code or no site code beside ${pagePath}`, DATA)
  }
  const loaded: Held = await import(worker)
  const fault = manifestFault(loaded.manifest)
  if (fault !== null) return refused(`\`${slug}\` would not be placed: ${fault}`, DATA)
  const workerMade = await bundled(codeRoot, join(STUBS, `${slug}.worker.ts`), worker, "runWorker")
  const siteMade = await bundled(codeRoot, join(STUBS, `${slug}.site.ts`), site, "runSite")
  const refusals = [workerMade, siteMade].flatMap((one) =>
    "refused" in one ? [`\`${slug}\` would not bundle — ${one.refused}`] : []
  )
  if ("refused" in workerMade || "refused" in siteMade) {
    return answeredWith([], refusals, OPERATIONAL)
  }
  const at = placedAt(home, slug)
  swapped(at, {
    [MANIFEST_FILE]: `${JSON.stringify(loaded.manifest, null, 2)}\n`,
    [WORKER_FILE]: workerMade.text,
    [SITE_FILE]: siteMade.text,
  })
  up.push(`${slug}, placed where Chrome loads it`)
  return told([`placed\t${slug}\t${at}`])
}
