import { readFileSync } from "node:fs"
import { saidBy as messageOf } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { errorsPath as errorsPathArgument } from "akasha/command/argument/pages/errors-path.argument.ts"
import { includeStale as includeStaleArgument } from "akasha/command/argument/pages/include-stale.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { staleAfterHours as staleAfterHoursArgument } from "akasha/command/argument/pages/stale-after-hours.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperErrorList as page } from "akasha/command/pages/temper/error-list/temper-error-list.command.ts"
import type { ErrorEntry } from "akasha/temper/capture/error/modules/errors-payload/errors-payload.module.code.ts"
import {
  collectEntries,
  SAVED_VARIABLES_NAME,
} from "akasha/temper/capture/errors-triage/modules/errors-collect/errors-collect.module.code.ts"
import {
  classifyLiveness,
  DEFAULT_STALE_AFTER_HOURS,
} from "akasha/temper/capture/errors-triage/modules/errors-liveness/errors-liveness.module.code.ts"
import { rootSchema } from "akasha/temper/capture/errors-triage/modules/errors-saved-variables/errors-saved-variables.module.code.ts"
import type { InferredCulprit } from "akasha/temper/capture/errors-triage/modules/errors-triage/errors-triage.module.code.ts"
import {
  gatherTriage,
  readDeployedBuildId,
} from "akasha/temper/capture/errors-triage/modules/errors-triage-gather/errors-triage-gather.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const NAMED = [json, errorsPathArgument, includeStaleArgument, staleAfterHoursArgument]

const CAPTURE_FILE = "Temper.lua"

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

async function classified(
  entries: readonly ErrorEntry[],
  staleAfterMs: number
): Promise<readonly Classified[]> {
  const frontierMs = Math.max(...entries.map((one) => one.lastSeenAt * TO_MS))
  const builds = new Map<string, string | null>()

  const all: Classified[] = []
  for (const entry of entries) {
    const { verdict, reason } = classifyLiveness({
      lastSeenAtMs: entry.lastSeenAt * TO_MS,
      frontierMs,
      staleAfterMs,
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

export async function temperErrorList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const staleAfterHours = taken.staleAfterHours ?? DEFAULT_STALE_AFTER_HOURS
  const errorsPath = taken.errorsPath ?? savedVarsFile(CAPTURE_FILE)
  const includeStale = taken.includeStale

  let content: string
  try {
    content = readFileSync(errorsPath, "utf8")
  } catch (thrown) {
    return refused(
      `no capture is at ${errorsPath}, so there is no error to read: ${messageOf(thrown)}`,
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

  const all = await classified(entries, staleAfterHours * HOUR_MS)
  const shown = includeStale ? all : all.filter((one) => one.verdict === "live")
  const held = all.length - shown.length
  const heldLine =
    held > 0 && !includeStale
      ? [`${String(held)} stale entry left out, and ${includeStaleArgument.said} shows them`]
      : []

  if (taken.json) {
    const out = shown.map((one) => ({
      ...one.entry,
      liveness: one.verdict,
      livenessReason: one.reason,
      triage: one.triage,
      triageReason: one.triageReason,
      ...(one.inferred === undefined ? {} : { inferredCulprit: one.inferred }),
    }))
    return told([JSON.stringify(out), ...heldLine])
  }

  if (shown.length === 0) {
    return told([
      `every one of the ${String(all.length)} captured errors is stale, so none is still firing`,
      ...heldLine,
    ])
  }

  return told([HEADING, ...shown.map(rowOf), ...heldLine])
}
