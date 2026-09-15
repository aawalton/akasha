import { createHash } from "node:crypto"
import { readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import type { Body } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const MODULE = "module"

const ENTRYPOINT = "proxy-entry"

const CODE = "code"

const TS = "ts"

export function modelGatewayEntrypoint(): string {
  const root = ownRepoRoot()
  const page = listedAt(root, MODULE, ENTRYPOINT)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${ENTRYPOINT}\`, so the gateway has no entry`)
  }
  return join(root, at)
}

function isFileAt(absolute: string): boolean {
  try {
    return statSync(absolute).isFile()
  } catch {
    return false
  }
}

function bodiesUnder(root: string): Body {
  return (path) => {
    const at = join(root, path)
    return isFileAt(at) ? readFileSync(at, "utf8") : null
  }
}

function collectVersionTreeFilesFrom(root: string, entrypoint: string): readonly string[] {
  const seed = relative(root, entrypoint)
  const found = closureOf(imports, [seed], {
    index: shadowAt(root).index,
    bodyAt: bodiesUnder(root),
  })
  for (const one of found) {
    if (isFileAt(join(root, one))) continue
    throw new Error(
      `model-gateway-tree-version: ${one} is no readable file. The version stamp is what tells ` +
        "a supervisor its gateway changed, so a member of the closure that cannot be read " +
        "leaves the hash and its edits stop respawning anything."
    )
  }
  return found
}

function hashedOver(root: string, reached: readonly string[]): string {
  const perFileLines = reached.map((rel) => {
    const hash = createHash("sha256")
      .update(readFileSync(join(root, rel)))
      .digest("hex")
    return `${hash}  ${rel}`
  })
  return createHash("sha256")
    .update(`${perFileLines.join("\n")}\n`)
    .digest("hex")
}

export function modelGatewayTreeFiles(): readonly string[] {
  return collectVersionTreeFilesFrom(ownRepoRoot(), modelGatewayEntrypoint())
}

export function computeModelGatewayTreeVersion(): string {
  return hashedOver(ownRepoRoot(), modelGatewayTreeFiles())
}
