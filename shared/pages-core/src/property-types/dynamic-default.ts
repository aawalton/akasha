import type { PropertyType } from "../types"

export const DYNAMIC_DEFAULT_SENTINELS = {
  now: "instant",
  today: "calendar-date",
} as const satisfies Readonly<Record<string, PropertyType>>

export type DynamicDefaultSentinel = keyof typeof DYNAMIC_DEFAULT_SENTINELS

const DYNAMIC_KEY = "$dynamic"

export function isDynamicDefault(value: unknown): value is { readonly $dynamic: unknown } {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, DYNAMIC_KEY)
  )
}

function isSentinelName(name: string): name is DynamicDefaultSentinel {
  return Object.hasOwn(DYNAMIC_DEFAULT_SENTINELS, name)
}

export function validateDynamicDefault(
  defaultValue: unknown,
  type: string | undefined
): string | null {
  if (!isDynamicDefault(defaultValue)) return null

  const keys = Object.keys(defaultValue)
  if (keys.length !== 1) {
    return `dynamic default must be exactly { "${DYNAMIC_KEY}": <name> }; found extra keys: ${keys
      .filter((k) => k !== DYNAMIC_KEY)
      .join(", ")}`
  }

  const name = defaultValue[DYNAMIC_KEY]
  if (typeof name !== "string") {
    return `dynamic default "${DYNAMIC_KEY}" must be a string sentinel name`
  }

  if (!isSentinelName(name)) {
    const known = Object.keys(DYNAMIC_DEFAULT_SENTINELS).join(", ")
    return `unknown dynamic default sentinel "${name}" (known sentinels: ${known})`
  }

  const requiredType = DYNAMIC_DEFAULT_SENTINELS[name]
  if (type !== undefined && type !== requiredType) {
    return `dynamic default "${name}" is only valid on a "${requiredType}" property, not "${type}"`
  }

  return null
}
