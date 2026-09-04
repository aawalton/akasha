#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, resolve } from "node:path"
import ts from "typescript"
import { z } from "zod"
import type { ViteSupabaseRrDefineViolation } from "../../modules/check-vite-supabase-rr-define-json-contract/check-vite-supabase-rr-define-json-contract.module.code.ts"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { discoverRepoFiles } from "../../modules/repo-files/repo-files.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { exitOnResult } from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[vite-supabase-rr-define]"
const SUPABASE_RR_PKG = "@akasha/supabase-rr"
const HELPER_SPECIFIER = "@akasha/supabase-rr/client-env-define"
const HELPER_NAME = "supabaseClientEnvDefine"
const VITE_CONFIG_BASENAME = "vite.config.ts"
const DEFINE_PROPERTY = "define"

const DepsSchema = z.record(z.string(), z.string()).optional()
const PackageJsonSchema = z
  .object({
    name: z.string().optional(),
    dependencies: DepsSchema,
    devDependencies: DepsSchema,
    peerDependencies: DepsSchema,
    optionalDependencies: DepsSchema,
  })
  .passthrough()

const DEPENDENCY_FIELDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
] as const

type ManifestAnswer = "yes" | "no" | "silent"

function manifestAnswer(pkgJsonPath: string): ManifestAnswer {
  const text = readFileSync(pkgJsonPath, "utf-8")
  let parsed: ReturnType<typeof PackageJsonSchema.safeParse>
  try {
    parsed = PackageJsonSchema.safeParse(JSON.parse(text))
  } catch {
    return "silent"
  }
  if (!parsed.success) return "silent"
  let declaredAny = false
  for (const field of DEPENDENCY_FIELDS) {
    const deps = parsed.data[field]
    if (deps === undefined) continue
    declaredAny = true
    if (SUPABASE_RR_PKG in deps) return "yes"
  }
  return declaredAny ? "no" : "silent"
}

function ancestorDeclaresHelperPkg(repoRoot: string, rel: string): boolean {
  const root = resolve(repoRoot)
  let dir = dirname(resolve(repoRoot, rel))
  for (;;) {
    const manifest = resolve(dir, "package.json")
    if (existsSync(manifest)) {
      const answer = manifestAnswer(manifest)
      if (answer !== "silent") return answer === "yes"
    }
    if (dir === root) return false
    const parent = dirname(dir)
    if (parent === dir) return false
    dir = parent
  }
}

function propertyKey(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name)) return name.text
  if (ts.isStringLiteral(name)) return name.text
  return undefined
}

interface HelperBinding {
  readonly direct: ReadonlySet<string>
  readonly namespaces: ReadonlySet<string>
}

function helperBinding(sourceFile: ts.SourceFile): HelperBinding {
  const direct = new Set<string>()
  const namespaces = new Set<string>()
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const specifier = statement.moduleSpecifier
    if (!ts.isStringLiteral(specifier) || specifier.text !== HELPER_SPECIFIER) continue
    const bound = statement.importClause?.namedBindings
    if (bound === undefined) continue
    if (ts.isNamespaceImport(bound)) {
      namespaces.add(bound.name.text)
      continue
    }
    for (const element of bound.elements) {
      const exported = element.propertyName?.text ?? element.name.text
      if (exported === HELPER_NAME) direct.add(element.name.text)
    }
  }
  return { direct, namespaces }
}

function hasBinding(binding: HelperBinding): boolean {
  return binding.direct.size > 0 || binding.namespaces.size > 0
}

function callsHelper(node: ts.Node, binding: HelperBinding): boolean {
  let found = false
  const visit = (current: ts.Node): undefined => {
    if (found) return
    if (ts.isCallExpression(current)) {
      const callee = current.expression
      if (ts.isIdentifier(callee) && binding.direct.has(callee.text)) {
        found = true
        return
      }
      if (
        ts.isPropertyAccessExpression(callee) &&
        ts.isIdentifier(callee.expression) &&
        binding.namespaces.has(callee.expression.text) &&
        callee.name.text === HELPER_NAME
      ) {
        found = true
        return
      }
    }
    ts.forEachChild(current, visit)
  }
  visit(node)
  return found
}

function helperReachesDefine(sourceFile: ts.SourceFile, binding: HelperBinding): boolean {
  let reaches = false
  const visit = (current: ts.Node): undefined => {
    if (reaches) return
    if (
      ts.isPropertyAssignment(current) &&
      propertyKey(current.name) === DEFINE_PROPERTY &&
      callsHelper(current.initializer, binding)
    ) {
      reaches = true
      return
    }
    ts.forEachChild(current, visit)
  }
  visit(sourceFile)
  return reaches
}

function findViteConfigs(repoRoot: string): readonly string[] {
  return discoverRepoFiles(repoRoot).filter((rel) => basename(rel) === VITE_CONFIG_BASENAME)
}

async function main(): Promise<undefined> {
  const { flags } = parseArgs(process.argv.slice(2), STANDARD_FLAGS, { passthrough: true })
  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    console.error(`${PREFIX} --repo-root ${repoRoot} does not exist`)
    process.exit(2)
  }

  const { population, violations } = examineFilePopulation<ViteSupabaseRrDefineViolation>({
    files: findViteConfigs(repoRoot),
    unit: "vite config files",
    membership: {
      kind: "enumerated",
      because:
        "`discoverRepoFiles` runs `git ls-files --cached --others --exclude-standard` over " +
        "`repoRoot` and THROWS with git's own stderr when git fails rather than returning an " +
        "empty list, so a shorter list is fewer vite configs in the tree",
    },
    pathOf: (rel) => resolve(repoRoot, rel),
    scan: (rel, source) => {
      const sourceFile = ts.createSourceFile(
        rel,
        source,
        ts.ScriptTarget.Latest,
        false,
        ts.ScriptKind.TS
      )
      const binding = helperBinding(sourceFile)
      const inScope = source.includes(SUPABASE_RR_PKG) || ancestorDeclaresHelperPkg(repoRoot, rel)
      if (!inScope) return []
      if (!hasBinding(binding)) {
        return [
          {
            file: rel,
            message: `vite config whose bundle can reach ${SUPABASE_RR_PKG} must import ${HELPER_NAME} from ${HELPER_SPECIFIER} and spread it into the vite \`define\` block`,
          },
        ]
      }
      if (!helperReachesDefine(sourceFile, binding)) {
        return [
          {
            file: rel,
            message: `imports ${HELPER_NAME} from ${HELPER_SPECIFIER} but never calls it inside a \`define\` property, so nothing is inlined and the client bundle reads \`undefined\` at module load — spread it in with \`define: { ...${HELPER_NAME}() }\``,
          },
        ]
      }
      return []
    },
  })

  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `vite.config.ts files missing ${HELPER_NAME} wiring`,
      successMessage: `All vite configs that can reach ${SUPABASE_RR_PKG} wire ${HELPER_NAME} into \`define\`.`,
      formatViolation: (v) => `${v.file} — ${v.message}`,
    },
  })
}

main().catch((err) => {
  console.error(`${PREFIX} Unexpected error:`, err)
  process.exit(2)
})
