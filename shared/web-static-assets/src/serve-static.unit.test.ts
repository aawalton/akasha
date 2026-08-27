import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  HTML_DEFAULT_CACHE_CONTROL,
  htmlCacheControl,
  IMMUTABLE_CACHE_CONTROL,
  NO_STORE_CACHE_CONTROL,
  SHORT_CACHE_CONTROL,
  serveClientStatic,
} from "./serve-static"

let clientDir: string

beforeAll(async () => {
  clientDir = await mkdtemp(join(tmpdir(), "web-static-assets-"))
  await mkdir(join(clientDir, "assets"), { recursive: true })
  await writeFile(join(clientDir, "favicon.ico"), "icon-bytes")
  await writeFile(join(clientDir, "assets", "app-abc123.js"), "console.log(1)")
})

afterAll(async () => {
  await rm(clientDir, { recursive: true, force: true })
})

describe("serveClientStatic — /assets/ branch (edge-cache safety, #14692)", () => {
  test("existing hashed asset → 200 + immutable cache-control", async () => {
    const res = await serveClientStatic("/assets/app-abc123.js", clientDir)
    expect(res).not.toBeNull()
    expect(res?.status).toBe(200)
    expect(res?.headers.get("cache-control")).toBe(IMMUTABLE_CACHE_CONTROL)
  })

  test("MISSING hashed asset → 404 + no-store (never a cacheable 2xx, never fall-through)", async () => {
    const res = await serveClientStatic("/assets/nope-deadbeef.js", clientDir)
    expect(res).not.toBeNull()
    expect(res?.status).toBe(404)
    expect(res?.headers.get("cache-control")).toBe(NO_STORE_CACHE_CONTROL)
    expect(res?.headers.get("cache-control")).not.toContain("immutable")
    expect(res?.headers.get("cache-control")).not.toContain("max-age")
  })

  test("MISSING asset never returns a body that could be stored", async () => {
    const res = await serveClientStatic("/assets/missing-chunk.css", clientDir)
    expect(res?.status).toBe(404)
    expect(await res?.text()).toBe("")
  })
})

describe("serveClientStatic — non-asset branch", () => {
  test("existing root-level client file → 200 + short cache", async () => {
    const res = await serveClientStatic("/favicon.ico", clientDir)
    expect(res).not.toBeNull()
    expect(res?.status).toBe(200)
    expect(res?.headers.get("cache-control")).toBe(SHORT_CACHE_CONTROL)
  })

  test("non-asset miss → null (fall through to the app request handler)", async () => {
    const res = await serveClientStatic("/some/app/route", clientDir)
    expect(res).toBeNull()
  })

  test("root path '/' → null (never served as a static file)", async () => {
    const res = await serveClientStatic("/", clientDir)
    expect(res).toBeNull()
  })
})

describe("htmlCacheControl — HTML documents are never edge-cacheable", () => {
  test("absent → non-cacheable HTML default", () => {
    expect(htmlCacheControl(null)).toBe(HTML_DEFAULT_CACHE_CONTROL)
    expect(htmlCacheControl(null)).toContain("no-store")
  })

  test("present → preserves a route's explicit Cache-Control", () => {
    expect(htmlCacheControl("private, max-age=300")).toBe("private, max-age=300")
  })
})
