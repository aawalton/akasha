export function bare(held: unknown): boolean {
  if (held === undefined || held === null || held === "") return true
  return Array.isArray(held) && held.length === 0
}

function ordered(held: unknown, bound: unknown): number {
  if (typeof held === "number" && typeof bound === "number") return held - bound
  const one = String(held ?? "")
  const two = String(bound ?? "")
  const first = Date.parse(one)
  const second = Date.parse(two)
  if (Number.isFinite(first) && Number.isFinite(second)) return first - second
  return one < two ? -1 : one > two ? 1 : 0
}

function containing(held: unknown, bound: unknown): boolean {
  const each = Array.isArray(bound) ? bound : [bound]
  if (Array.isArray(held)) return each.some((one) => held.includes(one))
  if (typeof held !== "string") return false
  return each.some((one) => held.includes(String(one)))
}

export function matches(held: unknown, name: string, bound: unknown): boolean {
  if (name === "empty") return bare(held) === bound
  if (name === "is") return held === bound
  if (name === "in") return Array.isArray(bound) && bound.includes(held as never)
  if (name === "not-in") return Array.isArray(bound) && !bound.includes(held as never)
  if (name === "has") return Array.isArray(held) && held.includes(bound)
  if (name === "contains") return containing(held, bound)
  if (name === "starts-with") return typeof held === "string" && held.startsWith(String(bound))
  if (name === "ends-with") return typeof held === "string" && held.endsWith(String(bound))
  if (name === "at-or-after") return !bare(held) && ordered(held, bound) >= 0
  if (name === "after") return !bare(held) && ordered(held, bound) > 0
  if (name === "before") return !bare(held) && ordered(held, bound) < 0
  if (name === "at-or-before") return !bare(held) && ordered(held, bound) <= 0
  return false
}

export function weigh(one: unknown, two: unknown): number {
  if (typeof one === "number" && typeof two === "number") return one - two
  return String(one ?? "").localeCompare(String(two ?? ""))
}
