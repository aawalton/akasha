export interface UsageInputs {
  readonly yamlPaths: readonly string[]
  readonly sources: readonly SourceFile[]
}

export interface SourceFile {
  readonly path: string
  readonly content: string
}

export interface OrphanReport {
  readonly path: string
}

export type UseReason =
  | { kind: "direct-path"; sourcePath: string }
  | { kind: "split-path"; sourcePath: string }
  | { kind: "directory-ref"; sourcePath: string; dir: string }
  | { kind: "sops-config" }
  | { kind: "ast-grep-config" }
  | { kind: "ast-grep-rule"; sgconfig: string }

type CommentSyntax = "c-like" | "c-block-only" | "hash"

const COMMENT_SYNTAX_BY_EXTENSION: Readonly<Record<string, CommentSyntax>> = {
  ".ts": "c-like",
  ".tsx": "c-like",
  ".json": "c-like",
  ".css": "c-block-only",
  ".sh": "hash",
  ".bash": "hash",
}

function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1)
  const idx = base.lastIndexOf(".")
  return idx <= 0 ? "" : base.slice(idx)
}

function stripCLike(content: string, lineComments: boolean): string {
  const out: string[] = []
  let spanStart = 0
  let i = 0
  const n = content.length
  while (i < n) {
    const c = content[i] ?? ""
    if (c === '"' || c === "'" || c === "`") {
      i += 1
      while (i < n) {
        const d = content[i] ?? ""
        i += 1
        if (d === "\\") {
          if (i < n) i += 1
          continue
        }
        if (d === c) break
        if (c !== "`" && d === "\n") break
      }
      continue
    }
    if (lineComments && c === "/" && content[i + 1] === "/") {
      out.push(content.slice(spanStart, i), " ")
      while (i < n && content[i] !== "\n") i += 1
      spanStart = i
      continue
    }
    if (c === "/" && content[i + 1] === "*") {
      out.push(content.slice(spanStart, i), " ")
      i += 2
      while (i < n && !(content[i] === "*" && content[i + 1] === "/")) i += 1
      i += 2
      spanStart = i
      continue
    }
    i += 1
  }
  out.push(content.slice(spanStart))
  return out.join("")
}

const SHELL_WORD_BOUNDARY = new Set(["\n", " ", "\t", ";", "(", ")", "&", "|"])

function stripHash(content: string): string {
  const out: string[] = []
  let spanStart = 0
  let i = 0
  const n = content.length
  let atWordStart = true
  while (i < n) {
    const c = content[i] ?? ""
    if (c === '"' || c === "'") {
      i += 1
      while (i < n) {
        const d = content[i] ?? ""
        i += 1
        if (c === '"' && d === "\\") {
          if (i < n) i += 1
          continue
        }
        if (d === c) break
      }
      atWordStart = false
      continue
    }
    if (c === "#" && atWordStart) {
      out.push(content.slice(spanStart, i), " ")
      while (i < n && content[i] !== "\n") i += 1
      spanStart = i
      continue
    }
    atWordStart = SHELL_WORD_BOUNDARY.has(c)
    i += 1
  }
  out.push(content.slice(spanStart))
  return out.join("")
}

export function stripComments(path: string, content: string): string {
  const syntax = COMMENT_SYNTAX_BY_EXTENSION[extensionOf(path)]
  if (syntax === undefined)
    throw new Error(
      `no comment syntax declared for ${path} — its prose would credit a yaml, so the run cannot say what it examined`
    )
  if (syntax === "hash") return stripHash(content)
  return stripCLike(content, syntax === "c-like")
}

function parentDirOf(path: string): string {
  const idx = path.lastIndexOf("/")
  return idx === -1 ? "" : path.slice(0, idx)
}

function basenameOf(path: string): string {
  const idx = path.lastIndexOf("/")
  return idx === -1 ? path : path.slice(idx + 1)
}

function containsDirectoryRef(content: string, dir: string): boolean {
  const needle = `${dir}/`
  let i = 0
  while (true) {
    const idx = content.indexOf(needle, i)
    if (idx === -1) return false
    const after = content[idx + needle.length] ?? ""
    if (after === "" || /['"`)\]},;\s]/.test(after)) return true
    i = idx + 1
  }
}

function isAstGrepRule(yamlPath: string, yamlPaths: readonly string[]): string | null {
  const parts = yamlPath.split("/")
  const rulesIdx = parts.lastIndexOf("rules")
  if (rulesIdx === -1 || rulesIdx === 0) return null
  if (rulesIdx !== parts.length - 2) return null
  const parent = parts.slice(0, rulesIdx).join("/")
  const sgconfigCandidates = [
    parent !== "" ? `${parent}/sgconfig.yml` : "sgconfig.yml",
    parent !== "" ? `${parent}/sgconfig.yaml` : "sgconfig.yaml",
  ]
  for (const c of sgconfigCandidates) {
    if (yamlPaths.includes(c)) return c
  }
  return null
}

export function classify(
  yamlPath: string,
  sources: readonly SourceFile[],
  yamlPaths: readonly string[]
): UseReason | null {
  const base = basenameOf(yamlPath)

  if (base === ".sops.yaml") return { kind: "sops-config" }
  if (base === "sgconfig.yml" || base === "sgconfig.yaml") return { kind: "ast-grep-config" }
  const sgconfig = isAstGrepRule(yamlPath, yamlPaths)
  if (sgconfig !== null) return { kind: "ast-grep-rule", sgconfig }

  for (const src of sources) {
    if (src.content.includes(yamlPath)) return { kind: "direct-path", sourcePath: src.path }
  }

  const dir = parentDirOf(yamlPath)
  if (dir.length > 0) {
    const baseRef = `/${base}`
    for (const src of sources) {
      if (src.content.includes(dir) && src.content.includes(baseRef))
        return { kind: "split-path", sourcePath: src.path }
    }
    for (const src of sources) {
      if (containsDirectoryRef(src.content, dir))
        return { kind: "directory-ref", sourcePath: src.path, dir }
    }
  }

  return null
}

export function findOrphans(input: UsageInputs): readonly OrphanReport[] {
  const code = input.sources.map((s) => ({
    path: s.path,
    content: stripComments(s.path, s.content),
  }))
  const orphans: OrphanReport[] = []
  for (const yamlPath of input.yamlPaths) {
    const reason = classify(yamlPath, code, input.yamlPaths)
    if (reason === null) orphans.push({ path: yamlPath })
  }
  return orphans.sort((a, b) => a.path.localeCompare(b.path))
}
