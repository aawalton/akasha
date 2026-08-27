import { describe, expect, test } from "bun:test"
import { decideOpenUrlRoute, decidePermissionAction, decidePushRoute } from "./push-routing"

describe("decidePushRoute", () => {
  test("returns a single-leading-slash router path", () => {
    expect(decidePushRoute({ path: "/project/audit-nav-eb7f7338" })).toBe(
      "/project/audit-nav-eb7f7338"
    )
    expect(decidePushRoute({ path: "/game/dominion-1a2b3c4d" })).toBe("/game/dominion-1a2b3c4d")
  })

  test("tolerates extra APNs keys alongside path (passthrough)", () => {
    expect(decidePushRoute({ path: "/project/x-11223344", aps: { badge: 1 }, kind: "t1" })).toBe(
      "/project/x-11223344"
    )
  })

  test("rejects a missing / non-string path", () => {
    expect(decidePushRoute({})).toBeNull()
    expect(decidePushRoute({ path: 42 })).toBeNull()
    expect(decidePushRoute(null)).toBeNull()
    expect(decidePushRoute(undefined)).toBeNull()
    expect(decidePushRoute("/project/x-11223344")).toBeNull()
  })

  test("reads only the `path` key — a legacy `route` key is ignored (the #15458 mismatch)", () => {
    expect(decidePushRoute({ route: "/project/audit-nav-eb7f7338" })).toBeNull()
  })

  test("rejects a relative path (no leading slash)", () => {
    expect(decidePushRoute({ path: "project/x-11223344" })).toBeNull()
  })

  test("rejects an absolute URL / scheme (origin escape)", () => {
    expect(decidePushRoute({ path: "https://evil.com/x" })).toBeNull()
    expect(decidePushRoute({ path: "javascript://alert(1)" })).toBeNull()
  })

  test("rejects a protocol-relative //host (origin escape)", () => {
    expect(decidePushRoute({ path: "//evil.com/steal" })).toBeNull()
  })

  test("rejects a backslash variant that would alias // (origin escape)", () => {
    expect(decidePushRoute({ path: "/\\evil.com" })).toBeNull()
    expect(decidePushRoute({ path: "/project\\x" })).toBeNull()
  })
})

describe("decideOpenUrlRoute", () => {
  test("extracts the origin-relative path from a capacitor://localhost widgetURL", () => {
    expect(decideOpenUrlRoute("capacitor://localhost/nav/claude-accounts-d93b211a")).toBe(
      "/nav/claude-accounts-d93b211a"
    )
    expect(decideOpenUrlRoute("capacitor://localhost/nav/projects-ee268975")).toBe(
      "/nav/projects-ee268975"
    )
  })

  test("preserves the query string (the ?tab= deep link)", () => {
    expect(
      decideOpenUrlRoute(
        "capacitor://localhost/nav/tracking-690c624f?tab=019edbf5-d4ea-7380-a6be-bc7496dbb24c"
      )
    ).toBe("/nav/tracking-690c624f?tab=019edbf5-d4ea-7380-a6be-bc7496dbb24c")
  })

  test("discards scheme+host — a universal-link form yields the same in-app path", () => {
    expect(decideOpenUrlRoute("https://alanwalton.com/nav/projects-ee268975")).toBe(
      "/nav/projects-ee268975"
    )
  })

  test("returns / for the bare origin", () => {
    expect(decideOpenUrlRoute("capacitor://localhost/")).toBe("/")
  })

  test("rejects a non-string value", () => {
    expect(decideOpenUrlRoute(null)).toBeNull()
    expect(decideOpenUrlRoute(undefined)).toBeNull()
    expect(decideOpenUrlRoute(42)).toBeNull()
    expect(decideOpenUrlRoute({ url: "capacitor://localhost/nav/x" })).toBeNull()
  })

  test("rejects a malformed / scheme-less URL", () => {
    expect(decideOpenUrlRoute("not a url")).toBeNull()
    expect(decideOpenUrlRoute("nav/claude-accounts-d93b211a")).toBeNull()
    expect(decideOpenUrlRoute("")).toBeNull()
  })

  test("rejects a protocol-relative pathname (origin escape)", () => {
    expect(decideOpenUrlRoute("capacitor://localhost//evil.com/steal")).toBeNull()
  })
})

describe("decidePermissionAction", () => {
  test("granted → register", () => {
    expect(decidePermissionAction("granted")).toBe("register")
  })

  test("prompt states → request (show the OS dialog once)", () => {
    expect(decidePermissionAction("prompt")).toBe("request")
    expect(decidePermissionAction("prompt-with-rationale")).toBe("request")
  })

  test("denied → degrade (never re-prompt)", () => {
    expect(decidePermissionAction("denied")).toBe("degrade")
  })
})
