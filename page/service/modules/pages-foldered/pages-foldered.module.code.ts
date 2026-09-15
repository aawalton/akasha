import { readdirSync } from "node:fs"
import { join } from "node:path"

export type Held = {
  readonly name: string
  readonly folder: boolean
}

export function foldersIn(held: readonly Held[], pageTypeSlug: string): boolean {
  const ending = `.${pageTypeSlug}.ts`
  let foldered = false
  for (const one of held) {
    if (!one.folder && one.name.endsWith(ending)) return false
    if (one.folder) foldered = true
  }
  return foldered
}

export function heldIn(root: string, pagesAt: string): readonly Held[] {
  try {
    return readdirSync(join(root, pagesAt), { withFileTypes: true }).map((one) => ({
      name: one.name,
      folder: one.isDirectory(),
    }))
  } catch {
    return []
  }
}

export function foldersHere(root: string, pagesAt: string, pageTypeSlug: string): boolean {
  return foldersIn(heldIn(root, pagesAt), pageTypeSlug)
}
