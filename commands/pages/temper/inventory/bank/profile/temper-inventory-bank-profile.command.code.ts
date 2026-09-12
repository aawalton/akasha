import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { inventoryPath } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  asJson,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { temperInventoryBankProfile as page } from "akasha/commands/pages/temper/inventory/bank/profile/temper-inventory-bank-profile.command.ts"
import { readBankProfile } from "akasha/temper/commands/bank-profile-reading/bank-profile-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"

const INVENTORY_LUA = "TemperInventory.lua"

const NAMED = [json, inventoryPath]

const WIDE_MS = 9

const WIDE_CALLS = 6

const WIDE_SOURCE_CALLS = 8

type ProfileEntry = {
  readonly kind: "closure" | "cfunction"
  readonly name: string
  readonly source: string
  readonly line: number
  readonly callCount: number
  readonly inclusiveMs: number
  readonly selfMs: number
}

type SourceBucket = {
  readonly source: string
  readonly selfMs: number
  readonly inclusiveMs: number
  readonly callCount: number
}

type BankProfile = {
  readonly timestamp: number
  readonly bankingBag: number
  readonly profilerAvailable: boolean
  readonly frameCount: number
  readonly recordCount: number
  readonly truncated: boolean
  readonly totalLuaMs: number
  readonly totalSelfMs: number
  readonly gcMs: number
  readonly bySource: readonly SourceBucket[]
  readonly topByInclusive: readonly ProfileEntry[]
  readonly topBySelf: readonly ProfileEntry[]
}

function padRight(value: string, width: number): string {
  return value.length >= width ? value : value + " ".repeat(width - value.length)
}

function entrySaid(one: ProfileEntry): string {
  const where = one.kind === "cfunction" ? "[C]" : `${one.source}:${one.line}`
  return (
    `  ${padRight(`${one.inclusiveMs}ms`, WIDE_MS)} self ${padRight(`${one.selfMs}ms`, WIDE_MS)} ` +
    `×${padRight(`${one.callCount}`, WIDE_CALLS)} ${one.name}  ${where}`
  )
}

function profileSaid(profile: BankProfile): readonly string[] {
  const head =
    `[bank profile @ ${profile.timestamp}] bag=${profile.bankingBag} ` +
    `frames=${profile.frameCount} records=${profile.recordCount}` +
    (profile.truncated ? " (TRUNCATED at record cap)" : "")
  if (!profile.profilerAvailable) {
    return [
      head,
      "profiler UNAVAILABLE — StartScriptProfiler did not arm in this client " +
        "(API present but disabled). No records captured; cannot decide the " +
        "engine-C++-vs-Lua question. Escalate.",
    ]
  }
  return [
    head,
    `totals: Lua ${profile.totalLuaMs}ms (self-sum ${profile.totalSelfMs}ms), GC ${profile.gcMs}ms`,
    "by source (self ms desc):",
    ...profile.bySource.map(
      (one) =>
        `  ${padRight(`${one.selfMs}ms`, WIDE_MS)} incl ` +
        `${padRight(`${one.inclusiveMs}ms`, WIDE_MS)} ` +
        `×${padRight(`${one.callCount}`, WIDE_SOURCE_CALLS)} ${one.source}`
    ),
    `top ${profile.topByInclusive.length} by inclusive ms:`,
    ...profile.topByInclusive.map(entrySaid),
    `top ${profile.topBySelf.length} by self ms:`,
    ...profile.topBySelf.map(entrySaid),
  ]
}

export async function temperInventoryBankProfile(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  const at =
    taken.inventoryPath === undefined
      ? savedVarsFile(INVENTORY_LUA)
      : resolve(given.root, taken.inventoryPath)
  try {
    const profile = (await readBankProfile(at)) as BankProfile
    if (taken.json) return asJson(profile)
    return told([...profileSaid(profile)])
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
