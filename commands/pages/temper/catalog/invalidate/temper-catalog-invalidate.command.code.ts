import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { all as allArgument } from "akasha/commands/arguments/pages/all.argument.ts"
import { domain as domainArgument } from "akasha/commands/arguments/pages/domain.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { sideFile as sideFileArgument } from "akasha/commands/arguments/pages/side-file.argument.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperCatalogInvalidate as page } from "akasha/commands/pages/temper/catalog/invalidate/temper-catalog-invalidate.command.ts"
import { CATALOG_DOMAIN_KEYS } from "akasha/temper/catalog-core/domain-keys/domain-keys.module.code.ts"
import { resolveSideFilePath } from "akasha/temper/catalog-side-file/catalog-file-paths/catalog-file-paths.module.code.ts"
import {
  computeNextSideFile,
  parseSideFile,
  serializeSideFile,
} from "akasha/temper/catalog-side-file/catalog-side-file/catalog-side-file.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const NAMED = [json, sideFileArgument, allArgument, domainArgument]

const SPACES = 2

function strayIn(asked: readonly string[]): string | null {
  const known = new Set<string>(CATALOG_DOMAIN_KEYS)
  const stray = asked.filter((one) => !known.has(one))
  if (stray.length === 0) return null
  return `${stray.join(", ")} is no domain the catalog addon registers, and the registry holds ${String(CATALOG_DOMAIN_KEYS.length)} of them`
}

export function temperCatalogInvalidate(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const asked = taken.domain
  const stray = strayIn(asked)
  if (stray !== null) return refused(stray, INPUT)

  const sideFilePath = resolveSideFilePath(taken.sideFile)

  let next: ReturnType<typeof computeNextSideFile>
  try {
    const prior = existsSync(sideFilePath)
      ? parseSideFile(readFileSync(sideFilePath, "utf-8"))
      : undefined
    next = computeNextSideFile(prior, taken.all ? [] : asked)
    mkdirSync(dirname(sideFilePath), { recursive: true })
    writeFileSync(sideFilePath, serializeSideFile(next), "utf-8")
  } catch (thrown) {
    return refused(
      `the request at ${sideFilePath} was not written, so the addon collects nothing again: ${messageOf(thrown)}`,
      OPERATIONAL
    )
  }

  if (taken.json) {
    return { report: JSON.stringify(next, null, SPACES).split("\n"), refusals: [], code: OK }
  }

  const named = next.invalidateDomains.length === 0 ? "all" : next.invalidateDomains.join(",")
  return {
    report: [
      `invalidateVersion=${String(next.invalidateVersion)} invalidateDomains=${named}`,
      `written to ${sideFilePath}, and the addon collects again when the game next reloads`,
    ],
    refusals: [],
    code: OK,
  }
}
