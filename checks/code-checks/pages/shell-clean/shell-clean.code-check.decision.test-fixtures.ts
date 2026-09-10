import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { noPathsFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"

const HERE = "shell-clean-"

export const ONE = "akasha/one.sh"

export const CLEAN = '#!/usr/bin/env bash\nset -euo pipefail\n\necho "held"\n'

export const FAULT = "#!/usr/bin/env bash\nset -euo pipefail\n\nheld=$1\necho $held\n"

export const UNQUOTED = "Double quote to prevent globbing"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = realpathSync(scratch.rootFor(HERE))
  noPathsFiled(root)
  return root
}

export function tracked(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, said] of Object.entries(files)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, said)
  }
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
