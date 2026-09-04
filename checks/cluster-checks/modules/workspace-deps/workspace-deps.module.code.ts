export interface PackageJson {
  name?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  bin?: string | Record<string, string>
  scripts?: Record<string, string>
  workspaces?: readonly string[]
  patchedDependencies?: Record<string, string>
}

export interface WorkspaceInfo {
  root: string
  name: string
  packageJsonPath: string
  pkg: PackageJson
}

export function extractPackageName(specifier: string): string | null {
  if (specifier === "") return null
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null
  if (specifier.startsWith("node:")) return null
  if (specifier.startsWith("bun:")) return null
  if (specifier.startsWith("@/") || specifier.startsWith("~")) return null
  if (specifier.includes("${")) return null

  if (specifier.startsWith("@")) {
    const parts = specifier.split("/")
    if (parts.length < 2) return null
    const scopePart = parts[0]
    const namePart = parts[1]
    if (scopePart === undefined || namePart === undefined) return null
    const scope = scopePart.slice(1)
    if (!/^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/.test(scope)) return null
    return `${scopePart}/${namePart}`
  }

  const name = specifier.split("/")[0]
  if (name === undefined) return null
  if (!/^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/.test(name)) return null
  return name
}

export function declaredDepsOf(pkg: PackageJson): {
  dependencies: Set<string>
  devDependencies: Set<string>
  all: Set<string>
} {
  const dependencies = new Set(Object.keys(pkg.dependencies ?? {}))
  const devDependencies = new Set(Object.keys(pkg.devDependencies ?? {}))
  const all = new Set<string>()
  for (const d of dependencies) all.add(d)
  for (const d of devDependencies) all.add(d)
  return { dependencies, devDependencies, all }
}

export function indexWorkspacesByName(
  workspaces: readonly WorkspaceInfo[]
): Map<string, WorkspaceInfo> {
  const byName = new Map<string, WorkspaceInfo>()
  for (const ws of workspaces) {
    if (ws.name !== "") byName.set(ws.name, ws)
  }
  return byName
}

export function computeTransitiveClosure(
  workspaces: readonly WorkspaceInfo[]
): Map<string, Set<string>> {
  const byName = indexWorkspacesByName(workspaces)
  const closure = new Map<string, Set<string>>()

  function visit(wsRoot: string, acc: Set<string>): undefined {
    if (acc.has(wsRoot)) return
    acc.add(wsRoot)
    const ws = workspaces.find((w) => w.root === wsRoot)
    if (!ws) return
    const { all } = declaredDepsOf(ws.pkg)
    for (const depName of all) {
      const target = byName.get(depName)
      if (target) visit(target.root, acc)
    }
  }

  for (const ws of workspaces) {
    const acc = new Set<string>()
    visit(ws.root, acc)
    closure.set(ws.root, acc)
  }

  return closure
}

function splitShellSubcommands(cmd: string): readonly string[] {
  const out: string[] = []
  let current = ""
  let i = 0
  while (i < cmd.length) {
    const c = cmd[i]
    const n = cmd[i + 1]
    if ((c === "&" && n === "&") || (c === "|" && n === "|")) {
      if (current.trim() !== "") out.push(current.trim())
      current = ""
      i += 2
      continue
    }
    if (c === ";" || c === "|") {
      if (current.trim() !== "") out.push(current.trim())
      current = ""
      i++
      continue
    }
    current += c
    i++
  }
  if (current.trim() !== "") out.push(current.trim())
  return out
}

function firstCommandToken(cmd: string): string | null {
  const trimmed = cmd.trim()
  if (trimmed === "") return null
  const tokens = trimmed.split(/\s+/)
  let i = 0
  while (i < tokens.length) {
    const t = tokens[i]
    if (t === undefined) break
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(t)) {
      i++
      continue
    }
    break
  }
  if (i >= tokens.length) return null
  let t = tokens[i]
  if (t === undefined) return null
  if (t.includes("/")) {
    const parts = t.split("/")
    t = parts[parts.length - 1] ?? t
  }
  if (t === "") return null
  return t
}

export function commandNamesFromScript(script: string): readonly string[] {
  const out: string[] = []
  for (const sub of splitShellSubcommands(script)) {
    const first = firstCommandToken(sub)
    if (first == null) continue
    out.push(first)
    const trimmed = sub.trim()
    const tokens = trimmed.split(/\s+/)
    let idx = 0
    while (idx < tokens.length) {
      const tok = tokens[idx]
      if (tok === undefined || !/^[A-Za-z_][A-Za-z0-9_]*=/.test(tok)) break
      idx++
    }
    if (idx >= tokens.length) continue
    const cmd = tokens[idx]
    if (cmd === undefined) continue
    const base = cmd.includes("/") ? cmd.split("/").pop() : cmd
    if (base === "bunx" || base === "npx") {
      const next = tokens[idx + 1]
      if (next != null && !next.startsWith("-")) {
        out.push(stripVersionSuffix(next))
      }
    } else if (base === "bun" || base === "npm" || base === "yarn" || base === "pnpm") {
      const sub1 = tokens[idx + 1]
      const sub2 = tokens[idx + 2]
      if ((sub1 === "x" || sub1 === "run") && sub2 != null && !sub2.startsWith("-")) {
        if (sub1 === "x") {
          out.push(stripVersionSuffix(sub2))
        }
      }
    }
  }
  return out
}

function stripVersionSuffix(name: string): string {
  if (name.startsWith("@")) {
    const at = name.indexOf("@", 1)
    if (at > 0) return name.slice(0, at)
    return name
  }
  const at = name.indexOf("@")
  return at === -1 ? name : name.slice(0, at)
}
