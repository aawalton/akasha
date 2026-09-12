import { existsSync } from "node:fs"
import { homedir } from "node:os"
import { dirname, isAbsolute, join } from "node:path"
import { followWithin } from "akasha/infrastructure/services/workstations/file-following/file-following.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { everyOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { uncommittedIn } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import {
  orderedWallpaperSlugs,
  type WallpaperRow,
} from "akasha/personas/wallpaper-order/wallpaper-order.module.code.ts"
import { NO_CODE, ran, type Said } from "akasha/utils/run/running/running.module.code.ts"

const PERSONA = "persona"

const WALLPAPER_KEY = "desktopWallpaper"

const WALLPAPER_PROPERTY = "desktop-wallpaper"

const PNG = "png"

const SETTER = "plasma-apply-wallpaperimage"

const BLACK_HELD = "wallpaper-black-state.json"

const CACHE = ".cache"

const PAGE_TAIL = ".persona.ts"

const BESIDE_TAIL = ".persona.uncommitted.ts"

export type PersonaWallpaper = WallpaperRow & {
  readonly pagePath: string
}

export type Chosen = {
  readonly slug: string
  readonly path: string
}

export type Ran = {
  readonly status: number
  readonly said: string
}

export function everyPersonaWallpaper(root: string): readonly PersonaWallpaper[] {
  const found: PersonaWallpaper[] = []
  for (const listed of everyOfType(root, PERSONA)) {
    const value = valueAt(listed.path, root)
    if (value === null) continue
    const beside = uncommittedIn(root, listed.path)
    found.push({
      id: listed.id,
      pagePath: listed.path,
      slug: textAt(value, "slug"),
      wallpaper: textAt(value, WALLPAPER_KEY),
      lastMessagedAt: beside === null ? null : textAt(beside, "lastMessagedAt"),
    })
  }
  return found
}

export function chosenIn(
  root: string,
  personas: readonly PersonaWallpaper[] = everyPersonaWallpaper(root),
  present: (at: string) => boolean = existsSync
): Chosen | null {
  const bySlug = new Map<string, PersonaWallpaper>()
  for (const persona of personas) {
    const slug = persona.slug
    if (typeof slug === "string" && !bySlug.has(slug)) bySlug.set(slug, persona)
  }
  for (const slug of orderedWallpaperSlugs(personas)) {
    const persona = bySlug.get(slug)
    if (persona === undefined) continue
    const beside = besideAt(persona.pagePath, WALLPAPER_PROPERTY, PNG)
    if (beside === null) continue
    const at = isAbsolute(beside) ? beside : join(root, beside)
    if (!present(at)) continue
    return { slug, path: at }
  }
  return null
}

function plasmaRan(at: string): Ran {
  let done: Said
  try {
    done = ran([SETTER, at])
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { status: 1, said: `${SETTER} did not run: ${why}` }
  }
  if (done.code === 0) return { status: 0, said: `${SETTER} was pointed at ${at}` }
  const status = done.code === NO_CODE ? 1 : done.code
  return { status, said: `${SETTER} refused ${at}: ${done.err.trim()}` }
}

export function settingIn(
  root: string,
  run: (at: string) => Ran = plasmaRan,
  chosen: Chosen | null = chosenIn(root)
): Ran {
  if (chosen === null) {
    return { status: 1, said: "No persona carries a desktop wallpaper that is on disk." }
  }
  const done = run(chosen.path)
  return { status: done.status, said: `${chosen.slug}: ${done.said}` }
}

export function blackHeldAt(
  cache: string | undefined = process.env.XDG_CACHE_HOME,
  home: string = homedir()
): string {
  const at = cache === undefined || cache === "" ? join(home, CACHE) : cache
  return join(at, BLACK_HELD)
}

export function roundIn(
  root: string,
  run: (at: string) => Ran = plasmaRan,
  held: (at: string) => boolean = existsSync,
  heldAt: string = blackHeldAt()
): Ran {
  if (held(heldAt)) return { status: 0, said: "The key is holding the desktop black." }
  return settingIn(root, run)
}

function told(setting: Ran): number {
  const said = `${setting.said}\n`
  if (setting.status === 0) process.stdout.write(said)
  else process.stderr.write(said)
  return setting.status
}

export function holdsPersona(at: string): boolean {
  return at.endsWith(PAGE_TAIL) || at.endsWith(BESIDE_TAIL)
}

export function personaFoldersIn(root: string): ReadonlySet<string> {
  const folders = new Set<string>()
  for (const persona of everyPersonaWallpaper(root)) {
    const at = isAbsolute(persona.pagePath) ? persona.pagePath : join(root, persona.pagePath)
    folders.add(dirname(at))
  }
  return folders
}

export function watchDesktopWallpaper(): () => undefined {
  const root = akashaRoot()
  const following = followWithin(personaFoldersIn(root), holdsPersona, () => {
    told(roundIn(root))
    return undefined
  })
  for (const one of following.unfollowed) process.stderr.write(`No watch on ${one}.\n`)
  told(roundIn(root))
  return () => {
    following.stop()
    return undefined
  }
}

export function runDesktopWallpaperSetting(): number {
  return told(roundIn(akashaRoot()))
}

if (import.meta.main) {
  process.exit(runDesktopWallpaperSetting())
}
