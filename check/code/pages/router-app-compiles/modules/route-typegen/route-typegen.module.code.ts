import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { routeTypesDirectory } from "akasha/code/router-app/properties/route-types-directory.build-folder-property.ts"
import { endingOf, ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { SCRATCH_AT } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const PREFIX = "akasha-route-typegen-"

const GIT = ".git"

const TYPES = "types"

const HERE = "."

const TOP = ""

const PACKAGES = "node_modules"

const BUNDLED = join(PACKAGES, ".vite-temp")

const RUNNER = join(PACKAGES, ".bin", "react-router")

const TYPEGEN = "typegen"

const WAITED = 120_000

export type Laid = (path: string) => Uint8Array | null

export type Typegen = {
  readonly types: string
  readonly failed: string | null
  readonly sweep: () => undefined
}

export function typesUnder(app: string): string {
  return join(app, routeTypesDirectory.folderName, TYPES)
}

function foldersOf(app: string, own: readonly string[]): ReadonlySet<string> {
  const held = new Set<string>([TOP])
  for (const one of [app, ...own.map(dirname)]) {
    let at = one
    while (at !== HERE && at !== TOP && !held.has(at)) {
      held.add(at)
      at = dirname(at)
    }
  }
  return held
}

function namesAt(root: string, folder: string): readonly string[] {
  const at = join(root, folder)
  return existsSync(at) ? readdirSync(at).sort() : []
}

function linked(
  root: string,
  into: string,
  folder: string,
  folders: ReadonlySet<string>,
  left: ReadonlySet<string>
): undefined {
  mkdirSync(join(into, folder), { recursive: true })
  for (const name of namesAt(root, folder)) {
    const path = folder === TOP ? name : `${folder}/${name}`
    if (path === GIT || left.has(path)) continue
    if (folders.has(path)) linked(root, into, path, folders, left)
    else symlinkSync(join(root, path), join(into, path))
  }
}

function written(into: string, own: readonly string[], laid: Laid): undefined {
  for (const path of own) {
    const bytes = laid(path)
    if (bytes === null) continue
    mkdirSync(dirname(join(into, path)), { recursive: true })
    writeFileSync(join(into, path), bytes)
  }
}

export function typegenOf(
  root: string,
  app: string,
  changed: readonly string[],
  laid: Laid
): Typegen {
  const into = mkdtempSync(join(SCRATCH_AT, PREFIX))
  const sweep = (): undefined => {
    rmSync(into, { recursive: true, force: true })
  }
  try {
    const own = changed.filter((one) => one.startsWith(`${app}/`))
    const left = new Set([...own, join(app, routeTypesDirectory.folderName), BUNDLED])
    const folders = new Set([...foldersOf(app, own), PACKAGES])
    linked(root, into, TOP, folders, left)
    written(into, own, laid)
    const done = ran([join(root, RUNNER), TYPEGEN], { cwd: join(into, app), timeout: WAITED })
    const said = `${endingOf(done.code, done.signal)} — ${done.err.trim()}`
    const failed = done.code === 0 ? null : said.replaceAll(into, root)
    return { types: join(into, typesUnder(app)), failed, sweep }
  } catch (thrown) {
    sweep()
    throw thrown
  }
}
