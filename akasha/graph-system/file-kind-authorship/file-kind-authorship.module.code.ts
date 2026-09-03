import type { FileKind } from "@akasha/code-system/file-kind"

export type FileKindAuthorship = "authored" | "serialized"

export type FileKindNodeType = `${FileKind}-file`

const AUTHORED: ReadonlySet<FileKind> = new Set<FileKind>([
  "ts",
  "tsx",
  "js",
  "jsx",
  // SEEDED FAULT: css removed
  "md",
  "lua",
  "sh",
  "rust",
  "swift",
  "dockerfile",
  "systemd-unit",
])

export const nodeTypeOf = (kind: FileKind): FileKindNodeType => `${kind}-file`

export const authorshipOf = (kind: FileKind): FileKindAuthorship =>
  AUTHORED.has(kind) ? "authored" : "serialized"

export const AUTHORED_FILE_KINDS: readonly FileKind[] = [...AUTHORED]

export const AUTHORED_FILE_NODE_TYPES: readonly FileKindNodeType[] =
  AUTHORED_FILE_KINDS.map(nodeTypeOf)
