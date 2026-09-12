import { watchDesktopWallpaper } from "akasha/personas/desktop-wallpaper-setting/desktop-wallpaper-setting.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  watchDesktopWallpaper()
  return await NEVER
}
