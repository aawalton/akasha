import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-08"
import type { ErrorEntry, ErrorsPayload } from "@akasha/temper-capture-errors/errors-payload"
import type { CaptureWriter } from "@akasha/temper-capture-writer/capture-writer"
import {
  attributedAddonFolder,
  attributedBuildId,
  snapshotBuildIds,
} from "../errors-addon-build-ids/errors-addon-build-ids.module.code.ts"
import { MAX_ENTRIES } from "../errors-addon-limits/errors-addon-limits.module.code.ts"
import { classifyError } from "../errors-addon-traceback/errors-addon-traceback.module.code.ts"

type SavedVariablesAccessor = CaptureWriter<ErrorsPayload>["getSavedVariables"]

let savedVariablesAccessor: SavedVariablesAccessor | undefined

export function setSavedVariablesAccessor(accessor: SavedVariablesAccessor): undefined {
  savedVariablesAccessor = accessor
}

function savedVariables(): ErrorsPayload {
  if (savedVariablesAccessor === undefined) {
    throw new Error("TemperErrors saved-variables accessor not set — init has not run.")
  }
  return savedVariablesAccessor()
}

function ensureEntries(payload: ErrorsPayload): ErrorEntry[] {
  const current = payload.entries
  if (current !== undefined) {
    return current
  }
  const created: ErrorEntry[] = []
  payload.entries = created
  return created
}

function dropOldest(entries: ErrorEntry[], now: number): undefined {
  let oldestIdx = 0
  let oldestAt = entries[0]?.lastSeenAt ?? now
  for (let i = 1; i < entries.length; i++) {
    const entry = entries[i]
    if (entry !== undefined && entry.lastSeenAt < oldestAt) {
      oldestAt = entry.lastSeenAt
      oldestIdx = i
    }
  }
  entries.splice(oldestIdx, 1)
}

export function captureError(
  this: void,
  eventCode: number,
  errorString: unknown,
  errorCode?: number
): undefined {
  const entries = ensureEntries(savedVariables())
  const { message, traceback } = classifyError(errorString, eventCode, errorCode)
  const now = GetTimeStamp()
  const attributed = attributedAddonFolder(traceback)
  const buildId = attributedBuildId(attributed)
  const buildIds = snapshotBuildIds()

  for (const existing of entries) {
    if (existing.traceback === traceback) {
      existing.count = existing.count + 1
      existing.lastSeenAt = now
      if (attributed !== undefined) {
        existing.attributedAddon = attributed
      }
      if (buildId !== undefined) {
        existing.attributedBuildId = buildId
      }
      if (buildIds !== undefined) {
        existing.buildIds = buildIds
      }
      return
    }
  }

  if (entries.length >= MAX_ENTRIES) {
    dropOldest(entries, now)
  }

  const entry: ErrorEntry = {
    traceback,
    message,
    count: 1,
    firstSeenAt: now,
    lastSeenAt: now,
    account: GetDisplayName(),
    character: GetUnitName("player"),
    world: GetWorldName(),
    esoVersion: GetESOVersionString(),
    apiVersion: GetAPIVersion(),
    eventCode,
  }
  if (errorCode !== undefined) {
    entry.errorCode = errorCode
  }
  if (attributed !== undefined) {
    entry.attributedAddon = attributed
  }
  if (buildId !== undefined) {
    entry.attributedBuildId = buildId
  }
  if (buildIds !== undefined) {
    entry.buildIds = buildIds
  }
  entries[entries.length] = entry
}
