import { describe, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { type DiscoveredRoute, discoverTunnelRoutes, validateRoutes } from "./discover-routes"

const REPO_ROOT = join(import.meta.dirname, "../../../../..")

describe("discoverTunnelRoutes (real repo)", () => {
  test("returns at least one route, each with non-empty fields", async () => {
    const sourced = await discoverTunnelRoutes()
    expect(sourced.length).toBeGreaterThan(0)
    for (const { route, sourceFile } of sourced) {
      expect(route.name.trim()).not.toBe("")
      expect(route.hostname.trim()).not.toBe("")
      expect(route.service.trim()).not.toBe("")
      expect(sourceFile).toMatch(/tunnel-routes\.ts$/)
      expect(existsSync(join(REPO_ROOT, sourceFile))).toBe(true)
    }
  })

  test("name and hostname are globally unique", async () => {
    const sourced = await discoverTunnelRoutes()
    const names = new Set(sourced.map((s) => s.route.name))
    const hostnames = new Set(sourced.map((s) => s.route.hostname))
    expect(names.size).toBe(sourced.length)
    expect(hostnames.size).toBe(sourced.length)
  })
})

describe("validateRoutes", () => {
  function r(
    name: string,
    hostname: string,
    service: string,
    file = "x/tunnel-routes.ts"
  ): DiscoveredRoute {
    return { route: { name, hostname, service }, sourceFile: file }
  }

  test("accepts a valid set", () => {
    expect(() =>
      validateRoutes([
        r("a", "a.example.com", "http://a:80"),
        r("b", "b.example.com", "http://b:80"),
      ])
    ).not.toThrow()
  })

  test("rejects empty name", () => {
    expect(() => validateRoutes([r("", "a.example.com", "http://a:80")])).toThrow(/empty name/)
  })

  test("rejects empty hostname", () => {
    expect(() => validateRoutes([r("a", "", "http://a:80")])).toThrow(/empty hostname.*name="a"/)
  })

  test("rejects empty service", () => {
    expect(() => validateRoutes([r("a", "a.example.com", "")])).toThrow(/empty service.*name="a"/)
  })

  test("rejects duplicate name across files", () => {
    expect(() =>
      validateRoutes([
        r("a", "a.example.com", "http://a:80", "p1/tunnel-routes.ts"),
        r("a", "b.example.com", "http://b:80", "p2/tunnel-routes.ts"),
      ])
    ).toThrow(/duplicate name "a".*p2.*p1/s)
  })

  test("rejects duplicate hostname across files", () => {
    expect(() =>
      validateRoutes([
        r("a", "a.example.com", "http://a:80", "p1/tunnel-routes.ts"),
        r("b", "a.example.com", "http://b:80", "p2/tunnel-routes.ts"),
      ])
    ).toThrow(/duplicate hostname "a\.example\.com".*p2.*p1/s)
  })
})
