import { expect, test } from "bun:test"
import { mkdir, mkdtemp, writeFile } from "node:fs/promises"
import { join } from "node:path"
import {
  headed,
  noReader,
  type RouterAppServing,
  type RouterAppStart,
  servedBy,
  servedRouterApp,
} from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import { SCRATCH_AT } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { gateInScope } from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"

const AT = new Request("https://requests.alanwalton.com/api/nav-icon/0d4d87c8")

const NOWHERE = "/var/tmp/no-client-folder-is-here"

function serving(routes: RouterAppServing["routes"], heldToGrants = true): RouterAppServing {
  return {
    clientDir: NOWHERE,
    csp: {},
    whoIsReading: async () => ({ user: null }),
    heldToGrants,
    routes,
  }
}

async function namedIn(heldToGrants: boolean): Promise<boolean> {
  let named = false
  await servedBy(
    serving(async () => {
      named = gateInScope() !== null
      return new Response("")
    }, heldToGrants),
    AT,
    "/api/nav-icon/0d4d87c8"
  )
  return named
}

test("a site held to its reader's grants reaches every route inside that reader", async () => {
  expect(await namedIn(true)).toBe(true)
})

test("a site saying nothing is held to nothing", async () => {
  expect(await namedIn(false)).toBe(false)
})

test("an answer that is not HTML is given back as the route wrote it", () => {
  const answered = new Response("{}", { headers: { "content-type": "application/json" } })
  expect(headed(answered, {}, "one")).toBe(answered)
})

test("an answer that is HTML carries the policy and the caching", () => {
  const answered = new Response("<p></p>", { headers: { "content-type": "text/html" } })
  const given = headed(answered, {}, "one")
  expect(given.headers.get("content-security-policy")).toContain("one")
  expect(given.headers.get("cache-control")).not.toBeNull()
})

async function builtRoot(): Promise<string> {
  const root = await mkdtemp(join(SCRATCH_AT, "router-app-start-"))
  await mkdir(join(root, "build", "server"), { recursive: true })
  await mkdir(join(root, "build", "client"), { recursive: true })
  await writeFile(join(root, "build", "server", "index.js"), "export default {}\n")
  await writeFile(join(root, "build", "client", "one.txt"), "one")
  return root
}

async function freePort(): Promise<number> {
  const probe = Bun.serve({ port: 0, hostname: "127.0.0.1", fetch: () => new Response("") })
  const port = probe.port ?? 0
  await probe.stop(true)
  return port
}

async function startedAt(
  around?: RouterAppStart["around"],
  socket?: RouterAppStart["socket"]
): Promise<string> {
  const root = await builtRoot()
  const port = await freePort()
  process.env["PORT"] = String(port)
  process.env["HOST"] = "127.0.0.1"
  const server = await servedRouterApp({
    name: "test",
    root,
    csp: {},
    whoIsReading: noReader,
    around,
    socket,
  })
  setTimeout(() => void server.stop(), 2_000).unref()
  return `http://127.0.0.1:${port}`
}

test("a started app answers a file under the client folder of the build beside it", async () => {
  const at = await startedAt()
  const answered = await fetch(`${at}/one.txt`)
  expect(answered.status).toBe(200)
  expect(await answered.text()).toBe("one")
})

test("a started app hands every request through what the app wraps it in", async () => {
  const at = await startedAt(async (request, served) =>
    new URL(request.url).pathname === "/one.txt" ? served() : new Response("", { status: 418 })
  )
  expect((await fetch(`${at}/elsewhere`)).status).toBe(418)
  expect(await (await fetch(`${at}/one.txt`)).text()).toBe("one")
})

const SOCKET_PATH = "/socket"

function opened(at: string): Promise<boolean> {
  const ws = new WebSocket(at)
  return new Promise((done) => {
    ws.onopen = () => {
      ws.close()
      done(true)
    }
    ws.onerror = () => done(false)
  })
}

test("a socket the app does not admit is refused before it is upgraded", async () => {
  const at = await startedAt(undefined, {
    path: SOCKET_PATH,
    admitted: (request) => new URL(request.url).searchParams.get("leg") === "one",
    said: () => undefined,
    closed: () => undefined,
  })
  const refused = await fetch(`${at}${SOCKET_PATH}`, {
    headers: { upgrade: "websocket", connection: "upgrade" },
  })
  expect(refused.status).toBe(403)
  const ws = at.replace(/^http:/, "ws:")
  expect(await opened(`${ws}${SOCKET_PATH}?leg=two`)).toBe(false)
  expect(await opened(`${ws}${SOCKET_PATH}?leg=one`)).toBe(true)
})

test("a started app told to stop ends its streams and exits cleanly", async () => {
  const root = await builtRoot()
  const port = await freePort()
  const code = import.meta.resolve(
    "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
  )
  const script = join(root, "start.ts")
  await writeFile(
    script,
    `import { noReader, servedRouterApp } from ${JSON.stringify(code)}\n` +
      `await servedRouterApp({ name: "stopping", root: ${JSON.stringify(root)}, csp: {}, whoIsReading: noReader })\n`
  )
  const started = Bun.spawn([process.execPath, script], {
    env: { ...process.env, PORT: String(port), HOST: "127.0.0.1" },
    stdout: "pipe",
  })
  let up = false
  for (let tries = 0; tries < 100 && !up; tries += 1) {
    up = await fetch(`http://127.0.0.1:${port}/one.txt`).then(
      (answered) => answered.ok,
      () => false
    )
    if (!up) await Bun.sleep(50)
  }
  expect(up).toBe(true)
  started.kill("SIGTERM")
  expect(await started.exited).toBe(0)
  const said = await new Response(started.stdout).text()
  expect(said).toContain("[router-app] told to stop; ended 0 page-change streams")
})
