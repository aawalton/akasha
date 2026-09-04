export interface SendAttachment {
  readonly fileB64: string
  readonly filename: string
}

export function buildSendScript(
  recipient: string,
  body: string | undefined,
  attachment: SendAttachment | undefined
): string {
  const toB64 = Buffer.from(recipient, "utf8").toString("base64")
  const lines: string[] = [
    `set -euo pipefail`,
    `to="$(printf %s '${toB64}' | base64 -D 2>/dev/null || printf %s '${toB64}' | base64 -d)"`,
  ]
  const oscArgs: string[] = [`"$to"`]
  const sendStmts: string[] = []
  let item = 1

  if (body !== undefined) {
    const bodyB64 = Buffer.from(body, "utf8").toString("base64")
    lines.push(
      `body="$(printf %s '${bodyB64}' | base64 -D 2>/dev/null || printf %s '${bodyB64}' | base64 -d)"`
    )
    item += 1
    oscArgs.push(`"$body"`)
    sendStmts.push(`    send (item ${item} of argv) to theBuddy`)
  }

  if (attachment !== undefined) {
    const nameB64 = Buffer.from(attachment.filename, "utf8").toString("base64")
    lines.push(
      `tmpd="$(mktemp -d -t imsg)"`,
      `trap 'rm -rf "$tmpd"' EXIT`,
      `fname="$(printf %s '${nameB64}' | base64 -D 2>/dev/null || printf %s '${nameB64}' | base64 -d)"`,
      `img="$tmpd/$fname"`,
      `printf %s '${attachment.fileB64}' | base64 -D 2>/dev/null > "$img" || printf %s '${attachment.fileB64}' | base64 -d > "$img"`
    )
    item += 1
    oscArgs.push(`"$img"`)
    sendStmts.push(`    send (POSIX file (item ${item} of argv)) to theBuddy`)
  }

  lines.push(
    `/usr/bin/osascript - ${oscArgs.join(" ")} <<'EOF'`,
    `on run argv`,
    `  tell application "Messages"`,
    `    set theBuddy to participant (item 1 of argv) of (1st account whose service type = iMessage)`,
    ...sendStmts,
    `  end tell`,
    `end run`,
    `EOF`
  )
  return lines.join("\n")
}
