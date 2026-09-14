import { writeFileSync } from "node:fs"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { checkIn, judgingBy } from "akasha/checks/modules/checking/checking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"

const AUDIT = "audit"

const TAKES = "an audit of one check takes a root, a check and a file to answer into"

const GATHERS_NONE = "is no check this tree gathers, so nothing here judged anything"

export async function judgedAlone(root: string, slug: string): Promise<readonly Judged[]> {
  const one = checkIn(root, slug)
  if (one === null) throw new Error(`\`${slug}\` ${GATHERS_NONE}`)
  return await judgingBy([one], AUDIT, root).over(everythingIn(root))
}

export async function answeredInto(root: string, slug: string, at: string): Promise<string> {
  writeFileSync(at, JSON.stringify(await judgedAlone(root, slug)), "utf8")
  return at
}

export async function runAuditChild(argv: readonly string[]): Promise<undefined> {
  const [root, slug, at] = argv
  if (root === undefined || slug === undefined || at === undefined) {
    throw new Error(`${TAKES}, and was handed ${counted(argv.length, "word")}`)
  }
  await answeredInto(root, slug, at)
}

if (import.meta.main) await runAuditChild(process.argv.slice(2))
