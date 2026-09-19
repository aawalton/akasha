import { realpathSync } from "node:fs"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const CONFIG_DIR_ENV = SHAPE.string().optional()

const HOME_ENV = SHAPE.string().default("/home/walton")

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
