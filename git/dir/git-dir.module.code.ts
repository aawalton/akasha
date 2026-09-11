import { isAbsolute, resolve } from "node:path"
import { git } from "akasha/git/capping/git-capping.module.code.ts"

const ASKED: readonly string[] = ["rev-parse", "--git-common-dir"]

export function gitDirIn(root: string): string | null {
  const said = git(root, ASKED)
  if (said.code !== 0 || said.stdout === "") return null
  return isAbsolute(said.stdout) ? said.stdout : resolve(root, said.stdout)
}
