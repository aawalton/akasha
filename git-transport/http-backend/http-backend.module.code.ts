import { z } from "zod"
import { backendEnv } from "../backend-env/backend-env.module.code.ts"

const GIT_HTTP_BACKEND_BIN_DEFAULT = z.string().default("/usr/libexec/git-core/git-http-backend")

function findDoubleCRLF(buf: Uint8Array): number {
  const CR = 0x0d
  const LF = 0x0a
  for (let i = 0; i <= buf.length - 4; i++) {
    if (buf[i] === CR && buf[i + 1] === LF && buf[i + 2] === CR && buf[i + 3] === LF) {
      return i
    }
  }
  return -1
}

export async function handleCgi(
  req: Request,
  pathInfo: string,
  queryString: string,
  remoteUser: string
): Promise<Response> {
  const isGzip = req.headers.get("content-encoding")?.toLowerCase() === "gzip"

  const env = backendEnv({
    pathInfo,
    queryString,
    remoteUser,
    method: req.method,
    contentType: req.headers.get("content-type") ?? "",
    contentLength: req.headers.get("content-length") ?? "",
    isGzip,
    processEnv: process.env,
  })

  const backendBin = GIT_HTTP_BACKEND_BIN_DEFAULT.parse(process.env.GIT_HTTP_BACKEND_BIN)
  const proc = Bun.spawn([backendBin], {
    env,
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
    detached: true,
  })
  const pid = proc.pid

  const stderrText = new Response(proc.stderr).text().catch(() => "")

  const sweepGroup = (): undefined => {
    try {
      process.kill(-pid, "SIGKILL")
    } catch {}
  }
  const reapLeader = (): Promise<number> => proc.exited.catch(() => -1)
  const logBackendFailure = async (code: number): Promise<undefined> => {
    if (code === 0) return
    const stderr = (await stderrText).trim()
    console.error(
      `[git-transport] git-http-backend exited with code ${code}` +
        (stderr !== "" ? `: ${stderr}` : "")
    )
  }

  const chunks: Uint8Array[] = []
  let status = 200
  const headers = new Headers()
  const reader = proc.stdout.getReader()

  try {
    if (req.body) {
      const bodyStream = isGzip ? req.body.pipeThrough(new DecompressionStream("gzip")) : req.body
      const writer = proc.stdin
      const bodyReader = bodyStream.getReader()
      try {
        while (true) {
          const { done, value } = await bodyReader.read()
          if (done) break
          await writer.write(value)
        }
      } catch {
      } finally {
        try {
          writer.end()
        } catch {}
      }
    } else {
      proc.stdin.end()
    }

    let headersParsed = false
    let accumulated = new Uint8Array(0)
    while (!headersParsed) {
      const { done, value } = await reader.read()
      if (done) break

      const newBuf = new Uint8Array(accumulated.length + value.length)
      newBuf.set(accumulated)
      newBuf.set(value, accumulated.length)
      accumulated = newBuf

      const boundary = findDoubleCRLF(accumulated)
      if (boundary !== -1) {
        headersParsed = true

        const headerText = new TextDecoder().decode(accumulated.subarray(0, boundary))

        for (const line of headerText.split("\r\n")) {
          const colonIdx = line.indexOf(":")
          if (colonIdx === -1) continue
          const name = line.slice(0, colonIdx).trim()
          const val = line.slice(colonIdx + 1).trim()
          if (name.toLowerCase() === "status") {
            const parsed = Number.parseInt(val, 10)
            status = Number.isNaN(parsed) ? 200 : parsed
          } else {
            headers.set(name, val)
          }
        }

        const remaining = accumulated.subarray(boundary + 4)
        if (remaining.length > 0) {
          chunks.push(remaining)
        }
      }
    }
  } catch (err) {
    sweepGroup()
    await reapLeader()
    throw err
  }

  let cancelled = false
  const body = new ReadableStream({
    async start(controller) {
      try {
        for (const chunk of chunks) {
          controller.enqueue(chunk)
        }
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          controller.enqueue(value)
        }
        if (!cancelled) controller.close()
      } catch (err) {
        if (!cancelled) {
          try {
            controller.error(err)
          } catch {}
        }
      } finally {
        const code = await reapLeader()
        if (!cancelled) await logBackendFailure(code)
        sweepGroup()
      }
    },
    async cancel() {
      cancelled = true
      sweepGroup()
      await reapLeader()
    },
  })

  return new Response(body, { status, headers })
}
