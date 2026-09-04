const escapeRegex = (one: string): string => one.replace(/[.+^$*?()|{}[\]\\]/g, "\\$&")

const globToRegex = (glob: string): RegExp => {
  let at = 0
  let out = "^"
  while (at < glob.length) {
    const here = glob[at]
    if (here === undefined) break
    if (here === "*" && glob[at + 1] === "*") {
      if (glob[at + 2] === "/") {
        out += "(?:.*/)?"
        at += 3
      } else {
        out += ".*"
        at += 2
      }
      continue
    }
    if (here === "*") {
      out += "[^/]*"
      at++
      continue
    }
    if (here === "?") {
      out += "[^/]"
      at++
      continue
    }
    if (here === "{") {
      const close = glob.indexOf("}", at)
      if (close > at) {
        const alts = glob
          .slice(at + 1, close)
          .split(",")
          .map(escapeRegex)
        out += `(?:${alts.join("|")})`
        at = close + 1
        continue
      }
    }
    if (/[.+^$()|\\]/.test(here)) {
      out += `\\${here}`
      at++
      continue
    }
    out += here
    at++
  }
  out += "$"
  return new RegExp(out)
}

export function matchGlob(pattern: string, path: string): boolean {
  const cleaned = pattern.endsWith("!") ? pattern.slice(0, -1) : pattern
  return globToRegex(cleaned).test(path)
}

export function matchAny(patterns: readonly string[], path: string): boolean {
  for (const pattern of patterns) {
    if (matchGlob(pattern, path)) return true
  }
  return false
}

export const WALK_SKIP_DIRS: ReadonlySet<string> = new Set([
  "node_modules",
  ".next",
  "dist",
  ".turbo",
  "__fixtures__",
])

export function isUnder(relPath: string, rootRel: string): boolean {
  return rootRel === "" || relPath === rootRel || relPath.startsWith(`${rootRel}/`)
}

export function below(relPath: string, rootRel: string): string {
  return rootRel === "" ? relPath : relPath.slice(rootRel.length + 1)
}

export function skipsAnySegment(
  relPath: string,
  rootRel: string,
  skip: ReadonlySet<string>
): boolean {
  const segments = below(relPath, rootRel).split("/")
  for (let at = 0; at < segments.length - 1; at++) {
    const segment = segments[at]
    if (segment !== undefined && skip.has(segment)) return true
  }
  return false
}

const isTsFileName = (name: string): boolean => name.endsWith(".ts") || name.endsWith(".tsx")

export function walkTsFiles(paths: readonly string[], rootRel: string): readonly string[] {
  const out: string[] = []
  for (const relPath of paths) {
    if (!isUnder(relPath, rootRel)) continue
    if (skipsAnySegment(relPath, rootRel, WALK_SKIP_DIRS)) continue
    if (!isTsFileName(relPath)) continue
    out.push(relPath)
  }
  return out
}

export function scanFiles(
  paths: readonly string[],
  rootRel: string,
  matchAgainstRel: string,
  patterns: readonly string[]
): readonly string[] {
  if (patterns.length === 0) return []
  const out: string[] = []
  for (const relPath of paths) {
    if (!isUnder(relPath, rootRel)) continue
    if (skipsAnySegment(relPath, rootRel, WALK_SKIP_DIRS)) continue
    if (!isUnder(relPath, matchAgainstRel)) continue
    if (matchAny(patterns, below(relPath, matchAgainstRel))) out.push(relPath)
  }
  return out
}

export const ADAPTER_PATTERNS: readonly string[] = [
  "**/app/**/page.{ts,tsx,js,jsx}",
  "**/app/**/layout.{ts,tsx,js,jsx}",
  "**/app/**/route.{ts,tsx,js,jsx}",
  "**/app/**/loading.{ts,tsx,js,jsx}",
  "**/app/**/error.{ts,tsx,js,jsx}",
  "**/app/**/global-error.{ts,tsx,js,jsx}",
  "**/app/**/not-found.{ts,tsx,js,jsx}",
  "**/app/**/default.{ts,tsx,js,jsx}",
  "**/app/**/template.{ts,tsx,js,jsx}",
  "**/app/root.{ts,tsx}",
  "**/app/entry.server.{ts,tsx}",
  "**/app/entry.client.{ts,tsx}",
  "**/app/routes.{ts,tsx}",
  "**/app/routes/**/*.{ts,tsx}",
  "**/vite.config.{ts,mts,js,mjs}",
  "**/react-router.config.{ts,mts,js,mjs}",
  "**/proxy.{ts,tsx,js,jsx}",
  "**/instrumentation.{ts,tsx,js,jsx}",
  "**/app/**/opengraph-image.{ts,tsx,js,jsx}",
  "**/app/**/icon.{ts,tsx,js,jsx}",
  "**/app/**/apple-icon.{ts,tsx,js,jsx}",
  "**/app/**/twitter-image.{ts,tsx,js,jsx}",
  "**/app/**/sitemap.{ts,js}",
  "**/app/**/robots.{ts,js}",
  "**/app/**/manifest.{ts,js}",
  "**/tunnel-routes.ts",
  "**/synth.ts",
  "**/next.config.{ts,mjs,js}",
  "**/rbac.ts",
  "**/addons/*/src/**/*.ts",
  "**/watcher-worker/watcher-worker.module.code.ts",
  "**/docs-validator/validate-cli.ts",
  "**/docs-validator/export.ts",
  "**/src/pure/*.spec.ts",
]
