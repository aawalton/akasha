import { expect, test } from "bun:test"
import { join } from "node:path"
import routes from "akasha/alan/web/routes.ts"
import { matchRoutes } from "react-router"

type Entry = { path?: string; index?: boolean; file: string; children?: readonly Entry[] }

const APP_DIR = join(import.meta.dir, "..", "..")

function resolvedFile(url: string): string | null {
  const matched = matchRoutes(routes as never, url)
  if (!matched || matched.length === 0) return null
  const leaf = matched[matched.length - 1]
  if (leaf === undefined) return null
  return (leaf.route as never as { file: string }).file
}

function declaredRoutes(): readonly { path: string; file: string }[] {
  const found: { path: string; file: string }[] = []
  const walk = (entries: readonly Entry[], prefix: string): undefined => {
    for (const entry of entries) {
      const here =
        entry.path === undefined ? prefix : `${prefix}/${entry.path}`.replace(/\/+/g, "/")
      if (entry.children) walk(entry.children, here)
      else
        found.push({ path: entry.index === true ? prefix || "/" : here || "/", file: entry.file })
    }
  }
  walk(routes as never as readonly Entry[], "")
  return found
}

const concrete = (path: string): string =>
  path.replace(/:[A-Za-z0-9_$-]+/g, "probe").replace(/\*/g, "probe") || "/"

const UNROUTED = ["/api/health-samples", "/api/health-sample", "/api/nope", "/api/a/b/c", "/api"]

const PAGE_DETAIL = "/seat/amy"
const PAGE_LISTING = "/seat"

test("an unrouted path under /api/ is no longer read as a page type and a page", () => {
  const pageRoutes = [resolvedFile(PAGE_DETAIL), resolvedFile(PAGE_LISTING)]
  const readAsAPage = UNROUTED.filter((path) => pageRoutes.includes(resolvedFile(path)))
  expect(readAsAPage).toEqual([])
})

test("the module the config names for a wrong api address declares an action", async () => {
  const file = resolvedFile("/api/health-samples")
  const answering = (await import(join(APP_DIR, file as string))) as {
    action?: (args: { request: Request }) => Response
    loader?: (args: { request: Request }) => Response
  }
  expect(typeof answering.action).toBe("function")
  expect(typeof answering.loader).toBe("function")
})

test("a wrong api address is answered 404 with the path it asked for in the body", async () => {
  const file = resolvedFile("/api/health-samples")
  const answering = (await import(join(APP_DIR, file as string))) as {
    action: (args: { request: Request }) => Response
    loader: (args: { request: Request }) => Response
  }

  const posted = answering.action({
    request: new Request("https://alanwalton.com/api/health-samples", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ samples: [] }),
    }),
  })
  expect(posted.status).toBe(404)
  const body = (await posted.json()) as Record<string, unknown>
  expect(body.path).toBe("/api/health-samples")
  expect(body.method).toBe("POST")
  expect(String(body.message)).toContain("/api/health-samples")

  const got = answering.loader({
    request: new Request("https://alanwalton.com/api/nope"),
  })
  expect(got.status).toBe(404)
  expect((await got.json()) as Record<string, unknown>).toMatchObject({ path: "/api/nope" })
})

test("the 404 body never names the route the caller was reaching for", async () => {
  const file = resolvedFile("/api/health-samples")
  const answering = (await import(join(APP_DIR, file as string))) as {
    action: (args: { request: Request }) => Response
  }
  const posted = answering.action({
    request: new Request("https://alanwalton.com/api/health-samples", { method: "POST" }),
  })
  const body = JSON.stringify(await posted.json())
  expect(body).not.toContain("tracking")
  expect(posted.headers.get("Location")).toBeNull()
})

test("every declared route still resolves to the file that declares it", () => {
  const declared = declaredRoutes()
  expect(declared.length).toBeGreaterThan(50)
  const wrong = declared
    .map((route) => ({ ...route, resolved: resolvedFile(concrete(route.path)) }))
    .filter((route) => route.resolved !== route.file)
  expect(wrong).toEqual([])
})

test("the api splat loses to every api route the config declares", () => {
  const declared = declaredRoutes().filter(
    (route) => route.path.startsWith("/api/") && !route.path.includes("*")
  )
  expect(declared.length).toBeGreaterThan(30)
  for (const route of declared) {
    const url = concrete(route.path)
    expect({ url, file: resolvedFile(url) }).toEqual({ url, file: route.file })
  }
})

test("the api splat reaches no page path, including page types beginning with api", () => {
  const detail = resolvedFile(PAGE_DETAIL)
  const listing = resolvedFile(PAGE_LISTING)
  const splat = resolvedFile("/api/nope")
  expect({
    persona: resolvedFile("/persona/amy"),
    apixDetail: resolvedFile("/apix/thing"),
    apixListing: resolvedFile("/apix"),
    reachedBySplat: [detail, listing, resolvedFile("/home"), resolvedFile("/")].filter(
      (file) => file === splat
    ),
  }).toEqual({
    persona: detail,
    apixDetail: detail,
    apixListing: listing,
    reachedBySplat: [],
  })
})
