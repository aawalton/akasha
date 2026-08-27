import { isObjectRecord } from "@shared/utils-narrow/is-object-record"
import { z } from "zod"
import { type RawProjectConfig, resolveReference } from "./typecheck-reach"

export const ROOT_PROJECT = "tsconfig.json"

export const COMPILER_BIN = "node_modules/.bin/tsgo"

const READ_CONCURRENCY = 8

const SHOW_CONFIG_SCHEMA = z.object({
  files: z.unknown().optional(),
  references: z.unknown().optional(),
})

export type CompilerVersion =
  | { readonly ok: true; readonly version: string }
  | { readonly ok: false; readonly exitCode: number }

export function readCompilerVersion(repoRoot: string, compiler: string): CompilerVersion {
  const result = Bun.spawnSync([compiler, "--version"], {
    cwd: repoRoot,
    stdout: "pipe",
    stderr: "pipe",
  })
  if (result.exitCode !== 0) return { ok: false, exitCode: result.exitCode }
  return {
    ok: true,
    version: result.stdout
      .toString()
      .trim()
      .replace(/^Version\s+/, ""),
  }
}

export async function readProjectConfig(
  repoRoot: string,
  compiler: string,
  project: string
): Promise<RawProjectConfig | null> {
  const child = Bun.spawn([compiler, "--showConfig", "-p", project], {
    cwd: repoRoot,
    stdout: "pipe",
    stderr: "ignore",
  })
  const stdout = await new Response(child.stdout).text()
  if ((await child.exited) !== 0) return null
  let shown: z.infer<typeof SHOW_CONFIG_SCHEMA>
  try {
    const parsed = SHOW_CONFIG_SCHEMA.safeParse(JSON.parse(stdout))
    if (!parsed.success) return null
    shown = parsed.data
  } catch {
    return null
  }
  const files = Array.isArray(shown.files) ? shown.files.filter((f) => typeof f === "string") : []
  const references = Array.isArray(shown.references)
    ? shown.references
        .map((r: unknown) => (isObjectRecord(r) ? r.path : null))
        .filter((p): p is string => typeof p === "string")
    : []
  return { files, references }
}

export async function readReferenceClosure(
  repoRoot: string,
  compiler: string
): Promise<ReadonlyMap<string, RawProjectConfig | null>> {
  const cache = new Map<string, RawProjectConfig | null>()
  let frontier: readonly string[] = [ROOT_PROJECT]
  while (frontier.length > 0) {
    for (let start = 0; start < frontier.length; start += READ_CONCURRENCY) {
      const slice = frontier.slice(start, start + READ_CONCURRENCY)
      await Promise.all(
        slice.map(async (project) => {
          cache.set(project, await readProjectConfig(repoRoot, compiler, project))
        })
      )
    }
    const next = new Set<string>()
    for (const project of frontier) {
      for (const reference of cache.get(project)?.references ?? []) {
        const target = resolveReference(project, reference)
        if (!cache.has(target)) next.add(target)
      }
    }
    frontier = [...next]
  }
  return cache
}
