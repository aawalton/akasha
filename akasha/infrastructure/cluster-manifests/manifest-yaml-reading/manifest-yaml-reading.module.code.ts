import { z } from "zod"

export interface ManifestDocument {
  readonly kind: string
  readonly namespace?: string
}

export function parseManifestDocuments(content: string): readonly ManifestDocument[] {
  const results: ManifestDocument[] = []

  for (const doc of content.split(/^---$/m)) {
    let kind = ""
    let namespace = ""
    let inMetadata = false

    for (const line of doc.split("\n")) {
      if (/^\s*#/.test(line) || /^\s*$/.test(line)) continue

      if (/^kind:\s*(.+)/.test(line)) {
        kind = line.replace(/^kind:\s*/, "").trim()
        continue
      }

      if (/^metadata:/.test(line)) {
        inMetadata = true
        continue
      }

      if (inMetadata && /^\S/.test(line)) {
        inMetadata = false
        continue
      }

      if (inMetadata && /^\s+namespace:\s*(.+)/.test(line)) {
        namespace = line.replace(/^\s+namespace:\s*/, "").trim()
      }
    }

    if (kind !== "") {
      results.push({ kind, namespace: namespace !== "" ? namespace : undefined })
    }
  }
  return results
}

export interface KindFinding {
  readonly synthSource: string
  readonly kind: string
}

export function extractResourceKinds(synthSource: string, yaml: string): readonly KindFinding[] {
  const findings: KindFinding[] = []
  for (const doc of yaml.split(/^---$/m)) {
    let kind = ""
    for (const line of doc.split("\n")) {
      if (/^kind:(?:\s|$)/.test(line)) {
        kind = line.slice("kind:".length).trim()
        break
      }
    }
    if (kind !== "") findings.push({ synthSource, kind })
  }
  return findings
}

const ClusterKindSchema = z.enum(["ClusterRole", "ClusterRoleBinding"])

export type ClusterRbacKind = z.infer<typeof ClusterKindSchema>

export interface ClusterResourceName {
  readonly synthSource: string
  readonly kind: ClusterRbacKind
  readonly name: string
}

export function extractClusterResourceNames(
  synthSource: string,
  yaml: string
): readonly ClusterResourceName[] {
  const findings: ClusterResourceName[] = []
  for (const doc of yaml.split(/^---$/m)) {
    let kind = ""
    let name = ""
    let inMetadata = false
    for (const line of doc.split("\n")) {
      if (/^\s*#/.test(line) || /^\s*$/.test(line)) continue
      if (/^kind:(?:\s|$)/.test(line)) {
        kind = line.slice("kind:".length).trim()
        continue
      }
      if (/^metadata:\s*$/.test(line)) {
        inMetadata = true
        continue
      }
      if (inMetadata && /^\S/.test(line)) {
        inMetadata = false
        continue
      }
      if (inMetadata) {
        const trimmed = line.trimStart()
        if (/^name:(?:\s|$)/.test(trimmed)) {
          name = trimmed.slice("name:".length).trim()
        }
      }
    }
    if (name === "") continue
    const parsedKind = ClusterKindSchema.safeParse(kind)
    if (!parsedKind.success) continue
    findings.push({ synthSource, kind: parsedKind.data, name })
  }
  return findings
}
