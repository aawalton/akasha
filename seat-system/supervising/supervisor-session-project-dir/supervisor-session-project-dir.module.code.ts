import { realpathSync } from "node:fs"
import { shape } from "@akasha/utils-narrow/shape"

const CONFIG_DIR_ENV = shape.string().optional()

const HOME_ENV = shape.string().default("/home/walton")

export function sessionProjectDir(cwd: string, configDir?: string): string {
  let resolved = cwd
  try {
    resolved = realpathSync(cwd)
  } catch {}
  const dirName = resolved.replace(/\//g, "-")
  const claudeConfigDir = CONFIG_DIR_ENV.parse(process.env.CLAUDE_CONFIG_DIR)
  const home = HOME_ENV.parse(process.env.HOME)
  const base = configDir ?? claudeConfigDir ?? `${home}/.claude`
  return `${base}/projects/${dirName}`
}
