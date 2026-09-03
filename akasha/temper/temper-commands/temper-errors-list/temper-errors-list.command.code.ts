import { readFileSync } from "node:fs"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import type { ErrorEntry } from "@akasha/temper-capture-errors/errors-payload"
import { collectEntries, SAVED_VARIABLES_NAME } from "@akasha/temper-errors-triage/errors-collect"
import {
  classifyLiveness,
  DEFAULT_STALE_AFTER_HOURS,
  extractOwningAddonCandidates,
  type Ownership,
} from "@akasha/temper-errors-triage/errors-liveness"
import { rootSchema } from "@akasha/temper-errors-triage/errors-saved-variables"
import type { InferredCulprit } from "@akasha/temper-errors-triage/errors-triage"
import {
  gatherTriage,
  readDeployedBuildId,
} from "@akasha/temper-errors-triage/errors-triage-gather"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { ran } from "@akasha/utils-run/running"

const SAID_WRONG = 1

const DATA = 2

const ERRORS_PATH_FLAG = "--errors-path"

const JSON_FLAG = "--json"

const INCLUDE_STALE_FLAG = "--include-stale"

const ALL_FLAG = "--all"

const STALE_AFTER_FLAG = "--stale-after-hours"

const CAPTURE_FILE = "TemperErrors.lua"

const MESSAGE_PREVIEW_MAX = 120

const CALLSTACK_PREVIEW_MAX = 200

const HOUR_MS = 60 * 60 * 1000

const TO_MS = 1000

const NO_CALLSTACK = "(no callstack)"

const HEADING =
  "liveness\tlastSeenAt\tcount\tcharacter\tworld\tapiVersion\tbuild\ttriage\tmessagePreview\tcallstack"

type Classified = {
  readonly entry: ErrorEntry
  readonly verdict: string
  readonly reason: unknown
  readonly triage: string
  readonly triageReason: unknown
  readonly inferred?: InferredCulprit
}

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

function previewOf(message: string): string {
  const first = message.split("\n", 1)[0] ?? ""
  return first.length <= MESSAGE_PREVIEW_MAX ? first : `${first.slice(0, MESSAGE_PREVIEW_MAX)}…`
}

function callstackOf(traceback: string | null | undefined): string {
  if (traceback === null || traceback === undefined || traceback.length === 0) return NO_CALLSTACK
  const flat = traceback
    .replace(/^stack traceback:\s*/, "")
    .split("\n")
    .map((one) => one.trim())
    .filter((one) => one.length > 0)
    .join(" <- ")
  return flat.length <= CALLSTACK_PREVIEW_MAX ? flat : `${flat.slice(0, CALLSTACK_PREVIEW_MAX)}…`
}

function rosterIn(root: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  try {
    for (const addon of listAllAddons({ repoRoot: root })) {
      if (!found.has(addon.canonicalName)) found.set(addon.canonicalName, addon.repoRelDir)
    }
  } catch {
    return found
  }
  return found
}

function fixedAt(root: string, relDir: string, cache: Map<string, number | null>): number | null {
  const held = cache.get(relDir)
  if (held !== undefined) return held
  let found: number | null = null
  try {
    const done = ran(["git", "log", "-1", "--format=%cI", "--", relDir], { cwd: root })
    const iso = done.out.trim()
    if (done.code === 0 && iso.length > 0) {
      const ms = Date.parse(iso)
      found = Number.isNaN(ms) ? null : ms
    }
  } catch {
    found = null
  }
  cache.set(relDir, found)
  return found
}

function ownershipOf(
  traceback: string | null | undefined,
  roster: ReadonlyMap<string, string>,
  root: string,
  cache: Map<string, number | null>
): Ownership {
  for (const candidate of extractOwningAddonCandidates(traceback)) {
    const relDir = roster.get(candidate)
    if (relDir !== undefined) {
      return { kind: "in-repo", repoRelDir: relDir, latestFixMs: fixedAt(root, relDir, cache) }
    }
  }
  return { kind: "external" }
}

