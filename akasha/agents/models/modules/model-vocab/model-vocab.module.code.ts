export const LOGICAL_MODELS = ["fable", "opus", "sonnet", "haiku"] as const
export type LogicalModel = (typeof LOGICAL_MODELS)[number]

export const EXTENDED_SUFFIX = "[1m]"

export type ModelSpec = {
  readonly logical: LogicalModel
  readonly extended: boolean
}

const WIRE_BY_LOGICAL = {
  fable: "claude-fable-5",
  opus: "claude-opus-5",
  sonnet: "claude-sonnet-5",
  haiku: "claude-haiku-4-5",
} as const satisfies Record<LogicalModel, string>

const EXTENDED_CAPABLE_BY_LOGICAL = {
  fable: true,
  opus: true,
  sonnet: true,
  haiku: false,
} as const satisfies Record<LogicalModel, boolean>

const RETIRED_WIRES: ReadonlyArray<readonly [string, LogicalModel]> = [["claude-opus-4-8", "opus"]]

const LOGICAL_BY_WIRE: ReadonlyMap<string, LogicalModel> = new Map([
  ...RETIRED_WIRES,
  ...LOGICAL_MODELS.map((m) => [WIRE_BY_LOGICAL[m], m] as const),
])

function isLogicalModel(v: string): v is LogicalModel {
  return LOGICAL_MODELS.some((m) => m === v)
}

function splitExtended(raw: string): readonly [string, boolean] {
  if (raw.endsWith(EXTENDED_SUFFIX)) {
    return [raw.slice(0, raw.length - EXTENDED_SUFFIX.length), true] as const
  }
  return [raw, false] as const
}

export function parseModel(raw: string): ModelSpec | null {
  const [base, extended] = splitExtended(raw.trim())
  if (base === "") return null
  if (isLogicalModel(base)) return { logical: base, extended }
  const fromWire = LOGICAL_BY_WIRE.get(base)
  if (fromWire !== undefined) return { logical: fromWire, extended }
  return null
}

export function toDisplay(spec: ModelSpec): string {
  return spec.extended ? `${spec.logical} ${EXTENDED_SUFFIX}` : spec.logical
}

export function toWireId(logical: LogicalModel): string {
  return WIRE_BY_LOGICAL[logical]
}

export function toCliAlias(spec: ModelSpec, opts: { readonly extendedAvailable: boolean }): string {
  const extended = opts.extendedAvailable && EXTENDED_CAPABLE_BY_LOGICAL[spec.logical]
  return `${spec.logical}${extended ? EXTENDED_SUFFIX : ""}`
}

export function isExtendedWire(wireId: string): boolean {
  return wireId.endsWith(EXTENDED_SUFFIX)
}

export function stripExtendedWire(wireId: string): string {
  return splitExtended(wireId)[0]
}
