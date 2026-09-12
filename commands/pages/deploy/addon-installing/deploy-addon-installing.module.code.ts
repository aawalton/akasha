import { dirname, join } from "node:path"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answering, refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  bundlePathFor,
  compiledAddon,
} from "akasha/temper/addon-build/addon-compiling/addon-compiling.module.code.ts"
import { placedAddon } from "akasha/temper/addon-build/addon-placing/addon-placing.module.code.ts"
import { listAllAddons } from "akasha/temper/addons-resolve/addon-roster/addon-roster.module.code.ts"
import { addonsDir } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

function goingTo(): string {
  try {
    return addonsDir()
  } catch (thrown) {
    return `nowhere this machine answers for — ${saidBy(thrown)}`
  }
}

export async function putUpAddon(
  codeAt: string,
  slug: string,
  pagePath: string,
  dryRun: boolean
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
  if (dryRun) {
    return answering(
      [
        `${slug} would be compiled from ${under} to ${bundlePathFor(codeAt, name)}`,
        `and placed as ${name} in ${goingTo()}`,
      ],
      [],
      OK
    )
  }

  const report: string[] = []
  const compiled = await compiledAddon(codeAt, dir, name)
  report.push(...compiled.lines)
  if (compiled.refusals.length > 0) return answering(report, compiled.refusals, OPERATIONAL)

  const placed = placedAddon(codeAt, dir, name)
  report.push(...placed.lines)
  if (placed.refusals.length > 0) return answering(report, placed.refusals, OPERATIONAL)
  return answering(report, [], OK)
}
