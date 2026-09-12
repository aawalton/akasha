import { homedir } from "node:os"
import { isAbsolute, join, resolve } from "node:path"

const HOME = "~/"

export function pathUnder(root: string, path: string): string {
  if (path.startsWith(HOME)) return join(homedir(), path.slice(HOME.length))
  return isAbsolute(path) ? path : resolve(root, path)
}
