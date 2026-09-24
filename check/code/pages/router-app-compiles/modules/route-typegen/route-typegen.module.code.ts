import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { basename, dirname, join } from "node:path"
import { routeTypesDirectory } from "akasha/code/router-app/properties/route-types-directory.build-folder-property.ts"
import { endingOf, ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { SCRATCH_AT } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const PREFIX = "akasha-route-typegen-"

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

function namesIn(paths: readonly string[]): ReadonlyMap<string, readonly string[]> {
  const held = new Map<string, Set<string>>()
  for (const one of paths) {
    let at = one
    while (at !== HERE && at !== TOP) {
      const up = dirname(at)
      const above = up === HERE ? TOP : up
      const kept = held.get(above)
      if (kept === undefined) held.set(above, new Set<string>([basename(at)]))
      else if (kept.has(basename(at))) break
      else kept.add(basename(at))
      at = above
    }
  }
  return new Map([...held].map(([at, names]) => [at, [...names].sort()]))
}

type Linking = {
  readonly root: string
  readonly into: string
  readonly names: ReadonlyMap<string, readonly string[]>
  readonly folders: ReadonlySet<string>
  readonly left: ReadonlySet<string>
}

function linked(linking: Linking, folder: string): undefined {
  mkdirSync(join(linking.into, folder), { recursive: true })
  for (const name of linking.names.get(folder) ?? []) {
    const path = folder === TOP ? name : `${folder}/${name}`
    if (linking.left.has(path)) continue
    if (linking.folders.has(path)) linked(linking, path)
    else symlinkSync(join(linking.root, path), join(linking.into, path))
  }
}

function vendored(linking: Linking): undefined {
  const at = join(linking.root, PACKAGES)
  if (!existsSync(at)) return
  mkdirSync(join(linking.into, PACKAGES), { recursive: true })
  for (const name of readdirSync(at).sort()) {
    const path = join(PACKAGES, name)
    if (!linking.left.has(path)) symlinkSync(join(at, name), join(linking.into, path))
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

export type Tree = {
  readonly root: string
  readonly paths: readonly string[]
  readonly changed: readonly string[]
  readonly laid: Laid
}

export function typegenOf(tree: Tree, app: string): Typegen {
  const root = tree.root
  const into = mkdtempSync(join(SCRATCH_AT, PREFIX))
  const sweep = (): undefined => {
    rmSync(into, { recursive: true, force: true })
  }
  try {
    const own = tree.changed.filter((one) => one.startsWith(`${app}/`))
    const left = new Set([...own, join(app, routeTypesDirectory.folderName), PACKAGES, BUNDLED])
    const folders = foldersOf(app, own)
    const linking = { root, into, names: namesIn(tree.paths), folders, left }
    linked(linking, TOP)
    vendored(linking)
    written(into, own, tree.laid)
    const done = ran([join(root, RUNNER), TYPEGEN], { cwd: join(into, app), timeout: WAITED })
    const said = `${endingOf(done.code, done.signal)} — ${done.err.trim()}`
    const failed = done.code === 0 ? null : said.replaceAll(into, root)
    return { types: join(into, typesUnder(app)), failed, sweep }
  } catch (thrown) {
    sweep()
    throw thrown
  }
}
