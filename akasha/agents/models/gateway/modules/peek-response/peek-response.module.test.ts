import { describe, expect, test } from "bun:test"
import { peekResponse } from "./peek-response.module.code.ts"

const ERROR_BODY = '{"error":{"type":"overloaded_error"}}'

const HOSTILE_BODIES: readonly string[] = [
  "",
  "not json",
  "{",
  "null",
  "0",
  '"str"',
  "true",
  "[]",
  "{}",
  '{"error":null}',
  '{"error":{}}',
  '{"error":{"type":null}}',
  '{"error":{"type":7}}',
  '{"error":"boom"}',
  '{"__proto__":{"error":{"type":"poisoned"}}}',
  '{"error":{"type":"a"},"error":{"type":"b"}}',
  `${"[".repeat(5000)}${"]".repeat(5000)}`,
  `{"error":{"type":"${"x".repeat(50000)}"}}`,
]

function erroringResponse(): Response {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.error(new Error("stream blew up"))
      },
    })
  )
}

describe("A body is read to text once.", () => {
  test("the original response is consumed", async () => {
    const res = new Response(ERROR_BODY)
    await peekResponse(res)
    expect(res.bodyUsed).toBe(true)
  })

  test("a second peek of the same response finds nothing left", async () => {
    const res = new Response(ERROR_BODY)
    const first = await peekResponse(res)
    const second = await peekResponse(res)
    expect(first.bodyText).toBe(ERROR_BODY)
    expect(second.bodyText).toBe("")
  })
})

describe("The text read is kept for a caller to look at.", () => {
  test("the body text is handed back verbatim", async () => {
    const peeked = await peekResponse(new Response(ERROR_BODY))
    expect(peeked.bodyText).toBe(ERROR_BODY)
  })
})

describe("A body that cannot be read reads as an empty body.", () => {
  test("a stream that errors gives empty text", async () => {
    const peeked = await peekResponse(erroringResponse())
    expect(peeked.bodyText).toBe("")
  })
})

describe("Nothing here tells an unreadable body from an empty body.", () => {
  test("an errored stream and an empty body peek alike", async () => {
    const broken = await peekResponse(erroringResponse())
    const empty = await peekResponse(new Response(""))
    expect(broken.bodyText).toBe(empty.bodyText)
    expect(broken.errorType).toBe(empty.errorType)
  })
})

describe("The error type is parsed from the text read.", () => {
  test("an error envelope gives its type", async () => {
    const peeked = await peekResponse(new Response(ERROR_BODY))
    expect(peeked.errorType).toBe("overloaded_error")
  })

  test("a body naming no error type gives null", async () => {
    const peeked = await peekResponse(new Response('{"ok":true}'))
    expect(peeked.errorType).toBe(null)
  })
})

describe("Nothing a body can hold makes the error type parse throw.", () => {
  test("every hostile body peeks to a string or null", async () => {
    for (const body of HOSTILE_BODIES) {
      const peeked = await peekResponse(new Response(body))
      expect(peeked.errorType === null || typeof peeked.errorType === "string").toBe(true)
    }
  })
})

describe("Reading a response never throws.", () => {
  test("an errored stream resolves rather than rejecting", async () => {
    await expect(peekResponse(erroringResponse())).resolves.toBeDefined()
  })

  test("a consumed response resolves rather than rejecting", async () => {
    const res = new Response(ERROR_BODY)
    await res.text()
    await expect(peekResponse(res)).resolves.toBeDefined()
  })
})

describe("A response to hand on is built only when a caller asks for one.", () => {
  test("rebuild is a function rather than a response", async () => {
    const peeked = await peekResponse(new Response(ERROR_BODY))
    expect(typeof peeked.rebuild).toBe("function")
  })

  test("a rebuilt response arrives unread", async () => {
    const peeked = await peekResponse(new Response(ERROR_BODY))
    const rebuilt = peeked.rebuild()
    expect(rebuilt.bodyUsed).toBe(false)
    expect(await rebuilt.text()).toBe(ERROR_BODY)
  })
})

describe("Each ask builds a response of its own.", () => {
  test("two rebuilds are two responses", async () => {
    const peeked = await peekResponse(new Response(ERROR_BODY))
    const first = peeked.rebuild()
    const second = peeked.rebuild()
    expect(first).not.toBe(second)
    expect(await first.text()).toBe(ERROR_BODY)
    expect(await second.text()).toBe(ERROR_BODY)
  })
})

describe("A rebuilt response carries the status of the original.", () => {
  test("a 429 rebuilds as a 429", async () => {
    const peeked = await peekResponse(new Response(ERROR_BODY, { status: 429 }))
    expect(peeked.rebuild().status).toBe(429)
  })
})

describe("A rebuilt response carries the status text of the original.", () => {
  test("the status text survives", async () => {
    const peeked = await peekResponse(
      new Response(ERROR_BODY, { status: 429, statusText: "Too Many Requests" })
    )
    expect(peeked.rebuild().statusText).toBe("Too Many Requests")
  })
})

describe("A rebuilt response carries the headers of the original.", () => {
  test("a header survives", async () => {
    const peeked = await peekResponse(
      new Response(ERROR_BODY, { status: 429, headers: { "retry-after": "30" } })
    )
    expect(peeked.rebuild().headers.get("retry-after")).toBe("30")
  })
})

describe("A rebuilt response holds a headers object of its own.", () => {
  test("the rebuilt headers are not the original headers", async () => {
    const res = new Response(ERROR_BODY, { status: 429, headers: { "retry-after": "30" } })
    const original = res.headers
    const peeked = await peekResponse(res)
    const rebuilt = peeked.rebuild()
    expect(rebuilt.headers).not.toBe(original)
    original.set("retry-after", "60")
    expect(rebuilt.headers.get("retry-after")).toBe("30")
  })
})

describe("Nothing here reads the status to decide what to do.", () => {
  test("every status peeks and rebuilds alike", async () => {
    for (const status of [200, 400, 401, 429, 500, 503]) {
      const peeked = await peekResponse(new Response(ERROR_BODY, { status }))
      expect(peeked.bodyText).toBe(ERROR_BODY)
      expect(peeked.errorType).toBe("overloaded_error")
      expect(peeked.rebuild().status).toBe(status)
    }
  })
})

describe("A rebuilt response carries the content-encoding of a body already decoded.", () => {
  test("content-encoding survives a decoded body", async () => {
    const res = new Response(ERROR_BODY, {
      status: 429,
      headers: { "content-encoding": "gzip" },
    })
    const peeked = await peekResponse(res)
    expect(peeked.bodyText).toBe(ERROR_BODY)
    expect(peeked.rebuild().headers.get("content-encoding")).toBe("gzip")
  })
})

describe("A rebuilt response carries the content-length of the compressed body.", () => {
  test("content-length survives even where the text is longer", async () => {
    const res = new Response(ERROR_BODY, {
      status: 429,
      headers: { "content-length": "53" },
    })
    const peeked = await peekResponse(res)
    expect(peeked.bodyText.length).toBe(37)
    expect(peeked.rebuild().headers.get("content-length")).toBe("53")
  })
})
