export function exportedAs(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}

export function typedAs(slug: string): string {
  const said = exportedAs(slug)
  return `${said.slice(0, 1).toUpperCase()}${said.slice(1)}`
}

const RESERVED: ReadonlySet<string> = new Set([
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
])

const BARE = /^[\p{ID_Start}$_][\p{ID_Continue}$‌‍]*$/u

export function nameFaultIn(slug: string): string | null {
  const said = exportedAs(slug)
  if (said === "") return "a slug saying nothing names no export"
  if (RESERVED.has(said)) {
    return `the name \`${slug}\` makes is \`${said}\`, which TypeScript keeps for itself`
  }
  if (!BARE.test(said)) {
    return `the name \`${slug}\` makes is \`${said}\`, which no \`export const\` may be declared under`
  }
  return null
}
