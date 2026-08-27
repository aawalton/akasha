import { spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import type { z } from "zod"

export function run(
  root: string,
  cmd: string,
  args: readonly string[],
  opts: { quiet?: boolean } = {}
): string {
  const result = spawnSync(cmd, args, {
    cwd: root,
    encoding: "utf8",
    stdio: opts.quiet ? ["ignore", "pipe", "pipe"] : ["ignore", "pipe", "inherit"],
  })
  if (result.status !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} failed (exit ${result.status}): ${result.stderr ?? ""}`
    )
  }
  return result.stdout ?? ""
}

export function runCapture(
  root: string,
  cmd: string,
  args: readonly string[]
): { stdout: string; stderr: string; status: number } {
  const result = spawnSync(cmd, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  })
  return { stdout: result.stdout ?? "", stderr: result.stderr ?? "", status: result.status ?? 1 }
}

export function gitMv(root: string, oldPath: string, newPath: string): undefined {
  const absOld = join(root, oldPath)
  const absNew = join(root, newPath)
  if (!existsSync(absOld)) {
    throw new Error(`gitMv: source does not exist: ${oldPath}`)
  }
  if (existsSync(absNew)) {
    throw new Error(`gitMv: target already exists: ${newPath}`)
  }
  mkdirSync(dirname(absNew), { recursive: true })
  run(root, "git", ["mv", oldPath, newPath])
}

export function isWithin(parent: string, child: string): boolean {
  const p = parent.endsWith("/") ? parent : `${parent}/`
  return child === parent || child.startsWith(p)
}

export function exists(root: string, path: string): boolean {
  return existsSync(join(root, path))
}

const DEFAULT_IGNORE = new Set(["node_modules", ".git", "dist", ".next", ".serena", ".turbo"])

export function listFiles(
  root: string,
  relRoot: string,
  opts: { ignoreDirs?: Set<string> } = {}
): readonly string[] {
  const ignore = opts.ignoreDirs ?? DEFAULT_IGNORE
  const absRoot = join(root, relRoot)
  const out: string[] = []
  function walk(absDir: string): undefined {
    for (const entry of readdirSync(absDir, { withFileTypes: true })) {
      if (ignore.has(entry.name)) continue
      const abs = join(absDir, entry.name)
      if (entry.isDirectory()) {
        walk(abs)
      } else if (entry.isFile()) {
        out.push(relative(root, abs).split("\\").join("/"))
      }
    }
  }
  if (existsSync(absRoot)) walk(absRoot)
  return out
}

export function readText(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8")
}

export function writeText(root: string, path: string, contents: string): undefined {
  writeFileSync(join(root, path), contents, "utf8")
}

export function readJson<T extends z.ZodTypeAny>(
  root: string,
  path: string,
  schema: T
): z.infer<T> {
  const raw = readFileSync(join(root, path), "utf8")
  const stripped = raw.replace(/,(\s*[}\]])/g, "$1")
  return schema.parse(JSON.parse(stripped))
}

export function writeJson(root: string, path: string, value: unknown): undefined {
  writeFileSync(join(root, path), `${JSON.stringify(value, null, 2)}\n`, "utf8")
}
