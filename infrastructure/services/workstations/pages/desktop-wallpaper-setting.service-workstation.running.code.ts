import { runDesktopWallpaperSetting } from "akasha/personas/desktop-wallpaper-setting/desktop-wallpaper-setting.module.code.ts"

export function runService(): undefined {
  const code = runDesktopWallpaperSetting()
  if (code !== 0) process.exit(code)
}
