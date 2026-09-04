import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"

const NONE = "none"

const PAGE_TYPE = "seat-conditions"

const KEYS = [
  "model",
  "subagentModel",
  "fallbackModel",
  "autoCompactWindow",
  "effortLevel",
  "subagentSpawnDepth",
  "toolTimeout",
  "resumeThresholdMinutes",
  "resumeTokenThreshold",
  "extendedContextAvailable",
] as const

type Held = Readonly<Record<string, unknown>>

export interface SeatConditions {
  readonly model: string | null
  readonly subagentModel: string | null
  readonly fallbackModel: string | null
  readonly autoCompactWindow: string | null
  readonly effortLevel: string | null
  readonly subagentSpawnDepth: string | null
  readonly toolTimeout: string | null
  readonly resumeThresholdMinutes: string | null
  readonly resumeTokenThreshold: string | null
  readonly extendedContextAvailable: boolean
}

function stated(values: Held, key: string): string | null {
  const held = values[key]
  if (typeof held === "number") return String(held)
  if (typeof held !== "string") return null
  const text = held.trim()
  if (text === "" || text === NONE) return null
  return text
}

function flagged(values: Held, key: string): boolean {
  const held = values[key]
  return held === true || held === "true"
}

function checkoutRoot(): string {
  const roots = resolveRoots() as unknown as Readonly<Record<string, string>>
  const root = roots[AKASHA]
  if (root === undefined || root === "") {
    throw new Error("no akasha checkout stands here, so nothing states what a seat runs under")
  }
  return root
}

export function readSeatConditions(): SeatConditions {
  const asked = asking(checkoutRoot(), { pageTypeSlug: PAGE_TYPE, keys: [...KEYS] } as never) as {
    readonly refused?: string
    readonly rows?: readonly Held[]
  }
  if (asked.refused !== undefined) {
    throw new Error(`\`${PAGE_TYPE}\` could not be read — ${asked.refused}`)
  }
  const rows = asked.rows ?? []
  const [row, second] = rows
  if (row === undefined) {
    throw new Error(`no \`${PAGE_TYPE}\` page stands, so nothing states what a seat runs under`)
  }
  if (second !== undefined) {
    throw new Error(
      `${rows.length} \`${PAGE_TYPE}\` pages stand where one carries them, so none of them holds`
    )
  }
  return {
    model: stated(row, "model"),
    subagentModel: stated(row, "subagentModel"),
    fallbackModel: stated(row, "fallbackModel"),
    autoCompactWindow: stated(row, "autoCompactWindow"),
    effortLevel: stated(row, "effortLevel"),
    subagentSpawnDepth: stated(row, "subagentSpawnDepth"),
    toolTimeout: stated(row, "toolTimeout"),
    resumeThresholdMinutes: stated(row, "resumeThresholdMinutes"),
    resumeTokenThreshold: stated(row, "resumeTokenThreshold"),
    extendedContextAvailable: flagged(row, "extendedContextAvailable"),
  }
}
