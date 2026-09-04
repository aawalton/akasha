import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import ts from "typescript"
import { z } from "zod"
import { getAllDepNames } from "../functional-type-dep-walkers/functional-type-dep-walkers.module.code.ts"
import type { PackageJsonShape } from "../functional-type-shapes/functional-type-shapes.module.code.ts"

const VSCODE_ENGINE_SCHEMA = z.object({ vscode: z.string().min(1) }).passthrough()

export function hasVscodeEngine(pkg: PackageJsonShape): boolean {
  return VSCODE_ENGINE_SCHEMA.safeParse(pkg.engines).success
}

const TSCONFIG_EXTENDS_LIMIT = 10

export function hasTstlTsconfig(workspaceDir: string): boolean {
  let entries: readonly string[]
  try {
    entries = readdirSync(workspaceDir)
  } catch {
    return false
  }
  for (const entry of entries) {
    if (!isTsconfigFileName(entry)) continue
    if (declaresTstl(join(workspaceDir, entry), 0)) return true
  }
  return false
}

function isTsconfigFileName(name: string): boolean {
  return name.startsWith("tsconfig") && name.endsWith(".json")
}

function declaresTstl(configPath: string, depth: number): boolean {
  if (depth > TSCONFIG_EXTENDS_LIMIT) return false
  let text: string
  try {
    text = readFileSync(configPath, "utf-8")
  } catch {
    return false
  }
  const config: unknown = ts.parseConfigFileTextToJson(configPath, text).config
  if (config == null || typeof config !== "object") return false
  if (Object.hasOwn(config, "tstl")) return true
  for (const target of extendsTargets(config)) {
    const next = resolveExtendsPath(dirname(configPath), target)
    if (next === null) continue
    if (declaresTstl(next, depth + 1)) return true
  }
  return false
}

function extendsTargets(config: object): readonly string[] {
  const raw = (config as { readonly extends?: unknown }).extends
  if (typeof raw === "string") return [raw]
  if (!Array.isArray(raw)) return []
  return raw.filter((entry: unknown): entry is string => typeof entry === "string")
}

function resolveExtendsPath(fromDir: string, target: string): string | null {
  if (!target.startsWith(".") && !target.startsWith("/")) return null
  const resolved = resolve(fromDir, target)
  return resolved.endsWith(".json") ? resolved : `${resolved}.json`
}

const K8S_SYNTH_DIRS: readonly string[] = ["k8s", "deploy/k8s"]

export type K8sSynthKind = "Deployment" | "StatefulSet" | "Job" | "CronJob"

export function hasK8sSynthKind(workspaceDir: string, kinds: readonly K8sSynthKind[]): boolean {
  const wanted = new Set<string>(kinds)
  const pattern = new RegExp(`\\bkind:\\s*"(${[...wanted].join("|")})"`)
  for (const subdir of K8S_SYNTH_DIRS) {
    const dir = join(workspaceDir, subdir)
    let entries: readonly string[]
    try {
      entries = readdirSync(dir)
    } catch {
      continue
    }
    for (const entry of entries) {
      if (!isSynthFileName(entry)) continue
      const full = join(dir, entry)
      let isFile = false
      try {
        isFile = statSync(full).isFile()
      } catch {
        continue
      }
      if (!isFile) continue
      let text: string
      try {
        text = readFileSync(full, "utf-8")
      } catch {
        continue
      }
      if (pattern.test(text)) return true
    }
  }
  return false
}

function isSynthFileName(name: string): boolean {
  if (!name.endsWith(".ts")) return false
  if (name === "synth.ts") return true
  return name.startsWith("synth-")
}

export function hasHostedByDecl(pkg: PackageJsonShape): boolean {
  return typeof pkg.hostedBy === "string" && pkg.hostedBy.length > 0
}

export function exposesLibrarySurface(pkg: PackageJsonShape): boolean {
  if (typeof pkg.main === "string" && pkg.main.length > 0) return true
  const exports = pkg.exports
  if (exports == null) return false
  if (typeof exports === "string") return true
  if (typeof exports !== "object") return false
  return Object.keys(exports).length > 0
}

export function hasBinAndNoLibrarySurface(pkg: PackageJsonShape): boolean {
  return pkg.bin != null && !exposesLibrarySurface(pkg)
}

export function hasReactRuntimeDep(pkg: PackageJsonShape): boolean {
  for (const name of getAllDepNames(pkg)) {
    if (name === "react") return true
  }
  return false
}

export function hasDirectDbSdkDep(pkg: PackageJsonShape): boolean {
  for (const name of getAllDepNames(pkg)) {
    if (name === "pg") return true
    if (name.startsWith("@supabase/")) return true
  }
  return false
}

export function hasAppsWorkflowAtRoot(workspaceDir: string): boolean {
  return existsSync(join(workspaceDir, "apps.workflow.ts"))
}
