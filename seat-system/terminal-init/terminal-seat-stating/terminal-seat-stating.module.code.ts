import { SEAT_MODE_INTERACTIVE } from "../../seat-launching/seat-launching.module.code.ts"

// The path to the seat call is spelled here as a string rather than imported, because importing
// the seat call from a shell composer would pull the whole writer in to reach one constant.
export const SEAT_COMMAND_REL = "seat-system/seat-call/seat-call.module.code.ts"

const STATED_ATTRIBUTES = ["persona", "domain", "role"] as const

// The payload key the seat call answers a read under rather than stating anything.
const WHOAMI = "whoami"

export const INTERACTIVE_PRINCIPAL = "alan"

export function payloadEscapeLines(varPrefix: string): readonly string[] {
  return [
    `  _${varPrefix}_json_escape() {`,
    '    local _s="$1"',
    `    _s=\${_s//\\\\/\\\\\\\\}`,
    `    _${varPrefix}_json=\${_s//\\"/\\\\\\"}`,
    "  }",
  ]
}

export function resolveTokensLines(varPrefix: string): readonly string[] {
  return [
    `    local _${varPrefix}_tokens="" _${varPrefix}_token _${varPrefix}_json=""`,
    `    for _${varPrefix}_token in "\${@:2}"; do`,
    `      _${varPrefix}_json_escape "$_${varPrefix}_token"`,
    `      _${varPrefix}_tokens="$_${varPrefix}_tokens\${_${varPrefix}_tokens:+,}\\"$_${varPrefix}_json\\""`,
    "    done",
    `    _${varPrefix}_sorted=$(printf '%s' "{\\"resolve\\":true,\\"token\\":[$_${varPrefix}_tokens]}" ` +
      `| bun "$_root/${SEAT_COMMAND_REL}") || {`,
  ]
}

function stateAttributeLines(varPrefix: string): readonly string[] {
  const pairs = STATED_ATTRIBUTES.map(
    (attribute) => `"${attribute}:$_${varPrefix}_${attribute}"`
  ).join(" ")
  return [
    `  if [ -n "$full_aid" ] && [ -f "$_root/${SEAT_COMMAND_REL}" ]; then`,
    `    local _${varPrefix}_named="" _${varPrefix}_pair _${varPrefix}_attribute ` +
      `_${varPrefix}_slug _${varPrefix}_json="" _${varPrefix}_agent="" _${varPrefix}_body=""`,
    `    _${varPrefix}_json_escape "$full_aid"`,
    `    _${varPrefix}_agent="$_${varPrefix}_json"`,
    `    local _${varPrefix}_answering=""`,
    `    for _${varPrefix}_pair in ${pairs}; do`,
    `      _${varPrefix}_attribute="\${_${varPrefix}_pair%%:*}"`,
    `      _${varPrefix}_slug="\${_${varPrefix}_pair#*:}"`,
    `      case "$_${varPrefix}_slug" in ""|null) continue ;; esac`,
    `      case "$_${varPrefix}_attribute" in`,
    `        persona) [ "$_${varPrefix}_handler" = 1 ] || ` +
      `_${varPrefix}_answering=",\\"principal\\":\\"${INTERACTIVE_PRINCIPAL}\\"" ;;`,
    "      esac",
    `      _${varPrefix}_json_escape "$_${varPrefix}_slug"`,
    `      _${varPrefix}_body="$_${varPrefix}_body,` +
      `\\"$_${varPrefix}_attribute\\":\\"$_${varPrefix}_json\\""`,
    `      _${varPrefix}_named="$_${varPrefix}_named\${_${varPrefix}_named:+, }` +
      `$_${varPrefix}_attribute '$_${varPrefix}_slug'"`,
    "    done",
    `    if [ -n "$_${varPrefix}_body" ]; then`,
    `      printf '%s' "{\\"agent\\":\\"$_${varPrefix}_agent\\"` +
      `$_${varPrefix}_body$_${varPrefix}_answering}" | ` +
      `bun "$_root/${SEAT_COMMAND_REL}" >/dev/null 2>&1 || ` +
      `echo "${varPrefix}: seat not stated — $_${varPrefix}_named: no document under ` +
      `$_root, or the seat command failed. The gate is unarmed for this seat." >&2`,
    "    fi",
    `    printf '%s' "{\\"agent\\":\\"$_${varPrefix}_agent\\",\\"default\\":true,` +
      `\\"mode\\":\\"${SEAT_MODE_INTERACTIVE}\\"}" | ` +
      `bun "$_root/${SEAT_COMMAND_REL}" ` +
      `>/dev/null 2>&1 || echo "${varPrefix}: no default or mode recorded — the seat ` +
      `holds no mode, so it returns decisions it would otherwise put to you." >&2`,
    "  fi",
  ]
}

