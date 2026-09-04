import { existsSync } from "node:fs"
import { join } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"

const BOOKS = "book-of-everything"

export function booksRoot(): string {
  const root = ownRepoRoot()
  if (!existsSync(join(root, BOOKS)))
    throw new Error(
      `${BOOKS} is not in ${root}, so every reading over it would be taken from nothing. A count from here would report zero rather than say it found no books.`
    )
  return root
}

export function bookRoot(slug: string): string {
  return join(booksRoot(), slug)
}
