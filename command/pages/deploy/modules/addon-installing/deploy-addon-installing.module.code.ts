import { dirname, join } from "node:path"
import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { compiledAddon } from "akasha/temper/addon-build/modules/addon-compiling/addon-compiling.module.code.ts"
import { placedAddon } from "akasha/temper/addon-build/modules/addon-placing/addon-placing.module.code.ts"
import { listAllAddons } from "akasha/temper/addons-resolve/modules/addon-roster/addon-roster.module.code.ts"

export async function putUpAddon(
  codeAt: string,
  slug: string,
  pagePath: string,
  up: string[] = []
): Promise<Answer> {
  const under = dirname(pagePath)
  const dir = join(codeAt, under)
  const found = listAllAddons({ repoRoot: codeAt }).find((one) => one.dir === dir)
  if (found === undefined) {
    return refused(
      `\`${slug}\` has its page at ${pagePath}, and no addon manifest sits in ${under}, so nothing says what the game loads`,
      DATA
    )
  }
  const name = found.canonicalName
  const report: string[] = []
  const compiled = await compiledAddon(codeAt, dir, name)
  report.push(...compiled.lines)
  if (compiled.refusals.length > 0) return answeredWith(report, compiled.refusals, OPERATIONAL)
  up.push(`${name}, compiled from ${under}`)

  const placed = placedAddon(codeAt, dir, name)
  report.push(...placed.lines)
  if (placed.refusals.length > 0) return answeredWith(report, placed.refusals, OPERATIONAL)
  up.push(`${name}, placed where the game reads it`)
  return told(report)
}
