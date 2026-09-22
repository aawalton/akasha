import { writeFileSync } from "node:fs"
import { auditedBy, checkIn } from "akasha/check/modules/checking/checking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const AUDIT = "audit"

const TAKES = "an audit of one check takes a root, a check and a file to answer into"

const GATHERS_NONE = "is no check this tree gathers, so nothing here judged anything"

export async function judgedAlone(root: string, slug: string): Promise<readonly Judged[]> {
  const one = checkIn(root, slug)
  if (one === null) throw new Error(`\`${slug}\` ${GATHERS_NONE}`)
  return await auditedBy([one], AUDIT, root)
}

async function answeredInto(root: string, slug: string, at: string): Promise<string> {
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
