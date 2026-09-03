import { blankComments, type CommentSyntax } from "../blank-comments/blank-comments.module.code.ts"
import {
  type ChecksumSubstitutionSite,
  pairingScope,
  unmatchedEmits,
} from "../checksum-annotation-pairing/checksum-annotation-pairing.module.code.ts"
import type { Violation } from "../violation-reporting/violation-reporting.module.code.ts"

export const CHECKSUM_ANNOTATION_MARKER = "checksum/"

const OWN_PACKAGE_PREFIX = "infra/cluster-checks/"

const TS_PATH_RE = /\.[cm]?tsx?$/
const SHELL_PATH_RE = /\.(?:sh|bash)$/
const TEST_PATH_RE = /\.(?:test|spec)\.[cm]?tsx?$/

const EMIT_RE = /(["'])(checksum\/[A-Za-z0-9][A-Za-z0-9._-]*)\1\s*:\s*["']/g

const SUBSTITUTION_KEY_RE = /(?<![A-Za-z0-9._/-])(checksum\/[A-Za-z0-9][A-Za-z0-9._-]*):/g

const SED_WORD_RE = /\bsed\b/

const SEAM_MANIFEST_RE = /packages\/[A-Za-z0-9._@/-]+\.(?:ya?ml|[cm]?tsx?)/g

const SEAM_PATH_CONST_RE = /const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"(packages\/[^"]+)"/g

const SEAM_INTERPOLATION_RE = /\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g

export interface ChecksumAnnotationScanFile {
  readonly path: string
  readonly content: string
}

export interface ChecksumAnnotationEmit {
  readonly key: string
  readonly file: string
  readonly line: number
}

export interface ChecksumAnnotationViolation extends Violation {
  readonly kind: "checksum-annotation-unsubstituted"
  readonly key: string
  readonly file: string
  readonly line: number
  readonly message: string
}

function syntaxOf(path: string): CommentSyntax | null {
  if (TEST_PATH_RE.test(path)) return null
  if (path.startsWith(OWN_PACKAGE_PREFIX)) return null
  if (TS_PATH_RE.test(path)) return "ts"
  if (SHELL_PATH_RE.test(path)) return "shell"
  return null
}

export function isChecksumScanPath(path: string): boolean {
  return syntaxOf(path) !== null
}

function lineAt(source: string, index: number): number {
  let line = 1
  for (let i = 0; i < index; i++) if (source.charAt(i) === "\n") line++
  return line
}

export function findChecksumAnnotationEmits(
  files: readonly ChecksumAnnotationScanFile[]
): readonly ChecksumAnnotationEmit[] {
  const emits: ChecksumAnnotationEmit[] = []
  for (const file of files) {
    if (syntaxOf(file.path) !== "ts") continue
    if (!file.content.includes(CHECKSUM_ANNOTATION_MARKER)) continue
    const code = blankComments(file.content, "ts")
    for (const match of code.matchAll(EMIT_RE)) {
      const key = match[2]
      if (key === undefined) continue
      emits.push({ key, file: file.path, line: lineAt(code, match.index) })
    }
  }
  return emits
}

export function checksumKeysSubstitutedIn(line: string): readonly string[] {
  if (!SED_WORD_RE.test(line)) return []
  const keys: string[] = []
  for (const match of line.matchAll(SUBSTITUTION_KEY_RE)) {
    const key = match[1]
    if (key !== undefined) keys.push(key)
  }
  return keys
}

export interface SeamSubstitutionSite {
  readonly key: string
  readonly file: string
  readonly line: number
  readonly declaredIn: string
}

export interface SeamSubstitutionCensus {
  readonly sites: readonly SeamSubstitutionSite[]
  readonly unanchored: readonly SeamSubstitutionSite[]
}

function expandPathConsts(line: string, consts: ReadonlyMap<string, string>): string {
  return line.replace(SEAM_INTERPOLATION_RE, (whole, name: string) => consts.get(name) ?? whole)
}

export function findSeamSubstitutionSites(
  files: readonly ChecksumAnnotationScanFile[]
): SeamSubstitutionCensus {
  const sites: SeamSubstitutionSite[] = []
  const unanchored: SeamSubstitutionSite[] = []
  for (const file of files) {
    if (!file.content.includes(CHECKSUM_ANNOTATION_MARKER)) continue
    const consts = new Map<string, string>()
    for (const match of file.content.matchAll(SEAM_PATH_CONST_RE)) {
      const name = match[1]
      const value = match[2]
      if (name !== undefined && value !== undefined) consts.set(name, value)
    }
    let stamped: string | null = null
    for (const [index, raw] of blankComments(file.content, "ts").split("\n").entries()) {
      const line = expandPathConsts(raw, consts)
      const named = [...line.matchAll(SEAM_MANIFEST_RE)].map((match) => match[0])
      const here = named[named.length - 1]
      if (here !== undefined) stamped = here
      for (const key of new Set(checksumKeysSubstitutedIn(line))) {
        const found = { key, file: stamped ?? file.path, line: index + 1, declaredIn: file.path }
        if (stamped === null) unanchored.push(found)
        else sites.push(found)
      }
    }
  }
  return { sites, unanchored }
}

