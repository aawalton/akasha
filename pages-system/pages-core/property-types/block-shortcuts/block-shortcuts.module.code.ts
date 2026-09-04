import type {
  HeadingLevel,
  V1BlockType,
} from "../rich-document-ops/rich-document-ops.module.code.ts"

export interface ShortcutMods {
  readonly code: string
  readonly key: string
  readonly meta: boolean
  readonly ctrl: boolean
  readonly shift: boolean
  readonly alt: boolean
}

export type BlockShortcut =
  | { kind: "turnInto"; type: V1BlockType; level?: HeadingLevel }
  | { kind: "move"; direction: "up" | "down" }
  | { kind: "duplicate" }

const TURN_INTO_BY_CODE: Readonly<Record<string, BlockShortcut>> = {
  Digit0: { kind: "turnInto", type: "paragraph" },
  Digit1: { kind: "turnInto", type: "heading", level: 1 },
  Digit2: { kind: "turnInto", type: "heading", level: 2 },
  Digit3: { kind: "turnInto", type: "heading", level: 3 },
  Digit4: { kind: "turnInto", type: "to-do" },
  Digit5: { kind: "turnInto", type: "bulleted-list-item" },
  Digit6: { kind: "turnInto", type: "numbered-list-item" },
  Digit8: { kind: "turnInto", type: "code" },
}

export function matchBlockShortcut(m: ShortcutMods): BlockShortcut | null {
  const mod = m.meta || m.ctrl
  if (!mod) return null

  if ((m.meta && m.alt) || (m.ctrl && m.shift)) {
    const turnInto = TURN_INTO_BY_CODE[m.code]
    if (turnInto !== undefined) return turnInto
  }

  if (m.shift && !m.alt) {
    if (m.key === "ArrowUp") return { kind: "move", direction: "up" }
    if (m.key === "ArrowDown") return { kind: "move", direction: "down" }
  }

  if (!m.shift && !m.alt && m.code === "KeyD") return { kind: "duplicate" }

  return null
}

export type DocumentExtreme = "start" | "end"

export function matchDocumentExtreme(m: ShortcutMods): DocumentExtreme | null {
  if (m.shift || m.alt) return null
  if (m.meta && !m.ctrl) {
    if (m.key === "ArrowUp") return "start"
    if (m.key === "ArrowDown") return "end"
  }
  if (m.ctrl && !m.meta) {
    if (m.key === "Home") return "start"
    if (m.key === "End") return "end"
  }
  return null
}
