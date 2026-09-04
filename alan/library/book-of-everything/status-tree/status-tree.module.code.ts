import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import { bookRoot } from "../books-root/books-root.module.code.ts"
import type { StatusNode } from "../coverage-status/coverage-status.module.code.ts"
import {
  displayTitle,
  readNodeLabel,
  readStatusField,
} from "../node-profile/node-profile.module.code.ts"

const CHILD_DIR = /^\d{2}-/

export function bookOfEverythingRoot(): string {
  return bookRoot("book-of-everything")
}

function isNodeDir(dir: string): boolean {
  return existsSync(join(dir, "profile.md"))
}

export function readStatusTree(startDir: string = bookOfEverythingRoot()): StatusNode {
  const content = readFileSync(join(startDir, "profile.md"), "utf-8")
  const label = readNodeLabel(content)
  const childDirs = readdirSync(startDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && CHILD_DIR.test(e.name))
    .map((e) => e.name)
    .sort()
    .map((name) => join(startDir, name))
    .filter(isNodeDir)
  const rel = relative(bookOfEverythingRoot(), startDir)
  return {
    path: rel === "" ? "." : rel,
    label,
    title: displayTitle(label),
    status: readStatusField(content),
    children: childDirs.map((d) => readStatusTree(d)),
  }
}

export function resolveBookDir(under: string): string | undefined {
  const dir = join(bookOfEverythingRoot(), under)
  return isNodeDir(dir) ? dir : undefined
}