export function stateSeatFromRowLines(varPrefix: string): readonly string[] {
  const attributes = STATED_ATTRIBUTES.map((attribute) => `_${varPrefix}_${attribute}=""`).join(" ")
  return [
    `  local _${varPrefix}_stated="" _${varPrefix}_json="" ${attributes}`,
    `  if [ -n "$full_aid" ] && [ -f "$_root/${SEAT_COMMAND_REL}" ]; then`,
    `    _${varPrefix}_json_escape "$full_aid"`,
    `    _${varPrefix}_stated=$(printf '%s' ` +
      `"{\\"agent\\":\\"$_${varPrefix}_json\\",\\"${WHOAMI}\\":true}" | ` +
      `bun "$_root/${SEAT_COMMAND_REL}" 2>/dev/null)`,
    ...STATED_ATTRIBUTES.map(
      (attribute) =>
        `    _${varPrefix}_${attribute}=$(printf '%s\\n' "$_${varPrefix}_stated" | ` +
        `sed -n 's/^${attribute}=//p')`
    ),
    "  fi",
    ...stateAttributeLines(varPrefix),
  ]
}

export function spelledSeatNameLines(varPrefix: string): readonly string[] {
  return [
    `  local _${varPrefix}_seat="$name" _${varPrefix}_spelled="" _${varPrefix}_json=""`,
    `  if [ "$_${varPrefix}_handler" != 1 ]; then`,
    `    _${varPrefix}_json_escape "$name"`,
    `    local _${varPrefix}_named="{\\"name\\":true,\\"principal\\":\\"${INTERACTIVE_PRINCIPAL}\\",` +
      `\\"persona\\":\\"$_${varPrefix}_json\\""`,
    `    [ -n "$_${varPrefix}_typed_role" ] && _${varPrefix}_json_escape ` +
      `"$_${varPrefix}_typed_role" && ` +
      `_${varPrefix}_named="$_${varPrefix}_named,\\"role\\":\\"$_${varPrefix}_json\\""`,
    `    [ -n "$_${varPrefix}_typed_domain" ] && _${varPrefix}_json_escape ` +
      `"$_${varPrefix}_typed_domain" && ` +
      `_${varPrefix}_named="$_${varPrefix}_named,\\"domain\\":\\"$_${varPrefix}_json\\""`,
    `    _${varPrefix}_named="$_${varPrefix}_named}"`,
    `    [ -f "$_root/${SEAT_COMMAND_REL}" ] && _${varPrefix}_spelled=$(printf '%s' ` +
      `"$_${varPrefix}_named" | bun "$_root/${SEAT_COMMAND_REL}" 2>/dev/null)`,
    `    if [ -n "$_${varPrefix}_spelled" ]; then`,
    `      _${varPrefix}_seat="$_${varPrefix}_spelled"`,
    `    elif [ -n "$_${varPrefix}_typed_role" ]; then`,
    `      echo "${varPrefix}: $_root/${SEAT_COMMAND_REL} spelled no name, so ` +
      `'$_${varPrefix}_typed_role' is not in the seat name — seating $name." >&2`,
    "    fi",
    "  fi",
  ]
}
