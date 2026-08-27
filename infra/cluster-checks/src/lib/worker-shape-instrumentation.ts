import { stripComments } from "./worker-shape-handlers"

const INSTRUMENTATION_CALL_RE = /\b(?:runLongRunningWorker|measureLoopIteration)\s*\(/

const RELATIVE_SPECIFIER_RE = /(?:from|import)\s*\(?\s*["'](\.\.?\/[^"']+)["']/g

function dirnameOf(relPath: string): string {
  const idx = relPath.lastIndexOf("/")
  return idx === -1 ? "" : relPath.slice(0, idx)
}

function joinRelative(fromDir: string, specifier: string): string {
  const parts = fromDir.split("/").filter((p) => p.length > 0)
  for (const seg of specifier.split("/")) {
    if (seg === "" || seg === ".") continue
    if (seg === "..") {
      parts.pop()
      continue
    }
    parts.push(seg)
  }
  return parts.join("/")
}

function resolveSpecifier(
  fromDir: string,
  specifier: string,
  sourcesByPath: ReadonlyMap<string, string>
): string | null {
  const joined = joinRelative(fromDir, specifier)
  const base = joined.endsWith(".js") ? joined.slice(0, -".js".length) : joined
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`]) {
    if (sourcesByPath.has(candidate)) return candidate
  }
  return null
}

export function reachableWorkerSources(
  workerRelPath: string,
  sourcesByPath: ReadonlyMap<string, string>
): ReadonlyMap<string, string> {
  const reached = new Map<string, string>()
  const queue: string[] = [workerRelPath]
  while (queue.length > 0) {
    const rel = queue.pop()
    if (rel === undefined) continue
    if (reached.has(rel)) continue
    const source = sourcesByPath.get(rel)
    if (source === undefined) continue
    const stripped = stripComments(source)
    reached.set(rel, stripped)
    const dir = dirnameOf(rel)
    for (const match of stripped.matchAll(RELATIVE_SPECIFIER_RE)) {
      const specifier = match[1]
      if (specifier === undefined) continue
      const resolved = resolveSpecifier(dir, specifier, sourcesByPath)
      if (resolved !== null && !reached.has(resolved)) queue.push(resolved)
    }
  }
  return reached
}

export function closureIsInstrumented(reached: ReadonlyMap<string, string>): boolean {
  for (const stripped of reached.values()) {
    if (INSTRUMENTATION_CALL_RE.test(stripped)) return true
  }
  return false
}

export function workerIsInstrumented(
  workerRelPath: string,
  sourcesByPath: ReadonlyMap<string, string>
): boolean {
  return closureIsInstrumented(reachableWorkerSources(workerRelPath, sourcesByPath))
}
