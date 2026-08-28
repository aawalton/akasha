import { dirname, relative } from "node:path"
import { isGeneratedFile } from "../../../generated-file/generated-file.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { packagesFor } from "../../../workspace-package/packages.ts"
import type { Check } from "../check-shape.ts"

type Loader = "js" | "jsx" | "ts" | "tsx"

const LOADERS: Readonly<Record<string, Loader>> = {
  cjs: "js",
  cts: "ts",
  js: "js",
  jsx: "jsx",
  mjs: "js",
  mts: "ts",
  ts: "ts",
  tsx: "tsx",
}

const SCOPE = "@"

const SHEBANG = "#!"

const READERS = new Map<Loader, Bun.Transpiler>()

function readerFor(loader: Loader): Bun.Transpiler {
  const held = READERS.get(loader)
  if (held !== undefined) return held
  const made = new Bun.Transpiler({ loader })
  READERS.set(loader, made)
  return made
}

function loaderFor(path: string): Loader | null {
  const dot = path.lastIndexOf(".")
  if (dot === -1) return null
  return LOADERS[path.slice(dot + 1)] ?? null
}

function withoutShebang(text: string): string {
  if (!text.startsWith(SHEBANG)) return text
  const end = text.indexOf("\n")
  return end === -1 ? "" : text.slice(end + 1)
}

function importedIn(text: string, loader: Loader): readonly string[] {
  try {
    const found = readerFor(loader).scanImports(withoutShebang(text))
    return [...new Set(found.map((one) => one.path))]
  } catch {
    return []
  }
}

function packageOf(specifier: string): string | null {
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null
  const parts = specifier.split("/")
  const count = specifier.startsWith(SCOPE) ? 2 : 1
  if (parts.length < count) return null
  return parts.slice(0, count).join("/")
}

function answered(specifier: string, from: string): boolean {
  try {
    Bun.resolveSync(specifier, from)
    return true
  } catch {
    return false
  }
}

export const importResolves = {
  slug: "import-resolves",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    const loader = loaderFor(path)
    if (loader === null) return []
    const text = decodeUtf8(body)
    if (text === null) return []
    if (isGeneratedFile(relative(root, path), text)) return []
    const here = packagesFor(root)
    if (here.size === 0) return []
    const from = dirname(path)
    const said: string[] = []
    for (const specifier of importedIn(text, loader)) {
      const name = packageOf(specifier)
      if (name === null || !here.has(name)) continue
      if (answered(specifier, from)) continue
      said.push(`\`${specifier}\` names \`${name}\`, a package here that does not answer it`)
    }
    return said
  },
} satisfies Check

export default importResolves
