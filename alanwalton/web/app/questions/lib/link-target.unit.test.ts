import { describe, expect, test } from "bun:test"
import type { QuestionLink } from "@shared/open-questions"
import { decideOpenUrlRoute } from "../../push/lib/push-routing"
import { decideLinkTarget } from "./link-target"

const web = (url: string): QuestionLink => ({ label: "L", url, platform: "web" })
const native = (url: string): QuestionLink => ({ label: "L", url, platform: "native" })

const IN_SHELL = { inNativeShell: true } as const
const ON_WEB = { inNativeShell: false } as const

describe("decideLinkTarget", () => {
  test("web link on web → a normal browser tab", () => {
    expect(decideLinkTarget(web("https://alanwalton.com/question/abc-12345678"), ON_WEB)).toEqual({
      kind: "browser-tab",
      href: "https://alanwalton.com/question/abc-12345678",
    })
  })

  test("web link in the shell → escape to the system browser", () => {
    expect(decideLinkTarget(web("https://alanwalton.com/question/abc-12345678"), IN_SHELL)).toEqual(
      {
        kind: "system-browser",
        href: "https://alanwalton.com/question/abc-12345678",
      }
    )
  })

  test("native link in the shell → in-app router navigation (already native)", () => {
    expect(decideLinkTarget(native("/question/abc-12345678"), IN_SHELL)).toEqual({
      kind: "in-app-nav",
      path: "/question/abc-12345678",
    })
  })

  test("native link on web → launch the installed app via the custom scheme", () => {
    expect(decideLinkTarget(native("/question/abc-12345678"), ON_WEB)).toEqual({
      kind: "app-scheme",
      url: "alanwalton://localhost/question/abc-12345678",
    })
  })

  test("native link preserves the query string in both contexts", () => {
    expect(decideLinkTarget(native("/nav/tracking-690c624f?tab=x"), IN_SHELL)).toEqual({
      kind: "in-app-nav",
      path: "/nav/tracking-690c624f?tab=x",
    })
    expect(decideLinkTarget(native("/nav/tracking-690c624f?tab=x"), ON_WEB)).toEqual({
      kind: "app-scheme",
      url: "alanwalton://localhost/nav/tracking-690c624f?tab=x",
    })
  })

  test("native link that is not a safe internal path → unresolvable (never dead-ends)", () => {
    for (const context of [IN_SHELL, ON_WEB]) {
      expect(decideLinkTarget(native("https://evil.com/x"), context)).toEqual({
        kind: "unresolvable",
      })
      expect(decideLinkTarget(native("//evil.com/steal"), context)).toEqual({
        kind: "unresolvable",
      })
      expect(decideLinkTarget(native("/\\evil.com"), context)).toEqual({ kind: "unresolvable" })
    }
  })
})

describe("app-scheme URL round-trips through the inbound deep-link decider", () => {
  const paths = [
    "/question/abc-12345678",
    "/nav/tracking-690c624f?tab=019edbf5",
    "/story-chapter/ch-1-deadbeef",
  ]

  for (const path of paths) {
    test(`${path} survives build → appUrlOpen → route`, () => {
      const target = decideLinkTarget(native(path), ON_WEB)
      expect(target.kind).toBe("app-scheme")
      if (target.kind !== "app-scheme") return
      expect(decideOpenUrlRoute(target.url)).toBe(path)
    })
  }

  test("the built URL carries an authority, so the first path segment is not the host", () => {
    const target = decideLinkTarget(native("/question/abc-12345678"), ON_WEB)
    if (target.kind !== "app-scheme") throw new Error("expected an app-scheme target")
    const parsed = new URL(target.url)
    expect(parsed.protocol).toBe("alanwalton:")
    expect(parsed.host).toBe("localhost")
    expect(parsed.pathname).toBe("/question/abc-12345678")
  })
})
