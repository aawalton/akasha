export const SCHEMES = ["dark", "light", "system"] as const

export type Scheme = (typeof SCHEMES)[number]

const UNCHOSEN: Scheme = "dark"

export function isScheme(value: unknown): value is Scheme {
  return typeof value === "string" && SCHEMES.some((one) => one === value)
}

export function schemeIn(value: unknown): Scheme {
  return isScheme(value) ? value : UNCHOSEN
}
