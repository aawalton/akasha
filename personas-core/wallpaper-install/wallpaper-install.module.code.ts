import { parseImageName } from "../image-name/image-name.module.code.ts"

export interface WallpaperInstallPlan {
  readonly writePath: string
  readonly deletePaths: readonly string[]
}

export interface PlanWallpaperInstallInput {
  readonly dirEntries: readonly string[]
  readonly wallpaperDir: string
  readonly slug: string
  readonly level: number
  readonly newName: string
}

function joinPath(dir: string, name: string): string {
  return dir.endsWith("/") ? `${dir}${name}` : `${dir}/${name}`
}

export function planWallpaperInstall(input: PlanWallpaperInstallInput): WallpaperInstallPlan {
  const deletePaths = input.dirEntries
    .filter((name) => {
      if (name === input.newName) return false
      const parsed = parseImageName(name)
      return parsed !== null && parsed.slug === input.slug && parsed.level === input.level
    })
    .map((name) => joinPath(input.wallpaperDir, name))
  return { writePath: joinPath(input.wallpaperDir, input.newName), deletePaths }
}
