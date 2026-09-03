// What this pins that nothing else does: that a wrong address under `/api/` is answered as a wrong
// address. On 2026-09-02 Alan's health Shortcut posted to `/api/health-samples` — the ingest route
// is `/api/tracking/health-samples` — and the page catch-all `:pageTypeSlug/:pageHrefParam` matched
// it as page type `api`. That route declares no `action`, so React Router raised its own error
// before any module of ours ran and the answer was 500. Three investigations went at the site
// instead of at the address.
//
// So the tests below read the real `app/routes.ts`, resolve a path against it exactly as the server
// does, and then load the file that the config itself names. Nothing here hardcodes which module
// answers: delete the `api/*` line from `routes.ts` and the first test reports `page-detail.tsx`,
// the second finds no `action` where it needs one, and both fail.
//
// The route inventory test is the other half. A splat that swallowed a real `api/...` route, or a
// page path, would be a worse defect than the one being fixed, so every declared route is resolved
// and has to come back to the file that declares it.

import { expect, test } from "bun:test"
import { join } from "node:path"
import { matchRoutes } from "react-router"
import routes from "../routes.ts"

type Entry = { path?: string; index?: boolean; file: string; children?: readonly Entry[] }

const APP_DIR = join(import.meta.dir, "..")

/** The file the real route config gives a URL, resolved the way the server resolves it. */
function resolvedFile(url: string): string | null {
  const matched = matchRoutes(routes as never, url)
  if (!matched || matched.length === 0) return null
  const leaf = matched[matched.length - 1]
  if (leaf === undefined) return null
  return (leaf.route as never as { file: string }).file
}

/** Every route the config declares, as a (path, file) pair, layouts flattened away. */
function declaredRoutes(): readonly { path: string; file: string }[] {
  const found: { path: string; file: string }[] = []
  const walk = (entries: readonly Entry[], prefix: string): void => {
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

/** A concrete URL for a declared path, with every `:param` and `*` filled in. */
const concrete = (path: string): string =>
  path.replace(/:[A-Za-z0-9_$-]+/g, "probe").replace(/\*/g, "probe") || "/"

const UNROUTED = ["/api/health-samples", "/api/health-sample", "/api/nope", "/api/a/b/c", "/api"]

test("an unrouted path under /api/ is no longer read as a page type and a page", () => {
  for (const path of UNROUTED) {
    expect({ path, file: resolvedFile(path) }).toEqual({ path, file: "routes/api.$.ts" })
  }
})

test("the module the config names for a wrong api address declares an action", async () => {
  const file = resolvedFile("/api/health-samples")
  expect(file).toBe("routes/api.$.ts")
  const answering = (await import(join(APP_DIR, file as string))) as {
    action?: (args: { request: Request }) => Response
    loader?: (args: { request: Request }) => Response
  }
  // The 500 came from a matched route declaring no `action`, so this is the assertion that would
  // have failed on 2026-09-02.
  expect(typeof answering.action).toBe("function")
  expect(typeof answering.loader).toBe("function")
})

test("a wrong api address is answered 404 with the path it asked for in the body", async () => {
  const file = resolvedFile("/api/health-samples")
  expect(file).toBe("routes/api.$.ts")
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
  const answering = (await import(join(APP_DIR, "routes/api.$.ts"))) as {
    action: (args: { request: Request }) => Response
  }
  const posted = answering.action({
    request: new Request("https://alanwalton.com/api/health-samples", { method: "POST" }),
  })
  const body = JSON.stringify(await posted.json())
  // A wrong address fails plainly rather than being redirected or quietly accepted.
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
    (route) => route.path.startsWith("/api/") && route.file !== "routes/api.$.ts"
  )
  expect(declared.length).toBeGreaterThan(30)
  for (const route of declared) {
    const url = concrete(route.path)
    expect({ url, file: resolvedFile(url) }).toEqual({ url, file: route.file })
  }
})

test("the api splat reaches no page path, including page types beginning with api", () => {
  expect(resolvedFile("/seat/amy")).toBe("routes/page-detail.tsx")
  expect(resolvedFile("/seat")).toBe("routes/page-listing.tsx")
  expect(resolvedFile("/persona/amy")).toBe("routes/page-detail.tsx")
  expect(resolvedFile("/apix/thing")).toBe("routes/page-detail.tsx")
  expect(resolvedFile("/apix")).toBe("routes/page-listing.tsx")
  expect(resolvedFile("/home")).toBe("routes/home.tsx")
  expect(resolvedFile("/")).toBe("routes/landing.tsx")
})
