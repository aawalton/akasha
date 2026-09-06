import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import { everyOfType } from "@akasha/indexes"
import { akashaRoot } from "@akasha/pages/checkout-roots"
import { besideAt } from "@akasha/pages/page-file-name"
import { uncommittedIn } from "@akasha/pages/page-uncommitted"
import { textAt, valueAt } from "@akasha/pages/page-value"
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

// THE STAMP IS KEPT OUTSIDE THE COMMIT. A persona's `lastMessagedAt` sits in the file beside her
// page rather than in her page, so the stamp is read through `uncommittedIn` rather than through
// the value the page carries.
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

// ALAN'S DESKTOP LANDS ON THE PERSONA ALAN'S PHONE LANDS ON. The order comes from `wallpaper-order`
// rather than from a second rule here, so the two callers cannot drift apart.
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
    // A DECLARED WALLPAPER THAT IS NOT ON DISK IS PASSED OVER RATHER THAN FAILING THE RUN. The
    // declaration and the picture land in separate commits, so a persona can carry the declaration
    // without the picture, and the persona below still has a picture to show.
    if (!present(at)) continue
    return { slug, path: at }
  }
  return null
}

function plasmaRan(at: string): Ran {
  const ran = spawnSync(SETTER, [at], { encoding: "utf8" })
  if (ran.error !== undefined) {
    return { status: 1, said: `${SETTER} did not run: ${ran.error.message}` }
  }
  const status = ran.status ?? 1
  if (status === 0) return { status, said: `${SETTER} was pointed at ${at}` }
  return { status, said: `${SETTER} refused ${at}: ${(ran.stderr ?? "").trim()}` }
}

export function settingIn(
  root: string,
  run: (at: string) => Ran = plasmaRan,
  chosen: Chosen | null = chosenIn(root)
): Ran {
  if (chosen === null) {
    return { status: 1, said: "No persona carries a desktop wallpaper that is on disk." }
  }
  const ran = run(chosen.path)
  return { status: ran.status, said: `${chosen.slug}: ${ran.said}` }
}

if (import.meta.main) {
  const setting = settingIn(akashaRoot())
  const said = `${setting.said}\n`
  if (setting.status === 0) process.stdout.write(said)
  else process.stderr.write(said)
  process.exit(setting.status)
}
