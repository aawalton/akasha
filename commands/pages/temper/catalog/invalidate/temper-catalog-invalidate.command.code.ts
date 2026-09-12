import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import {
  INPUT,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { CATALOG_DOMAIN_KEYS } from "akasha/temper/catalog-core/domain-keys/domain-keys.module.code.ts"
import { resolveSideFilePath } from "akasha/temper/catalog-side-file/catalog-file-paths/catalog-file-paths.module.code.ts"
import {
  computeNextSideFile,
  parseSideFile,
  serializeSideFile,
} from "akasha/temper/catalog-side-file/catalog-side-file/catalog-side-file.module.code.ts"
import { valuesOf } from "akasha/temper/commands/argument-word-reading/argument-word-reading.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const DOMAIN_FLAG = "--domain"

const ALL_FLAG = "--all"

const SIDE_FILE_FLAG = "--side-file"

const JSON_FLAG = "--json"

const SPACES = 2

function saidWrongIn(argv: readonly string[], asked: readonly string[]): string | null {
  const all = argv.includes(ALL_FLAG)
  if (all && asked.length > 0) {
    return `${ALL_FLAG} asks for every domain, so it takes no ${DOMAIN_FLAG}, and ${asked.join(", ")} names ${String(asked.length)}`
  }
  if (!all && asked.length === 0) {
    return `name a domain with ${DOMAIN_FLAG}, or say ${ALL_FLAG} to ask for every one of them`
  }
  const known = new Set<string>(CATALOG_DOMAIN_KEYS)
  const stray = asked.filter((one) => !known.has(one))
  if (stray.length > 0) {
    return `${stray.join(", ")} is no domain the catalog addon registers, and the registry holds ${String(CATALOG_DOMAIN_KEYS.length)} of them`
  }
  return null
}

export function temperCatalogInvalidate(argv: readonly string[] = []): Answer {
  const asked = valuesOf(argv, DOMAIN_FLAG)
  const wrong = saidWrongIn(argv, asked)
  if (wrong !== null) return refused(wrong, INPUT)

  const sideFilePath = resolveSideFilePath(valuesOf(argv, SIDE_FILE_FLAG)[0])

  let next: ReturnType<typeof computeNextSideFile>
  try {
    const prior = existsSync(sideFilePath)
      ? parseSideFile(readFileSync(sideFilePath, "utf-8"))
      : undefined
    next = computeNextSideFile(prior, argv.includes(ALL_FLAG) ? [] : asked)
    mkdirSync(dirname(sideFilePath), { recursive: true })
    writeFileSync(sideFilePath, serializeSideFile(next), "utf-8")
  } catch (thrown) {
    return refused(
      `the request at ${sideFilePath} was not written, so the addon collects nothing again: ${messageOf(thrown)}`,
      OPERATIONAL
    )
  }

  if (argv.includes(JSON_FLAG)) {
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
