import { requireMatchPositional } from "@shared/utils-narrow/validate"
import { z } from "zod"
import { authenticate } from "./auth.ts"
import { handleCgi } from "./cgi.ts"
import { handlePushEvent } from "./push-event.ts"
import { transportRepo } from "./repos.ts"

const PORT = z.coerce.number().int().positive().default(3000).parse(process.env.PORT)

const ANSWERED_ABOUT = transportRepo("akasha").bareRepoPath

const GIT_ROUTE = /^\/([^/]+\/[^/]+\.git)\/(info\/refs|git-upload-pack|git-receive-pack)$/
const GIT_ROUTE_CAPTURES = z.tuple([z.string(), z.string()])

const server = Bun.serve({
  port: PORT,
  hostname: "0.0.0.0",
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === "/health" && req.method === "GET") {
      return Response.json({ status: "ok" })
    }

    if (url.pathname === "/internal/push-event" && req.method === "POST") {
      if (req.headers.get("x-forwarded-for") != null) {
        return new Response("Forbidden", { status: 403 })
      }
      return handlePushEvent(req)
    }

    if (url.pathname === "/internal/diff" && req.method === "GET") {
      if (req.headers.get("x-forwarded-for") != null) {
        return new Response("Forbidden", { status: 403 })
      }
      const base = url.searchParams.get("base")
      const head = url.searchParams.get("head")
      if (base == null || head == null) {
        return Response.json({ error: "base and head query params required" }, { status: 400 })
      }
      try {
        const repoDir = ANSWERED_ABOUT
        const proc = Bun.spawn(["git", "diff", "--name-only", base, head], {
          cwd: repoDir,
          stdout: "pipe",
          stderr: "pipe",
        })
        const stdout = await new Response(proc.stdout).text()
        const exitCode = await proc.exited
        if (exitCode !== 0) {
          const stderr = await new Response(proc.stderr).text()
          return Response.json(
            { error: `git diff failed (exit ${exitCode}): ${stderr}` },
            { status: 500 }
          )
        }
        const files = stdout
          .trim()
          .split("\n")
          .filter((line) => line !== "")
        return Response.json({ files })
      } catch (err) {
        return Response.json({ error: String(err) }, { status: 500 })
      }
    }

    if (url.pathname === "/internal/is-ancestor" && req.method === "GET") {
      if (req.headers.get("x-forwarded-for") != null) {
        return new Response("Forbidden", { status: 403 })
      }
      const commit = url.searchParams.get("commit")
      const ancestorOf = url.searchParams.get("ancestor_of")
      if (commit == null || ancestorOf == null) {
        return Response.json(
          { error: "commit and ancestor_of query params required" },
          { status: 400 }
        )
      }
      const SHA_RE = /^[0-9a-f]{4,40}$/i
      if (!SHA_RE.test(commit) || !SHA_RE.test(ancestorOf)) {
        return Response.json(
          { error: "commit and ancestor_of must be hex SHA values" },
          { status: 400 }
        )
      }
      try {
        const repoDir = ANSWERED_ABOUT
        const proc = Bun.spawn(["git", "merge-base", "--is-ancestor", commit, ancestorOf], {
          cwd: repoDir,
          stdout: "pipe",
          stderr: "pipe",
        })
        const exitCode = await proc.exited
        if (exitCode === 0) {
          return Response.json({ is_ancestor: true })
        }
        if (exitCode === 1) {
          return Response.json({ is_ancestor: false })
        }
        const stderr = await new Response(proc.stderr).text()
        return Response.json(
          { error: `git merge-base failed (exit ${exitCode}): ${stderr}` },
          { status: 500 }
        )
      } catch (err) {
        return Response.json({ error: String(err) }, { status: 500 })
      }
    }

    if (url.pathname === "/internal/branch-tips" && req.method === "GET") {
      if (req.headers.get("x-forwarded-for") != null) {
        return new Response("Forbidden", { status: 403 })
      }
      try {
        const repoDir = ANSWERED_ABOUT
        const proc = Bun.spawn(["git", "for-each-ref", "--format=%(objectname)", "refs/heads/"], {
          cwd: repoDir,
          stdout: "pipe",
          stderr: "pipe",
        })
        const stdout = await new Response(proc.stdout).text()
        const exitCode = await proc.exited
        if (exitCode !== 0) {
          const stderr = await new Response(proc.stderr).text()
          return Response.json(
            { error: `git for-each-ref failed (exit ${exitCode}): ${stderr}` },
            { status: 500 }
          )
        }
        const tips = stdout
          .trim()
          .split("\n")
          .filter((line) => line !== "")
        return Response.json({ tips })
      } catch (err) {
        return Response.json({ error: String(err) }, { status: 500 })
      }
    }

    let routeCaptures: readonly [string, string] | null = null
    try {
      routeCaptures = requireMatchPositional(GIT_ROUTE, GIT_ROUTE_CAPTURES, url.pathname)
    } catch {
      routeCaptures = null
    }
    if (routeCaptures !== null) {
      const repoPath = routeCaptures[0]
      const endpoint = routeCaptures[1]

      const auth = authenticate(req)
      if (!auth) {
        return new Response("Unauthorized", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="git"' },
        })
      }

      const pathInfo = `/${repoPath}/${endpoint}`
      const queryString = url.search !== "" ? url.search.slice(1) : ""

      return handleCgi(req, pathInfo, queryString, auth.remoteUser)
    }

    return new Response("Not Found", { status: 404 })
  },
})

console.log(`[git-transport] Listening on port ${PORT} (started ${new Date().toISOString()})`)

async function gracefulShutdown(signal: string): Promise<void> {
  console.log(`[git-transport] ${signal} received, shutting down...`)
  server.stop()
  process.exit(0)
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"))
process.on("SIGINT", () => gracefulShutdown("SIGINT"))
