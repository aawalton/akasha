import { join, resolve } from "node:path"
import { textThere } from "akasha/file/system/modules/text-there/text-there.module.code.ts"
import { git } from "akasha/git/modules/capping/git-capping.module.code.ts"
import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"

const ASKED: readonly string[] = ["rev-parse", "--absolute-git-dir"]

const COMMON_DIR = "commondir"

const HEAD = "HEAD"

const REF_MARK = "ref: "

const HASH = /^[0-9a-f]{40}$/

export function headOf(root: string): string {
  return gitSaid(root, ["rev-parse", "HEAD"]).trim()
}

function textAt(at: string): string | null {
  return textThere(at)?.trim() ?? null
}

const GIT_DIRS = new Map<string, string | null>()

function gitDirOf(root: string): string | null {
  if (GIT_DIRS.has(root)) return GIT_DIRS.get(root) ?? null
  const said = git(root, ASKED)
  const found = said.code === 0 && said.stdout !== "" ? said.stdout : null
  GIT_DIRS.set(root, found)
  return found
}

function filedHead(root: string): string | null {
  const gitDir = gitDirOf(root)
  const head = gitDir === null ? null : textAt(join(gitDir, HEAD))
  if (gitDir === null || head === null) return null
  if (!head.startsWith(REF_MARK)) return head
  const ref = head.slice(REF_MARK.length)
  const common = textAt(join(gitDir, COMMON_DIR))
  const commonDir = common === null ? gitDir : resolve(gitDir, common)
  return textAt(join(gitDir, ref)) ?? textAt(join(commonDir, ref))
}

export function headAt(root: string): string {
  const filed = filedHead(root)
  return filed !== null && HASH.test(filed) ? filed : headOf(root)
}
