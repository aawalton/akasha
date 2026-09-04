import { existsSync, readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import ts from "typescript"
import { z } from "zod"

const PRIMITIVES_PACKAGE_DIR = "design/primitives"
const PRIMITIVES_PACKAGE_NAME = "@akasha/design-primitives"
const COMPONENT_ENDING = ".module.code.tsx"

const CAPPED_BY_AVAILABLE_WIDTH =
  /max-w-(?:\[var\(|\()--radix-([a-z][a-z-]*?)-content-available-width\)/

const COLLISION_PADDING_ATTR = "collisionPadding"

const FamilyCapture = z.tuple([z.string()])

function parseCappedFamily(text: string): string | null {
  if (!CAPPED_BY_AVAILABLE_WIDTH.test(text)) return null
  const [family] = requireMatchPositional(CAPPED_BY_AVAILABLE_WIDTH, FamilyCapture, text)
  return family
}

export interface PrimitiveSource {
  readonly path: string
  readonly source: string
}

function isStringish(node: ts.Node): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
}

function exportedNames(sf: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>()
  for (const statement of sf.statements) {
    if (ts.isExportDeclaration(statement)) {
      const clause = statement.exportClause
      if (clause !== undefined && ts.isNamedExports(clause)) {
        for (const element of clause.elements) names.add(element.name.text)
      }
      continue
    }
    const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined
    const isExported = modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) === true
    if (!isExported) continue
    if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) {
      names.add(statement.name.text)
    }
  }
  return names
}

function contractFamilyOf(fn: ts.FunctionDeclaration): string | null {
  let family: string | null = null
  let hasCollisionPadding = false
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isJsxAttribute(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === COLLISION_PADDING_ATTR
    ) {
      hasCollisionPadding = true
    }
    if (family === null && isStringish(node)) {
      family = parseCappedFamily(node.text)
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  ts.forEachChild(fn, visit)
  return hasCollisionPadding ? family : null
}

export function tagsFromPrimitiveSources(
  sources: Iterable<PrimitiveSource>
): ReadonlyMap<string, string> {
  const tags = new Map<string, string>()
  for (const { path, source } of sources) {
    const sf = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const exported = exportedNames(sf)
    for (const statement of sf.statements) {
      if (!ts.isFunctionDeclaration(statement)) continue
      const name = statement.name?.text
      if (name === undefined || !exported.has(name)) continue
      const family = contractFamilyOf(statement)
      if (family === null) continue
      const already = tags.get(name)
      if (already !== undefined && already !== family) {
        throw new Error(
          `popover-family wrappers: ${name} declares family "${already}" and "${family}" in different files — a violation's remedy sentence cannot name both`
        )
      }
      tags.set(name, family)
    }
  }
  return tags
}

const PackageManifest = z.object({ name: z.string() })

const memoized = new Map<string, ReadonlyMap<string, string>>()

export function derivePopoverFamilyTags(repoRoot: string): ReadonlyMap<string, string> {
  const cached = memoized.get(repoRoot)
  if (cached !== undefined) return cached

  const packageDir = resolve(repoRoot, PRIMITIVES_PACKAGE_DIR)
  const manifestPath = resolve(packageDir, "package.json")
  if (!existsSync(manifestPath)) {
    throw new Error(
      `popover-family wrappers: no package manifest at ${manifestPath} — the wrappers this rule derives itself from are not where it looked, so it would govern nothing`
    )
  }
  const manifest = PackageManifest.parse(JSON.parse(readFileSync(manifestPath, "utf8")))
  if (manifest.name !== PRIMITIVES_PACKAGE_NAME) {
    throw new Error(
      `popover-family wrappers: ${manifestPath} names "${manifest.name}" rather than "${PRIMITIVES_PACKAGE_NAME}" — the primitives package has moved and this is reading some other package's components`
    )
  }

  const sources: PrimitiveSource[] = []
  for (const moduleEntry of readdirSync(packageDir, { withFileTypes: true })) {
    if (!moduleEntry.isDirectory()) continue
    const moduleDir = resolve(packageDir, moduleEntry.name)
    for (const entry of readdirSync(moduleDir, { withFileTypes: true })) {
      if (!entry.isFile()) continue
      if (!entry.name.endsWith(COMPONENT_ENDING)) continue
      const path = resolve(moduleDir, entry.name)
      sources.push({ path, source: readFileSync(path, "utf8") })
    }
  }
  sources.sort((a, b) => a.path.localeCompare(b.path))

  const tags = tagsFromPrimitiveSources(sources)
  if (tags.size === 0) {
    throw new Error(
      `popover-family wrappers: ${packageDir} holds ${sources.length} component file(s) and none declares a collisionPadding with a --radix-<family>-content-available-width cap — a rule derived from this would govern no tag at all and report clean over every override in the tree`
    )
  }

  memoized.set(repoRoot, tags)
  return tags
}
