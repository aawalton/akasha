import { z } from "zod"

export const PKG_DEPS_SCHEMA = z
  .object({
    name: z.string().optional(),
    dependencies: z.record(z.string(), z.string()).optional(),
    devDependencies: z.record(z.string(), z.string()).optional(),
    peerDependencies: z.record(z.string(), z.string()).optional(),
    optionalDependencies: z.record(z.string(), z.string()).optional(),
  })
  .passthrough()

export const DEP_FIELDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
] as const

export const NODE_BUILTINS = new Set([
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib",
])

export const BUN_GLOBALS = new Set(["bun"])

export const SKIP_SPECIFIERS = new Set(["lualib_bundle", "vscode"])

export const PATH_SKIP_SEGMENTS = new Set(["__fixtures__", "tests", "_generated"])

export function relPathWithinWorkspace(filePath: string, workspaceRoot: string): string {
  const prefix = workspaceRoot === "" ? "" : `${workspaceRoot}/`
  return filePath.startsWith(prefix) ? filePath.slice(prefix.length) : filePath
}

export function pathHasSkippedSegment(relPath: string): boolean {
  for (const segment of relPath.split("/")) {
    if (PATH_SKIP_SEGMENTS.has(segment)) return true
  }
  return false
}
