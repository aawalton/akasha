import { existsSync, readFileSync } from "node:fs"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { CATALOG_DOMAIN_KEYS } from "@akasha/temper-catalog-core/domain-keys"
import {
  type AccountSummary,
  readAccountSummaries,
} from "@akasha/temper-catalog-host/saved-variables-reader"
import {
  resolveSavedVariablesPath,
  resolveSideFilePath,
} from "@akasha/temper-catalog-side-file/catalog-file-paths"
import { parseSideFile, type SideFile } from "@akasha/temper-catalog-side-file/catalog-side-file"

const DATA = 2

const SAVED_VARIABLES_FLAG = "--saved-variables-file"

const SIDE_FILE_FLAG = "--side-file"

const JSON_FLAG = "--json"

const SPACES = 2

const HEADING = "account\tdomain\tcollected\tpendingInvalidation\tskipReason"

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

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
      ? "the request file stands at nothing, so no collection is owed"
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

export function temperCatalogStatus(argv: readonly string[] = []): Answer {
  const capturePath = resolveSavedVariablesPath(valuesOf(argv, SAVED_VARIABLES_FLAG)[0])
  const sideFilePath = resolveSideFilePath(valuesOf(argv, SIDE_FILE_FLAG)[0])

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

  if (argv.includes(JSON_FLAG)) {
    return { report: jsonOf(summaries, sideFile), refusals: [], code: 0 }
  }

  if (summaries.length === 0) {
    return {
      report: [
        `${capturePath} names no account, so nothing here has collected a domain`,
        ...summaryLines(summaries, sideFile),
      ],
      refusals: [],
      code: 0,
    }
  }

  return {
    report: [HEADING, ...rowsFor(summaries, sideFile), "", ...summaryLines(summaries, sideFile)],
    refusals: [],
    code: 0,
  }
}
