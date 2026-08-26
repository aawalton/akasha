import { readFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import type { Check, CheckFailure } from "../check-shape.ts"

const CODE = new Set(["ts", "tsx", "mts", "cts", "js", "jsx", "mjs", "cjs"])

const SPECIFIERS: readonly RegExp[] = [
  /\bfrom\s*["']([^"']+)["']/g,
  /\bimport\s*["']([^"']+)["']/g,
  /\bimport\s*\(\s*["']([^"']+)["']/g,
  /\brequire\s*\(\s*["']([^"']+)["']/g,
]

function carriesCode(path: string): boolean {
  const dot = path.lastIndexOf(".")
  return dot !== -1 && CODE.has(path.slice(dot + 1))
}

function textAt(path: string): string | null {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return null
  }
}

function specifiersIn(text: string): readonly string[] {
  const found = new Set<string>()
  for (const pattern of SPECIFIERS) {
    for (const match of text.matchAll(pattern)) {
      const specifier = match[1]
      if (specifier !== undefined) found.add(specifier)
    }
  }
  return [...found]
}

function reachOf(specifier: string, path: string, root: string): string | null {
  if (!specifier.startsWith(".") && !specifier.startsWith("/")) return null
  const at = specifier.startsWith("/") ? specifier : resolve(dirname(path), specifier)
  const outward = relative(root, at)
  return outward === ".." || outward.startsWith("../") ? outward : null
}

export const importReach: Check = {
  slug: "import-reach",
  run: (paths, root) => {
    const failures: CheckFailure[] = []
    for (const path of paths) {
      if (!carriesCode(path)) continue
      const text = textAt(path)
      if (text === null) continue
      for (const specifier of specifiersIn(text)) {
        const outward = reachOf(specifier, path, root)
        if (outward === null) continue
        failures.push({
          path,
          reason: `imports \`${specifier}\`, which is \`${outward}\` — outside this repository`,
        })
      }
    }
    return failures
  },
}

export default importReach
