import { holdDerivers } from "../tools/lib/deriver-hold.ts"
import { arrangedResponse } from "../tools/lib/editor-arrangement.ts"
import {
  deferCommits,
  landingsHealthy,
  standing,
  UNLANDED_SAYS,
} from "../tools/lib/page-commit-queue.ts"
import { backedTypes, queryNames } from "../tools/lib/page-query.ts"
import { answerHeldFor, holdAnswers } from "../tools/lib/page-query-hold.ts"
import {
  answered,
  askedFrom,
  naming,
  NAMING_ROUTE,
  READ_ROUTE,
  reported,
  SHAPE_ROUTE,
  shaped,
} from "../tools/lib/page-query-answer.ts"
import { written, WRITE_ROUTE } from "../tools/lib/page-query-landing.ts"
import type { Said } from "../tools/lib/page-query-request.ts"
import type { WriteAct } from "../tools/lib/page-landing-judge.ts"
import { resolveRoots } from "../repo/roots/roots"
import { clusterReachOf } from "../tools/lib/service-cluster-reach.ts"

const BEAT_MS = 1_000
const BEAT_LATE_MS = 2_000
const BEAT_JUMP_MB = 200

const SLUG = "page-query-service"
const SAYS = `[${SLUG}]`

const roots = resolveRoots()
const PORT = clusterReachOf(roots.instructions, SLUG).port

function builtAt(): string {
  const got = Bun.spawnSync(["git", "-C", roots.instructions, "rev-parse", "--short", "HEAD"])
  return got.success ? new TextDecoder().decode(got.stdout).trim() : "unknown"
}

const BUILT = builtAt()

let nth = 0

process.env.AGENT_ID = SLUG
process.env.ACTING_AGENT_ID = ""

deferCommits()

holdDerivers(1_000)

holdAnswers(1_000)

function json(body: unknown, status: number): Response {
  return new Response(`${JSON.stringify(body)}\n`, {
    status,
    headers: { "content-type": "application/json" },
  })
}

function sent(answer: Said): Response {
  return json(answer.body, answer.status)
}

const ANSWERS =
  "this service answers `/health`, `/q`, `/q/<name>?<argument>=<value>` for each argument the query " +
  "declares under `takes`, POST `/q` with a composed query, `/page-types`, " +
  "`/page/<page-type>/<name>`, `/naming/<relation-key>/<name>?page-types=<a,b>&limit=<n>`, " +
  "`/shape/<page-type>`, " +
  "POST `/write|patch|patch-if|patch-state|remove/<page-type>/<name>`, and " +
  "POST `/write-row|patch-row|remove-row/<page-type>/<parent-name>` for a page type another page holds in rows, " +
  "where `write-row` and `patch-row` take either one `values` or a list of `rows` landed in one pass, " +
  "and POST `/editor-arrangement` with one window's arrangement"

function served(url: URL): Response {
  const { pathname } = url
  if (pathname === "/health") {
    const queue = standing()
    const ok = landingsHealthy(queue)
    return json(
      {
        ok,
        named: queryNames(roots).length,
        built: BUILT,
        ...queue,
        ...(ok ? {} : { unlandedSays: UNLANDED_SAYS }),
      },
      200
    )
  }
  if (pathname === "/q") return json({ named: queryNames(roots) }, 200)
  if (pathname === "/page-types") return json({ types: backedTypes(roots) }, 200)
  const named = /^\/q\/([a-z0-9-]+)$/.exec(pathname)
  if (named !== null) {
    const slug = named[1] as string
    const asked = url.searchParams.toString()
    return sent(answerHeldFor(`q ${slug} ${asked}`, () => answered(roots, slug, url.searchParams)))
  }
  const namers = NAMING_ROUTE.exec(pathname)
  if (namers !== null) {
    const key = namers[1] as string
    const name = namers[2] as string
    const asked = url.searchParams.toString()
    return sent(answerHeldFor(`naming ${key} ${name} ${asked}`, () => naming(roots, key, name, url.searchParams)))
  }
  const shape = SHAPE_ROUTE.exec(pathname)
  if (shape !== null) {
    const pageType = shape[1] as string
    return sent(answerHeldFor(`shape ${pageType}`, () => shaped(roots, pageType)))
  }
  const read = READ_ROUTE.exec(pathname)
  if (read !== null) {
    const kind = read[1] as string
    const name = read[2] as string
    return sent(answerHeldFor(`page ${kind} ${name}`, () => reported(roots, kind, name)))
  }
  return json({ error: ANSWERS }, 404)
}

function kindAsked(text: string): string {
  try {
    const one = JSON.parse(text) as Record<string, unknown>
    const kind = one["page-type"]
    return typeof kind === "string" ? ` ${kind}` : ""
  } catch {
    return ""
  }
}

async function posted(url: URL, request: Request, mark: (what: string) => void): Promise<Response> {
  if (url.pathname === "/q") {
    const text = await request.text()
    mark(kindAsked(text))
    return sent(answerHeldFor(`composed ${text}`, () => askedFrom(roots, text)))
  }
  if (url.pathname === "/editor-arrangement") {
    const answer = arrangedResponse(roots, await request.json().catch(() => null))
    return json(answer.body, answer.status)
  }
  const wrote = WRITE_ROUTE.exec(url.pathname)
  if (wrote === null) return json({ error: ANSWERS }, 404)
  return sent(
    await written(roots, wrote[1] as WriteAct, wrote[2] as string, wrote[3] as string, request, SAYS)
  )
}

let beatAt = Date.now()
let beatRss = 0

const beat = setInterval(() => {
  const now = Date.now()
  const late = now - beatAt - BEAT_MS
  beatAt = now
  const rss = Math.round(process.memoryUsage().rss / 1_048_576)
  const jumped = Math.abs(rss - beatRss) >= BEAT_JUMP_MB
  if (late < BEAT_LATE_MS && !jumped) return
  beatRss = rss
  console.error(`${SAYS} ~~ rss ${rss} MB${late >= BEAT_LATE_MS ? ` late ${late}ms` : ""}`)
}, BEAT_MS)
beat.unref?.()

Bun.serve({
  port: PORT,
  hostname: "0.0.0.0",
  fetch: async (request) => {
    const at = Date.now()
    const url = new URL(request.url)
    const n = (nth += 1)
    let asked = ""
    const began = (what: string): void => {
      console.error(`${SAYS} >> #${n} ${request.method} ${url.pathname}${what}`)
    }
    const mark = (what: string): void => {
      asked = what
      began(what)
    }
    if (request.method !== "POST" || url.pathname !== "/q") began("")
    const response =
      request.method === "POST" ? await posted(url, request, mark) : served(url)
    console.error(
      `${SAYS} ${response.status} ${request.method} ${url.pathname}${asked} ${Date.now() - at}ms #${n}`
    )
    return response
  },
})

console.error(
  `${SAYS} listening on 0.0.0.0:${PORT} at ${BUILT}, ${queryNames(roots).length} query page(s) named`
)