function findChecksumSubstitutionSites(
  files: readonly ChecksumAnnotationScanFile[],
  packageRoots: readonly string[],
  seam: readonly SeamSubstitutionSite[]
): ReadonlyMap<string, ReadonlyMap<string, readonly ChecksumSubstitutionSite[]>> {
  const byScope = new Map<string, Map<string, ChecksumSubstitutionSite[]>>()
  for (const file of files) {
    const syntax = syntaxOf(file.path)
    if (syntax === null) continue
    if (!file.content.includes(CHECKSUM_ANNOTATION_MARKER)) continue
    const scope = pairingScope(file.path, packageRoots)
    const byKey = byScope.get(scope) ?? new Map<string, ChecksumSubstitutionSite[]>()
    byScope.set(scope, byKey)
    const lines = blankComments(file.content, syntax).split("\n")
    for (const [index, line] of lines.entries()) {
      for (const key of new Set(checksumKeysSubstitutedIn(line))) {
        const sites = byKey.get(key) ?? []
        sites.push({ file: file.path, line: index + 1 })
        byKey.set(key, sites)
      }
    }
  }
  for (const site of seam) {
    const scope = pairingScope(site.file, packageRoots)
    const byKey = byScope.get(scope) ?? new Map<string, ChecksumSubstitutionSite[]>()
    byScope.set(scope, byKey)
    byKey.set(site.key, [...(byKey.get(site.key) ?? []), { file: site.file, line: site.line }])
  }
  return byScope
}

function substitutionRecipe(key: string): string {
  return `\`sed "s|${key}:.*|${key}: \\"\${HASH}\\"|" <manifest> | kubectl apply -f -\``
}

function unsubstitutedMessage(key: string, scope: string): string {
  return (
    `\`${key}\` is emitted as a constant pod-template annotation, and nothing in ` +
    `\`${scope}\` — the package that emits it — substitutes ` +
    `that key at apply time. A constant annotation never changes, so it can ` +
    `never change the pod template, so it can never roll the workload — the config it exists ` +
    `to track can rotate with no effect and no signal. Either stamp it in the owning apply ` +
    `step (${substitutionRecipe(key)}) ` +
    `or delete the annotation, which at least does not claim the case is handled.`
  )
}

function pooledMessage(key: string, scope: string, emits: number, sites: number): string {
  return (
    `\`${key}\` is emitted as a constant pod-template annotation in \`${scope}\`, which holds ` +
    `${emits} such emits of that key against ${sites} substitution site(s) — so at least ` +
    `${emits - sites} workload here has its annotation rewritten by a sibling's apply step ` +
    `rather than its own, or by nothing at all. A sibling's sed rewrites a sibling's manifest, ` +
    `so this workload's annotation never changes, it never rolls, and the config it exists to ` +
    `track can rotate with no effect and no signal. Give every emit a substitution site of its ` +
    `own in the step that applies its own manifest (${substitutionRecipe(key)}), or delete the ` +
    `annotations that are not being stamped. One package pools these ${emits} emits, so this ` +
    `line is where the count ran out rather than the one workload known to be uncovered.`
  )
}

export function scanChecksumAnnotationSubstitution(
  files: readonly ChecksumAnnotationScanFile[],
  packageRoots: readonly string[],
  seam: readonly SeamSubstitutionSite[] = []
): readonly ChecksumAnnotationViolation[] {
  const sitesByScope = findChecksumSubstitutionSites(files, packageRoots, seam)
  const emits = findChecksumAnnotationEmits(files)

  const groups = new Map<string, ChecksumAnnotationEmit[]>()
  for (const emit of emits) {
    const id = `${pairingScope(emit.file, packageRoots)}\u0000${emit.key}`
    groups.set(id, [...(groups.get(id) ?? []), emit])
  }

  const flagged = new Map<ChecksumAnnotationEmit, string>()
  for (const group of groups.values()) {
    const first = group[0]
    if (first === undefined) continue
    const scope = pairingScope(first.file, packageRoots)
    const sites = sitesByScope.get(scope)?.get(first.key) ?? []
    const message =
      sites.length === 0
        ? unsubstitutedMessage(first.key, scope)
        : pooledMessage(first.key, scope, group.length, sites.length)
    for (const emit of unmatchedEmits(group, sites, scope)) flagged.set(emit, message)
  }

  return emits
    .filter((emit) => flagged.has(emit))
    .map((emit) => ({
      kind: "checksum-annotation-unsubstituted" as const,
      key: emit.key,
      file: emit.file,
      line: emit.line,
      message: flagged.get(emit) ?? "",
    }))
}
