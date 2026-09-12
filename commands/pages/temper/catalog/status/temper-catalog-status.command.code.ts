import { existsSync, readFileSync } from "node:fs"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { savedVariablesFile } from "akasha/commands/arguments/pages/saved-variables-file.argument.ts"
import { sideFile as sideFileArgument } from "akasha/commands/arguments/pages/side-file.argument.ts"
import { DATA, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperCatalogStatus as page } from "akasha/commands/pages/temper/catalog/status/temper-catalog-status.command.ts"
import { CATALOG_DOMAIN_KEYS } from "akasha/temper/catalog-core/domain-keys/domain-keys.module.code.ts"
import {
  type AccountSummary,
  readAccountSummaries,
} from "akasha/temper/catalog-host/saved-variables-reader/saved-variables-reader.module.code.ts"
import {
  resolveSavedVariablesPath,
  resolveSideFilePath,
} from "akasha/temper/catalog-side-file/catalog-file-paths/catalog-file-paths.module.code.ts"
import {
  parseSideFile,
  type SideFile,
} from "akasha/temper/catalog-side-file/catalog-side-file/catalog-side-file.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const NAMED = [json, sideFileArgument, savedVariablesFile]

const SPACES = 2

const HEADING = "account\tdomain\tcollected\tpendingInvalidation\tskipReason"

function owedIn(summary: AccountSummary, sideFile: SideFile | undefined): ReadonlySet<string> {
  if (sideFile === undefined) return new Set()
  if (sideFile.invalidateVersion <= summary.lastSeenInvalidateVersion) return new Set()
  if (sideFile.invalidateDomains.length === 0) return new Set(CATALOG_DOMAIN_KEYS)
  return new Set(sideFile.invalidateDomains)
}

function skipReasonOf(
  summary: AccountSummary,
  domain: string,
  collected: boolean
): string | undefined {
  return collected ? undefined : summary.collectionSkips[domain]
}

function rowsFor(
  summaries: readonly AccountSummary[],
  sideFile: SideFile | undefined
): readonly string[] {
  return summaries.flatMap((summary) => {
    const present = new Set(summary.presentDomainKeys)
    const owed = owedIn(summary, sideFile)
    return CATALOG_DOMAIN_KEYS.map((domain) => {
      const collected = present.has(domain)
      return [
        summary.account,
        domain,
        collected ? "yes" : "no",
        owed.has(domain) ? "yes" : "no",
        skipReasonOf(summary, domain, collected) ?? "",
      ].join("\t")
    })
  })
}

function summaryLines(
  summaries: readonly AccountSummary[],
  sideFile: SideFile | undefined
): readonly string[] {
  const said = summaries.map(
    (summary) =>
      `${summary.account}: completed=${String(summary.completed)}, apiVersion=${summary.apiVersion ?? "<unset>"}, lastSeenInvalidateVersion=${String(summary.lastSeenInvalidateVersion)}`
  )
  return [
    ...said,
    sideFile === undefined
      ? "the request file is not there, so no collection is owed"
      : `the request is version ${String(sideFile.invalidateVersion)} over ${JSON.stringify(sideFile.invalidateDomains)}`,
  ]
}

function jsonOf(
  summaries: readonly AccountSummary[],
  sideFile: SideFile | undefined
): readonly string[] {
  const accounts = summaries.map((summary) => {
    const owed = owedIn(summary, sideFile)
    return {
      account: summary.account,
      completed: summary.completed,
      apiVersion: summary.apiVersion,
      manifestApiVersion: summary.manifestApiVersion,
      lastSeenInvalidateVersion: summary.lastSeenInvalidateVersion,
      domains: CATALOG_DOMAIN_KEYS.map((domain) => {
        const collected = summary.presentDomainKeys.includes(domain)
        return {
          domain,
          collected,
          pendingInvalidation: owed.has(domain),
          skipReason: skipReasonOf(summary, domain, collected) ?? null,
        }
      }),
    }
  })
  return JSON.stringify({ accounts, sideFile: sideFile ?? null }, null, SPACES).split("\n")
}

export function temperCatalogStatus(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const capturePath = resolveSavedVariablesPath(taken.savedVariablesFile)
  const sideFilePath = resolveSideFilePath(taken.sideFile)

  let summaries: readonly AccountSummary[]
  let sideFile: SideFile | undefined
  try {
    summaries = existsSync(capturePath)
      ? readAccountSummaries(readFileSync(capturePath, "utf-8"))
      : []
    sideFile = existsSync(sideFilePath)
      ? parseSideFile(readFileSync(sideFilePath, "utf-8"))
      : undefined
  } catch (thrown) {
    return refused(`${capturePath} holds no capture this reads: ${messageOf(thrown)}`, DATA)
  }

  if (taken.json) {
    return { report: jsonOf(summaries, sideFile), refusals: [], code: OK }
  }

  if (summaries.length === 0) {
    return {
      report: [
        `${capturePath} names no account, so nothing here has collected a domain`,
        ...summaryLines(summaries, sideFile),
      ],
      refusals: [],
      code: OK,
    }
  }

  return {
    report: [HEADING, ...rowsFor(summaries, sideFile), "", ...summaryLines(summaries, sideFile)],
    refusals: [],
    code: OK,
  }
}
