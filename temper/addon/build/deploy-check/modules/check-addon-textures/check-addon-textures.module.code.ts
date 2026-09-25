import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { listAllAddons } from "akasha/temper/addon/build/resolve/modules/addon-roster/addon-roster.module.code.ts"
import {
  addonMarkupFiles,
  addonSourceFiles,
} from "akasha/temper/addon/build/deploy-check/modules/addon-source-files/addon-source-files.module.code.ts"
import {
  addonTextureOf,
  bindingsIn,
  isGameTexture,
  slashed,
  type TextureNamed,
  texturesIn,
} from "akasha/temper/addon/build/deploy-check/modules/addon-texture-names/addon-texture-names.module.code.ts"
import {
  parseArgs as parseCliArgs,
  REPO_ROOT_FLAG,
} from "akasha/temper/addon/build/deploy-check/modules/cli-args/cli-args.module.code.ts"
import { errorMessage } from "akasha/temper/addon/build/deploy-check/modules/error-message/error-message.module.code.ts"
import { renderPopulationBound } from "akasha/temper/addon/build/deploy-check/modules/population-bound/population-bound.module.code.ts"
import { getRepoRoot } from "akasha/temper/addon/build/deploy-check/modules/repo-root/repo-root.module.code.ts"
import {
  esoArtDir,
  esoClientDir,
  esouiSourceDir,
} from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import {
  type ArchiveRead,
  openGameArchive,
} from "akasha/temper/eso/ui-harness/modules/game-archive/game-archive.module.code.ts"
import { oodleUnpack } from "akasha/temper/eso/ui-harness/modules/oodle-decoding/oodle-decoding.module.code.ts"

const PREFIX = "[addon-textures]"

const SHARED_CODE = ["temper/window", "temper/modules"]

const GAME_SOURCE_KINDS = /\.(lua|xml)$/

type Scan = {
  readonly missing: readonly TextureNamed[]
  readonly unconfirmed: readonly TextureNamed[]
  readonly built: readonly TextureNamed[]
  readonly judged: number
  readonly gameLooked: boolean
}

function filesUnder(dir: string, found: string[] = []): string[] {
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return found
  }
  for (const entry of entries) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) filesUnder(path, found)
    else found.push(path)
  }
  return found
}

function shippedBy(repoRoot: string): ReadonlyMap<string, ReadonlySet<string>> {
  const shipped = new Map<string, ReadonlySet<string>>()
  for (const addon of listAllAddons({ repoRoot })) {
    const dir = join(repoRoot, addon.repoRelDir)
    const held = new Set(filesUnder(dir).map((file) => slashed(relative(dir, file))))
    shipped.set(addon.canonicalName.toLowerCase(), held)
  }
  return shipped
}

function namedBy(repoRoot: string): readonly string[] {
  const files: string[] = []
  for (const addon of listAllAddons({ repoRoot })) {
    const dir = join(repoRoot, addon.repoRelDir)
    files.push(...addonSourceFiles(dir).code, ...addonMarkupFiles(dir).own)
  }
  for (const shared of SHARED_CODE) files.push(...addonSourceFiles(join(repoRoot, shared)).code)
  return files
}

function gameSourceNames(): ReadonlySet<string> {
  const names = new Set<string>()
  for (const file of filesUnder(esouiSourceDir())) {
    if (!GAME_SOURCE_KINDS.test(file)) continue
    for (const one of texturesIn(readFileSync(file, "latin1"), file).named) {
      names.add(slashed(one.path))
    }
  }
  return names
}

async function gameArchive(): Promise<ArchiveRead | null> {
  const client = esoClientDir()
  if (!existsSync(client)) return null
  return openGameArchive(client, await oodleUnpack(esoArtDir()))
}

async function scanTextures(repoRoot: string): Promise<Scan> {
  const shipped = shippedBy(repoRoot)
  const archive = await gameArchive()
  const gameNames = existsSync(esouiSourceDir()) ? gameSourceNames() : new Set<string>()
  const missing: TextureNamed[] = []
  const unconfirmed: TextureNamed[] = []
  const built: TextureNamed[] = []
  let judged = 0
  const files = namedBy(repoRoot)
  const texts = new Map(files.map((file) => [file, readFileSync(file, "utf8")]))
  const bindings = new Map<string, string[]>()
  for (const text of texts.values()) bindingsIn(text, bindings)
  for (const file of files) {
    const found = texturesIn(texts.get(file) ?? "", relative(repoRoot, file), bindings)
    built.push(...found.built)
    for (const one of found.named) {
      judged += 1
      if (isGameTexture(one.path)) {
        const plain = slashed(one.path)
        if (gameNames.has(plain) || archive?.(plain) != null) continue
        unconfirmed.push(one)
        continue
      }
      const own = addonTextureOf(one.path)
      if (own !== null && shipped.get(own.addon)?.has(own.rest) === true) continue
      missing.push(one)
    }
  }
  return { missing, unconfirmed, built, judged, gameLooked: archive !== null }
}

function listed(title: string, all: readonly TextureNamed[]): undefined {
  if (all.length === 0) return undefined
  process.stdout.write(`${PREFIX} ${title} — ${all.length}:\n`)
  for (const one of all) process.stdout.write(`  - ${one.file}:${one.line} ${one.path}\n`)
  return undefined
}

function reportHuman(scan: Scan): undefined {
  listed("named by an add-on and shipped by none", scan.missing)
  listed("the game's, and neither its archive nor its own interface names it", scan.unconfirmed)
  listed("built as the add-on runs, so not judged", scan.built)
  const bound = renderPopulationBound({
    examined: scan.judged,
    declared: scan.judged + scan.built.length,
    unit: "texture paths",
  })
  const looked = scan.gameLooked ? "" : " The game's install was not found, so no game texture is confirmed by its archive."
  process.stdout.write(
    `${PREFIX} ${scan.missing.length} missing, ${scan.unconfirmed.length} unconfirmed ${bound}.${looked}\n`
  )
  return undefined
}

async function main(): Promise<0 | 1 | 2> {
  let scan: Scan
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    scan = await scanTextures(repoRoot)
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }
  reportHuman(scan)
  return scan.missing.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(await main())
}
