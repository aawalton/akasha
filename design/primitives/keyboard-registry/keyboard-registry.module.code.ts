export type OS = "mac" | "other"

export type KeyLayer = "reserved" | "conventional" | "house"

export interface ParsedChord {
  key: string
  mod: boolean
  ctrl: boolean
  meta: boolean
  alt: boolean
  shift: boolean
}

export interface KeyBinding {
  id: string
  chord: string
  label: string
  onTrigger: () => void
  scope?: string
  enabled?: boolean
  allowInTextInput?: boolean
  preventDefault?: boolean
  group?: string
  layer?: KeyLayer
}

export const PALETTE_ONLY = ""

export interface KeyEventFacts {
  key: string
  code: string
  metaKey: boolean
  ctrlKey: boolean
  altKey: boolean
  shiftKey: boolean
  inTextInput: boolean
}

export interface MatchContext {
  os: OS
  shortcutsEnabled: boolean
  activeScopes: ReadonlySet<string>
}

export interface KeyBindingDescriptor {
  id: string
  label: string
  chord: ParsedChord
  display: string
  group?: string
  layer?: KeyLayer
  scope?: string
}

export function resolveMod(os: OS): "meta" | "ctrl" {
  return os === "mac" ? "meta" : "ctrl"
}

const MODIFIER_ALIASES: Record<string, "mod" | "ctrl" | "meta" | "alt" | "shift"> = {
  mod: "mod",
  ctrl: "ctrl",
  control: "ctrl",
  cmd: "meta",
  command: "meta",
  meta: "meta",
  super: "meta",
  win: "meta",
  alt: "alt",
  opt: "alt",
  option: "alt",
  shift: "shift",
}

export function parseChord(chord: string): ParsedChord {
  const parsed: ParsedChord = {
    key: "",
    mod: false,
    ctrl: false,
    meta: false,
    alt: false,
    shift: false,
  }
  for (const token of chord.split("+")) {
    const normalized = token.trim().toLowerCase()
    if (normalized.length === 0) continue
    const modifier = MODIFIER_ALIASES[normalized]
    if (modifier === undefined) {
      parsed.key = normalized
    } else {
      parsed[modifier] = true
    }
  }
  return parsed
}

function isShiftSensitive(key: string): boolean {
  return !(key.length === 1 && !/[a-z0-9]/.test(key))
}

function keyMatches(key: string, event: KeyEventFacts): boolean {
  if (/^[a-z]$/.test(key)) return event.code === `Key${key.toUpperCase()}`
  if (/^[0-9]$/.test(key)) return event.code === `Digit${key}`
  return event.key.toLowerCase() === key
}

export function isCharacterKeyChord(chord: ParsedChord): boolean {
  return !chord.mod && !chord.ctrl && !chord.meta && !chord.alt
}

export function matchesChord(parsed: ParsedChord, event: KeyEventFacts, os: OS): boolean {
  const wantMeta = parsed.meta || (parsed.mod && resolveMod(os) === "meta")
  const wantCtrl = parsed.ctrl || (parsed.mod && resolveMod(os) === "ctrl")
  if (event.metaKey !== wantMeta) return false
  if (event.ctrlKey !== wantCtrl) return false
  if (event.altKey !== parsed.alt) return false
  if (isShiftSensitive(parsed.key) && event.shiftKey !== parsed.shift) return false
  return keyMatches(parsed.key, event)
}

export function matchBindings(
  event: KeyEventFacts,
  bindings: readonly KeyBinding[],
  ctx: MatchContext
): readonly KeyBinding[] {
  return bindings.filter((binding) => {
    if (binding.enabled === false) return false
    if (event.inTextInput && binding.allowInTextInput !== true) return false
    if (binding.scope != null && !ctx.activeScopes.has(binding.scope)) return false
    const parsed = parseChord(binding.chord)
    if (!ctx.shortcutsEnabled && isCharacterKeyChord(parsed)) return false
    return matchesChord(parsed, event, ctx.os)
  })
}

export function selectBindingsById(
  id: string,
  bindings: readonly KeyBinding[]
): readonly KeyBinding[] {
  return bindings.filter((binding) => binding.id === id && binding.enabled !== false)
}

function formatKeyLabel(key: string): string {
  if (key.length === 0) return ""
  if (key.length === 1) return key.toUpperCase()
  return key.charAt(0).toUpperCase() + key.slice(1)
}

export function formatChord(parsed: ParsedChord, os: OS): string {
  const wantMeta = parsed.meta || (parsed.mod && resolveMod(os) === "meta")
  const wantCtrl = parsed.ctrl || (parsed.mod && resolveMod(os) === "ctrl")
  const keyLabel = formatKeyLabel(parsed.key)
  if (os === "mac") {
    let glyphs = ""
    if (wantCtrl) glyphs += "⌃"
    if (parsed.alt) glyphs += "⌥"
    if (parsed.shift) glyphs += "⇧"
    if (wantMeta) glyphs += "⌘"
    return glyphs + keyLabel
  }
  const parts: string[] = []
  if (wantCtrl) parts.push("Ctrl")
  if (wantMeta) parts.push("Meta")
  if (parsed.alt) parts.push("Alt")
  if (parsed.shift) parts.push("Shift")
  parts.push(keyLabel)
  return parts.join("+")
}
