export interface FilterField<T> {
  urlParam?: string
  defaultValue: T
  initial?: string
  validate: (raw: unknown) => T | undefined
  toParam?: (value: T) => string | null
}

type Fields<V> = { [K in keyof V]-?: FilterField<V[K]> }

function isKeyOf<V extends Record<string, unknown>>(
  fields: Fields<V>,
  key: string
): key is keyof V & string {
  return key in fields
}

function isCompleteRecord<V extends Record<string, unknown>>(
  record: Partial<V>,
  keys: readonly (keyof V)[]
): record is V {
  return keys.every((k) => k in record)
}

export function buildValuesFromFields<V extends Record<string, unknown>>(
  fields: Fields<V>,
  getRaw: (key: keyof V & string) => unknown
): V {
  const values: Partial<V> = {}
  const keys: (keyof V & string)[] = []
  for (const key in fields) {
    if (!isKeyOf(fields, key)) continue
    keys.push(key)
    const field = fields[key]
    const raw = getRaw(key)
    const validated = raw !== undefined ? field.validate(raw) : undefined
    values[key] = validated !== undefined ? validated : field.defaultValue
  }
  if (!isCompleteRecord<V>(values, keys)) {
    throw new Error("buildValuesFromFields: missing field after init")
  }
  return values
}
