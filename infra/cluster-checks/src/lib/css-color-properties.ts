const COLOR_BEARING_PROPERTIES = [
  "color",
  "background",
  "background-color",
  "background-image",
  "border",
  "border-top",
  "border-right",
  "border-bottom",
  "border-left",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "outline",
  "outline-color",
  "box-shadow",
  "text-shadow",
  "text-decoration-color",
  "column-rule",
  "column-rule-color",
  "caret-color",
  "accent-color",
  "fill",
  "stroke",
] as const

const SPELLINGS: readonly string[] = [
  ...COLOR_BEARING_PROPERTIES,
  ...COLOR_BEARING_PROPERTIES.map((p) =>
    p.replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase())
  ),
]

export const COLOR_BEARING_DECLARATION_RE = new RegExp(
  `(?:^|[;{,\\s"'\`])(?:${SPELLINGS.join("|")})\\s*:`,
  "i"
)

const SPELLING_SET: ReadonlySet<string> = new Set(SPELLINGS.map((p) => p.toLowerCase()))

export function isColorBearingProperty(name: string): boolean {
  return SPELLING_SET.has(name.toLowerCase())
}

export function propertyBefore(source: string, quoteAt: number): string | undefined {
  const isSpace = (i: number): boolean => /\s/.test(source.charAt(i))
  let i = quoteAt - 1
  while (i >= 0 && isSpace(i)) i -= 1
  if (source.charAt(i) !== ":") return undefined
  i -= 1
  while (i >= 0 && isSpace(i)) i -= 1
  if (source.charAt(i) === '"' || source.charAt(i) === "'") i -= 1
  const end = i + 1
  while (i >= 0 && /[\w-]/.test(source.charAt(i))) i -= 1
  return end > i + 1 ? source.slice(i + 1, end) : undefined
}
