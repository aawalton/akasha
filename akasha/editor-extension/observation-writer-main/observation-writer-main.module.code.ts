#!/usr/bin/env bun

import { writeSync } from "node:fs"
import { rootsHere } from "@akasha/pages-system/checkout-roots"
import { written } from "@tools/lib/page-query-landing"

const ANSWER_FD = 3

const PROTOCOL = 1

const SAYS = "[editor-observations]"

interface Ask {
  readonly id: number
  readonly act: string
  readonly pageType: string
  readonly name: string
  readonly url: string
  readonly method: string
  readonly headers: Record<string, string>
  readonly body: string
}

function writeAll(fd: number, text: string): undefined {
  const buffer = Buffer.from(text, "utf8")
  let at = 0
  while (at < buffer.length) {
    at += writeSync(fd, buffer, at)
  }
  return undefined
}

function say(said: Record<string, unknown>): undefined {
  writeAll(ANSWER_FD, `${JSON.stringify(said)}\n`)
  return undefined
}

const queue: Ask[] = []

let working = false

let closing = false

function askOf(line: string): Ask | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(line)
  } catch {
    return null
  }
  if (parsed === null || typeof parsed !== "object") {
    return null
  }
  const said = parsed as Record<string, unknown>
  if (typeof said["id"] !== "number") {
    return null
  }
  return {
    id: said["id"],
    act: typeof said["act"] === "string" ? said["act"] : "patch-state",
    pageType: typeof said["pageType"] === "string" ? said["pageType"] : "",
    name: typeof said["name"] === "string" ? said["name"] : "",
    url: typeof said["url"] === "string" ? said["url"] : "",
    method: typeof said["method"] === "string" ? said["method"] : "POST",
    headers:
      typeof said["headers"] === "object" && said["headers"] !== null
        ? (said["headers"] as Record<string, string>)
        : {},
    body: typeof said["body"] === "string" ? said["body"] : "",
  }
}

async function land(ask: Ask): Promise<void> {
  try {
    const request = new Request(ask.url, {
      method: ask.method,
      headers: ask.headers,
      body: ask.body,
    })
    const said = await written(rootsHere(), ask.act as never, ask.pageType, ask.name, request, SAYS)
    say({ id: ask.id, ok: true, status: said.status, body: said.body })
  } catch (thrown) {
    say({ id: ask.id, ok: false, status: 500, saying: String(thrown) })
  }
}

async function drain(): Promise<void> {
  if (working) {
    return
  }
  working = true
  try {
    for (;;) {
      const ask = queue.shift()
      if (ask === undefined) {
        break
      }
      await land(ask)
    }
  } finally {
    working = false
  }
  if (closing) {
    process.exit(0)
  }
}

function finish(): void {
  if (closing) {
    return
  }
  closing = true
  if (!working && queue.length === 0) {
    process.exit(0)
  }
  void drain()
}

let held = ""

process.stdin.setEncoding("utf8")
process.stdin.on("data", (chunk: string) => {
  held += chunk
  for (;;) {
    const cut = held.indexOf("\n")
    if (cut < 0) {
      break
    }
    const line = held.slice(0, cut)
    held = held.slice(cut + 1)
    if (line.trim() === "") {
      continue
    }
    const ask = askOf(line)
    if (ask === null) {
      process.stderr.write(`${SAYS} a line on stdin was not an ask and was thrown away\n`)
      continue
    }
    queue.push(ask)
  }
  void drain()
})
process.stdin.on("end", () => finish())
process.stdin.on("close", () => finish())
process.stdin.on("error", () => finish())

try {
  say({ hello: PROTOCOL, pid: process.pid })
} catch (thrown) {
  process.stderr.write(
    `${SAYS} nothing is listening on fd ${ANSWER_FD}, and that is where every answer goes — ` +
      `spawn this with a fourth pipe (${String(thrown)})\n`
  )
  process.exit(1)
}
