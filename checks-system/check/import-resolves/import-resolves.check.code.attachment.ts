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

/**
 * One scanner per loader, held for the life of the process.
 *
 * A SCANNER HOLDS NOTHING ABOUT THE TREE, so this is not what `onceInCall` is for: it is a parser,
 * and building one per file costs a third of the whole scan for nothing. `onceInCall` would also
 * stand inert wherever no call scope is open, which is every path but the audit.
 */
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

// A SHEBANG IS PART OF WHAT BUN LOADS AND NOT OF WHAT IT PARSES FROM A STRING. Handed that line
// raw, the scanner throws `Unexpected #!/usr/bin/env bun`; a hundred and seventy files here open
// with one, and every one of them would read as importing nothing at all.
function withoutShebang(text: string): string {
  if (!text.startsWith(SHEBANG)) return text
  const end = text.indexOf("\n")
  return end === -1 ? "" : text.slice(end + 1)
}

/**
 * Every specifier the body imports, as Bun's own scanner reads it.
 *
 * NOT A REGEX OVER THE TEXT. `specifiersIn` matches four patterns against raw characters and
 * cannot tell an import from a string that reads like one, which is how the specifier inside the
 * error message at `infra/cluster-checks/src/lib/client-env-inlined.ts:116` was once reported as
 * an import. This scanner is the one the runtime loads by, so it takes that line for the string it
 * is, and drops a type-only import, which is erased before anything is asked to resolve it.
 *
 * A BODY THE SCANNER REFUSES IMPORTS NOTHING HERE. A file whose syntax Bun will not read cannot
 * load whatever its specifiers say, and that syntax is what wants fixing rather than an import.
 */
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

/**
 * Whether the package answers the specifier, asked of the runtime and of nothing else.
 *
 * `Bun.resolveSync` IS WHAT DECIDES WHETHER THE PROGRAM LOADS. TypeScript is the more permissive
 * reader of the two and was the only gate on module resolution here: handed
 * `"exports": { "./*": ["./src/*.ts", "./src/*.tsx"] }` it honours both entries, Bun reads the
 * first and no further, and every `.tsx` module behind such a map compiled green and would not
 * load.
 */
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
