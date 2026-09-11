export type Given = Readonly<Record<string, string | readonly string[]>>

export type Value = string | number | boolean | readonly string[]

export interface Said {
  readonly body: unknown
  readonly status: number
}

export function said(body: unknown, status: number): Said {
  return { body, status }
}

export function givenIn(params: URLSearchParams): Given {
  const given: Record<string, string | readonly string[]> = {}
  for (const name of new Set(params.keys())) {
    const all = params.getAll(name)
    given[name] = all.length === 1 ? (all[0] as string) : all
  }
  return given
}

export function isValue(one: unknown): one is Value {
  if (typeof one === "string" || typeof one === "number" || typeof one === "boolean") return true
  return Array.isArray(one) && one.every((each) => typeof each === "string")
}
