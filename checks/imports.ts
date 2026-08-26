import { dirname, resolve } from "node:path"

const SPECIFIERS: readonly RegExp[] = [
  /\bfrom\s*["']([^"']+)["']/g,
  /\bimport\s*["']([^"']+)["']/g,
  /\bimport\s*\(\s*["']([^"']+)["']/g,
  /\brequire\s*\(\s*["']([^"']+)["']/g,
]

const CODE = new Set(["ts", "tsx", "mts", "cts", "js", "jsx", "mjs", "cjs"])

export function carriesCode(path: string): boolean {
  const dot = path.lastIndexOf(".")
  return dot !== -1 && CODE.has(path.slice(dot + 1))
}

export function specifiersIn(text: string): readonly string[] {
  const found = new Set<string>()
  for (const pattern of SPECIFIERS) {
    for (const match of text.matchAll(pattern)) {
      const specifier = match[1]
      if (specifier !== undefined) found.add(specifier)
    }
  }
  return [...found]
}

export function targetOf(path: string, specifier: string): string | null {
  if (!specifier.startsWith(".") && !specifier.startsWith("/")) return null
  return specifier.startsWith("/") ? specifier : resolve(dirname(path), specifier)
}
