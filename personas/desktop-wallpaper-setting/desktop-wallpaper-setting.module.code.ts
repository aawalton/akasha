import { existsSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import { everyOfType } from "@akasha/indexes"
import { NO_CODE, ran, type Said } from "@akasha/utils/run/running"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { textAt, valueAt } from "akasha/pages/value/page-value.module.code.ts"
import {
  orderedWallpaperSlugs,
  type WallpaperRow,
} from "../wallpaper-order/wallpaper-order.module.code.ts"

const PERSONA = "persona"

const WALLPAPER_KEY = "desktopWallpaper"

const WALLPAPER_PROPERTY = "desktop-wallpaper"

const PNG = "png"

const SETTER = "plasma-apply-wallpaperimage"

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

if (import.meta.main) {
  const setting = settingIn(akashaRoot())
  const said = `${setting.said}\n`
  if (setting.status === 0) process.stdout.write(said)
  else process.stderr.write(said)
  process.exit(setting.status)
}
