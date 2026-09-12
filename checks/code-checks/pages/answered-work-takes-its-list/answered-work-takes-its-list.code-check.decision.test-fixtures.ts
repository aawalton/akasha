import { founded } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bodiesIn } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const ROOT = "/repo"

export const AT = "akasha/held.command.code.ts"

export const ELSEWHERE = "akasha/elsewhere/held.module.code.ts"

export const TAKING = `import { answering } from "${ELSEWHERE}"\n`

export const BARE = `${TAKING}\nexport const one = answering(async () => {\n  return await work()\n})\n`

export const HANDED = `${TAKING}\nexport const one = answering(async (done) => {\n  return await work(done)\n})\n`

export const given = bodiesIn(ROOT)

export const scratch = scratchWorld()

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-answered-work-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-answered-work-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
