import { partedIn, sectionedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const CODE = "code"

const SHEBANG = "#!"

const MAIN = "import.meta.main"

export type Held = {
  readonly page: string
  readonly files: readonly string[]
}

function codeNamed(path: string): boolean {
  const said = partedIn(path)
  if (said === null) return false
  const held = sectionedIn(said)
  return held !== null && held.propertySlug === CODE && !held.uncommitted
}

function declaring(body: string): boolean {
  return body.startsWith(SHEBANG) || body.includes(MAIN)
}

function declaredBy(read: (path: string) => string | null, one: Held): boolean {
  for (const at of one.files) {
    if (!codeNamed(at)) continue
    const body = read(at)
    if (body !== null && declaring(body)) return true
  }
  return false
}

export function entriesDeclared(
  read: (path: string) => string | null,
  held: readonly Held[]
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of held) {
    if (declaredBy(read, one)) found.add(one.page)
  }
  return found
}
