export interface SendAttachment {
  readonly fileB64: string
  readonly filename: string
}

export const SENT_TEXT = "IMESSAGE_SENT_TEXT"

export const SENT_PICTURE = "IMESSAGE_SENT_PICTURE"

const SAID: Readonly<Record<string, string>> = {
  [SENT_TEXT]: "the text was handed to Messages",
  [SENT_PICTURE]: "the picture was handed to Messages",
}

export function sentSaid(line: string): string | null {
  return SAID[line.trim()] ?? null
}

function decoded(name: string, value: string): string {
  const held = Buffer.from(value, "utf8").toString("base64")
  return `${name}="$(printf %s '${held}' | base64 -D 2>/dev/null || printf %s '${held}' | base64 -d)"`
}

function sending(said: string, what: string, marker: string): readonly string[] {
  return [
    `/usr/bin/osascript - "$to" ${said} <<'EOF'`,
    `on run argv`,
    `  tell application "Messages"`,
    `    set theBuddy to participant (item 1 of argv) of (1st account whose service type = iMessage)`,
    `    send ${what} to theBuddy`,
    `  end tell`,
    `end run`,
    `EOF`,
    `echo ${marker}`,
  ]
}

export function buildSendScript(
  recipient: string,
  body: string | undefined,
  attachment: SendAttachment | undefined
): string {
  const lines: string[] = [`set -euo pipefail`, decoded("to", recipient)]

  if (body !== undefined) {
    lines.push(decoded("body", body), ...sending(`"$body"`, "(item 2 of argv)", SENT_TEXT))
  }

  if (attachment !== undefined) {
    lines.push(
      `tmpd="$(mktemp -d -t imsg)"`,
      `trap 'rm -rf "$tmpd"' EXIT`,
      decoded("fname", attachment.filename),
      `img="$tmpd/$fname"`,
      `printf %s '${attachment.fileB64}' | base64 -D 2>/dev/null > "$img" || printf %s '${attachment.fileB64}' | base64 -d > "$img"`,
      ...sending(`"$img"`, "(POSIX file (item 2 of argv))", SENT_PICTURE)
    )
  }

  return lines.join("\n")
}
