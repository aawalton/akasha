import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { all as allArgument } from "akasha/commands/arguments/pages/all.argument.ts"
import { domain as domainArgument } from "akasha/commands/arguments/pages/domain.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { sideFile as sideFileArgument } from "akasha/commands/arguments/pages/side-file.argument.ts"
import {
  answering,
  INPUT,
  naming,
  refused,
  told,
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

export function madeSaid(folder: string): string {
  return `the folder ${folder}, which the game reads addons out of, was made by this`
}

function wroteSaid(at: string): string {
  return `the request at ${at}, which the addon reads when the game next reloads`
}

export type Named = {
  readonly domain: readonly string[]
  readonly all: boolean
  readonly json: boolean
  readonly sideFile: string | undefined
}

export type Writing = (done: string[], named: Named) => Answer

function written(done: string[], named: Named): Answer {
  const sideFilePath = resolveSideFilePath(named.sideFile)

  let next: ReturnType<typeof computeNextSideFile>
  try {
    const prior = existsSync(sideFilePath)
      ? parseSideFile(readFileSync(sideFilePath, "utf-8"))
      : undefined
    next = computeNextSideFile(prior, named.all ? [] : named.domain)
    const made = mkdirSync(dirname(sideFilePath), { recursive: true })
    if (made !== undefined) done.push(madeSaid(made))
    writeFileSync(sideFilePath, serializeSideFile(next), "utf-8")
    done.push(wroteSaid(sideFilePath))
  } catch (thrown) {
    throw new Error(
      `the request at ${sideFilePath} was not written, so the addon collects nothing again: ${messageOf(thrown)}`
    )
  }

  if (named.json) {
    return told(JSON.stringify(next, null, SPACES).split("\n"))
  }

  const said = next.invalidateDomains.length === 0 ? "all" : next.invalidateDomains.join(",")
  return told([
    `invalidateVersion=${String(next.invalidateVersion)} invalidateDomains=${said}`,
    `written to ${sideFilePath}, and the addon collects again when the game next reloads`,
  ])
}

export async function writtenBy(named: Named, writing: Writing = written): Promise<Answer> {
  return await answering((done) => naming(done, writing(done, named)))
}

export async function temperCatalogInvalidate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const stray = strayIn(taken.domain)
  if (stray !== null) return refused(stray, INPUT)

  return await writtenBy({
    domain: taken.domain,
    all: taken.all,
    json: taken.json,
    sideFile: taken.sideFile,
  })
}