async function classified(
  entries: readonly ErrorEntry[],
  staleAfterMs: number,
  root: string
): Promise<readonly Classified[]> {
  const frontierMs = Math.max(...entries.map((one) => one.lastSeenAt * TO_MS))
  const roster = rosterIn(root)
  const fixes = new Map<string, number | null>()
  const builds = new Map<string, string | null>()

  const all: Classified[] = []
  for (const entry of entries) {
    const ownership = ownershipOf(entry.traceback, roster, root, fixes)
    const { verdict, reason } = classifyLiveness({
      lastSeenAtMs: entry.lastSeenAt * TO_MS,
      frontierMs,
      staleAfterMs,
      ownership,
    })
    const {
      triage,
      reason: triageReason,
      inferred,
    } = await gatherTriage(entry, (folder) => readDeployedBuildId(folder, builds))
    all.push({ entry, verdict, reason, triage, triageReason, inferred })
  }
  return all
}

function buildCell(entry: ErrorEntry, inferred: InferredCulprit | undefined): string {
  if (entry.attributedAddon !== undefined) {
    return `${entry.attributedAddon}@${entry.attributedBuildId ?? "?"}`
  }
  if (inferred !== undefined) return `~${inferred.addon}@${inferred.loadedBuildId ?? "?"}`
  return "-"
}

function rowOf(one: Classified): string {
  const { entry } = one
  return [
    one.verdict,
    new Date(entry.lastSeenAt * TO_MS).toISOString(),
    String(entry.count),
    entry.character,
    entry.world,
    String(entry.apiVersion),
    buildCell(entry, one.inferred),
    one.triage,
    previewOf(entry.message),
    callstackOf(entry.traceback),
  ].join("\t")
}

function staleAfterIn(argv: readonly string[]): number | string {
  const said = valuesOf(argv, STALE_AFTER_FLAG)[0]
  if (said === undefined) return DEFAULT_STALE_AFTER_HOURS
  const hours = Number(said)
  if (!Number.isInteger(hours) || hours < 0) {
    return `${STALE_AFTER_FLAG} takes a whole number of hours, and \`${said}\` is none`
  }
  return hours
}

export async function temperErrorsList(argv: readonly string[] = []): Promise<Answer> {
  const staleAfterHours = staleAfterIn(argv)
  if (typeof staleAfterHours === "string") return refused(staleAfterHours, SAID_WRONG)

  const errorsPath = valuesOf(argv, ERRORS_PATH_FLAG)[0] ?? savedVarsFile(CAPTURE_FILE)
  const includeStale = argv.includes(INCLUDE_STALE_FLAG) || argv.includes(ALL_FLAG)

  let content: string
  try {
    content = readFileSync(errorsPath, "utf8")
  } catch (thrown) {
    return refused(
      `no capture stands at ${errorsPath}, so there is no error to read: ${messageOf(thrown)}`,
      DATA
    )
  }

  let entries: readonly ErrorEntry[]
  try {
    const raw = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_NAME)
    entries = collectEntries(rootSchema.parse(raw))
  } catch (thrown) {
    return refused(`${errorsPath} holds no capture this reads: ${messageOf(thrown)}`, DATA)
  }

  if (entries.length === 0) {
    return refused(
      `${errorsPath} holds no captured error, so nothing here is a clean run rather than an unread one`,
      DATA
    )
  }

  const all = await classified(entries, staleAfterHours * HOUR_MS, codeRoot())
  const shown = includeStale ? all : all.filter((one) => one.verdict === "live")
  const held = all.length - shown.length
  const heldLine =
    held > 0 && !includeStale
      ? [`${String(held)} stale entry left out, and ${INCLUDE_STALE_FLAG} shows them`]
      : []

  if (argv.includes(JSON_FLAG)) {
    const out = shown.map((one) => ({
      ...one.entry,
      liveness: one.verdict,
      livenessReason: one.reason,
      triage: one.triage,
      triageReason: one.triageReason,
      ...(one.inferred === undefined ? {} : { inferredCulprit: one.inferred }),
    }))
    return { report: [JSON.stringify(out), ...heldLine], refusals: [], code: 0 }
  }

  if (shown.length === 0) {
    return {
      report: [
        `every one of the ${String(all.length)} captured errors is stale, so none is still firing`,
        ...heldLine,
      ],
      refusals: [],
      code: 0,
    }
  }

  return { report: [HEADING, ...shown.map(rowOf), ...heldLine], refusals: [], code: 0 }
}
