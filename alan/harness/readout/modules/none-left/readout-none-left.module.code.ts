type NoneLeft = {
  readonly words?: string
  readonly emoji?: string
}

export function stated(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length === 0 ? undefined : trimmed
}

export function noneLeftIn(values: Readonly<Record<string, unknown>>): NoneLeft {
  const words = stated(values.noneLeftWords)
  const emoji = stated(values.noneLeftEmoji)
  return {
    ...(words === undefined ? {} : { words }),
    ...(emoji === undefined ? {} : { emoji }),
  }
}
