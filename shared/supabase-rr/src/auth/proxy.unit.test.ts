import { describe, expect, mock, test } from "bun:test"

mock.module("../proxy", () => ({
  refreshSession: async () => ({ headers: new Headers(), user: { id: "user-1" } }),
}))

const { authGuard } = await import("./proxy")

const CONFIG = {
  signInPath: "/sign-in",
  authPaths: ["/sign-in"],
  internalApiPaths: [],
} as const

const SESSION_COOKIE = "sb-stubproject-auth-token=stub-token"

async function guardLocation(next: string): Promise<string | null> {
  const url = `https://app.example.com/sign-in?next=${encodeURIComponent(next)}`
  const request = new Request(url, { headers: { cookie: SESSION_COOKIE } })
  const result = await authGuard(request, CONFIG)
  if (!(result instanceof Response)) return null
  return result.headers.get("location")
}

describe("authGuard — the post-sign-in redirect target", () => {
  test("refuses a backslash target and falls back to the app root", async () => {
    expect(new URL("/\\evil.com", "https://app.example.com").href).toBe("https://evil.com/")
    expect(await guardLocation("/\\evil.com")).toBe("/")
  })

  test("refuses the backslash-then-slash spelling of the same attack", async () => {
    expect(new URL("/\\/evil.com", "https://app.example.com").href).toBe("https://evil.com/")
    expect(await guardLocation("/\\/evil.com")).toBe("/")
  })

  test("refuses tab, LF and CR smuggled between the slashes", async () => {
    for (const stripped of ["\t", "\n", "\r"]) {
      const target = `/${stripped}/evil.com`
      expect(new URL(target, "https://app.example.com").href).toBe("https://evil.com/")
      expect(await guardLocation(target)).toBe("/")
    }
  })

  test("refuses a protocol-relative target", async () => {
    expect(await guardLocation("//evil.com")).toBe("/")
  })

  test("refuses an absolute off-site target", async () => {
    expect(await guardLocation("https://evil.com/steal")).toBe("/")
  })

  test("still admits a legitimate internal path", async () => {
    expect(await guardLocation("/dashboard")).toBe("/dashboard")
  })

  test("still admits an internal path carrying a query and a fragment", async () => {
    expect(await guardLocation("/nav/tasks-a7242626?tab=x")).toBe("/nav/tasks-a7242626?tab=x")
  })
})
