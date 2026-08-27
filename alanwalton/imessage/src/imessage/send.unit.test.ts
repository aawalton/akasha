import { describe, expect, test } from "bun:test"
import { buildSendScript } from "./send"

const b64 = (s: string): string => Buffer.from(s, "utf8").toString("base64")

describe("buildSendScript", () => {
  test("text-only send: body decoded, single osascript send line, no temp file", () => {
    const script = buildSendScript("+18013766506", "On my way", undefined)
    expect(script).toContain(b64("+18013766506"))
    expect(script).toContain(b64("On my way"))
    expect(script).toContain(`/usr/bin/osascript - "$to" "$body" <<'EOF'`)
    expect(script).toContain("send (item 2 of argv) to theBuddy")
    expect(script).not.toContain("mktemp")
    expect(script).not.toContain("POSIX file")
  })

  test("image-only send: bytes decoded to temp dir, POSIX file attachment, no body", () => {
    const script = buildSendScript("+18013766506", undefined, {
      fileB64: "QUJD",
      filename: "anchor.png",
    })
    expect(script).toContain("QUJD")
    expect(script).toContain(b64("anchor.png"))
    expect(script).toContain("mktemp -d")
    expect(script).toContain(`trap 'rm -rf "$tmpd"' EXIT`)
    expect(script).toContain(`/usr/bin/osascript - "$to" "$img" <<'EOF'`)
    expect(script).toContain("send (POSIX file (item 2 of argv)) to theBuddy")
    expect(script).not.toContain('body="$(')
  })

  test("text + image: caption is item 2, attachment item 3, both send lines present", () => {
    const script = buildSendScript("alan@example.com", "look at this", {
      fileB64: "QUJD",
      filename: "shot.jpg",
    })
    expect(script).toContain(`/usr/bin/osascript - "$to" "$body" "$img" <<'EOF'`)
    expect(script).toContain("send (item 2 of argv) to theBuddy")
    expect(script).toContain("send (POSIX file (item 3 of argv)) to theBuddy")
  })
})
