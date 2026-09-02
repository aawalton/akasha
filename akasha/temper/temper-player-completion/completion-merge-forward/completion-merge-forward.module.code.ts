import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@akasha/temper-completion/completion-progress"
import { isRecord } from "@akasha/utils-narrow/is-record"

const NESTED_LWW_KEYS: ReadonlySet<string> = new Set(["currentMorph", "unassigned"])

function isNumberArray(value: readonly unknown[]): value is readonly number[] {
  return value.every((entry) => typeof entry === "number")
}

function unionNumberArrays(
  existing: readonly number[],
  incoming: readonly number[]
): readonly number[] {
  const seen = new Set<number>(existing)
  for (const entry of incoming) seen.add(entry)
  return [...seen].sort((a, b) => a - b)
}

function indexMergeArrays(
  existing: readonly unknown[],
  incoming: readonly unknown[]
): readonly unknown[] {
  const length = Math.max(existing.length, incoming.length)
  const merged: unknown[] = []
  for (let i = 0; i < length; i++) {
    merged.push(deepForward(existing[i], incoming[i]))
  }
  return merged
}

export function deepForward(existing: unknown, incoming: unknown): unknown {
  if (incoming === undefined) return existing
  if (existing === undefined) return incoming

  if (typeof existing === "number" && typeof incoming === "number") {
    return existing >= incoming ? existing : incoming
  }
  if (typeof existing === "boolean" && typeof incoming === "boolean") {
    return existing || incoming
  }
  if (Array.isArray(existing) && Array.isArray(incoming)) {
    if (isNumberArray(existing) && isNumberArray(incoming)) {
      return unionNumberArrays(existing, incoming)
    }
    return indexMergeArrays(existing, incoming)
  }
  if (isRecord(existing) && isRecord(incoming)) {
    return mergeRecordForward(existing, incoming)
  }
  return incoming
}

function mergeRecordForward(
  existing: Record<string, unknown>,
  incoming: Record<string, unknown>
): Record<string, unknown> {
  const merged: Record<string, unknown> = {}
  const keys = new Set<string>([...Object.keys(existing), ...Object.keys(incoming)])
  for (const key of keys) {
    if (NESTED_LWW_KEYS.has(key)) {
      merged[key] = incoming[key] === undefined ? existing[key] : incoming[key]
      continue
    }
    merged[key] = deepForward(existing[key], incoming[key])
  }
  return merged
}

function asT<T>(value: Record<string, unknown>): T {
  return value as T
}

function mergeTypedCompletion<T>(
  existing: T | undefined,
  incoming: T | undefined,
  lwwKeys: ReadonlySet<string>
): T | undefined {
  if (existing === undefined) return incoming
  if (incoming === undefined) return existing
  if (!isRecord(existing) || !isRecord(incoming)) return incoming

  const merged: Record<string, unknown> = {}
  const keys = new Set<string>([...Object.keys(existing), ...Object.keys(incoming)])
  for (const key of keys) {
    if (lwwKeys.has(key)) {
      merged[key] = incoming[key] === undefined ? existing[key] : incoming[key]
      continue
    }
    merged[key] = deepForward(existing[key], incoming[key])
  }
  return asT<T>(merged)
}

const CHARACTER_LWW_KEYS: ReadonlySet<string> = new Set([
  "buildHash",
  "gender",
  "classId",
  "allianceId",
  "raceId",
  "curseState",
  "className",
  "classIcon",
  "dailyWrits",
])

const COMPANION_LWW_KEYS: ReadonlySet<string> = new Set([
  "build",
  "selectedBuild",
  "targetBuildHash",
  "currentXP",
])

const ACCOUNT_LWW_KEYS: ReadonlySet<string> = new Set<string>()

export function mergeCharacterCompletionForward(
  existing: CharacterCompletion | undefined,
  incoming: CharacterCompletion | undefined
): CharacterCompletion | undefined {
  return mergeTypedCompletion(existing, incoming, CHARACTER_LWW_KEYS)
}

export function mergeAccountCompletionForward(
  existing: AccountCompletion | undefined,
  incoming: AccountCompletion | undefined
): AccountCompletion | undefined {
  return mergeTypedCompletion(existing, incoming, ACCOUNT_LWW_KEYS)
}

export function mergeCompanionCompletionForward(
  existing: CompanionCompletion | undefined,
  incoming: CompanionCompletion | undefined
): CompanionCompletion | undefined {
  return mergeTypedCompletion(existing, incoming, COMPANION_LWW_KEYS)
}
