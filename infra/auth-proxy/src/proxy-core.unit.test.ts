import { describe, expect, test } from "bun:test"
import { buildBadGatewayResponse, buildStubResponse, fetchOrBadGateway } from "./proxy-core"

describe("buildStubResponse", () => {
  test("returns 200 status", () => {
    const result = buildStubResponse("[]")
    expect(result.status).toBe(200)
  })

  test("emits application/json content-type", () => {
    const result = buildStubResponse("[]")
    expect(result.headers.get("content-type")).toBe("application/json")
  })

  test("body matches the configured string verbatim", async () => {
    const result = buildStubResponse('{"foo":"bar"}')
    expect(await result.text()).toBe('{"foo":"bar"}')
  })

  test("preserves an empty array body", async () => {
    const result = buildStubResponse("[]")
    expect(await result.text()).toBe("[]")
  })

  test("preserves an empty object body", async () => {
    const result = buildStubResponse("{}")
    expect(await result.text()).toBe("{}")
  })
})

describe("buildBadGatewayResponse", () => {
  test("returns 502 status", () => {
    expect(buildBadGatewayResponse().status).toBe(502)
  })

  test("carries a plain body, no ACAO of its own (the CORS wrapper adds it)", async () => {
    const result = buildBadGatewayResponse()
    expect(await result.text()).toBe("Bad Gateway")
    expect(result.headers.get("access-control-allow-origin")).toBeNull()
  })
})

describe("fetchOrBadGateway", () => {
  test("returns the upstream response untouched on success", async () => {
    const upstream = new Response("ok", { status: 200 })
    let reported: unknown = "unset"
    const result = await fetchOrBadGateway(
      () => Promise.resolve(upstream),
      (err) => {
        reported = err
      }
    )
    expect(result).toBe(upstream)
    expect(result.status).toBe(200)
    expect(reported).toBe("unset")
  })

  test("translates a rejected upstream fetch into a 502 and reports the error", async () => {
    const boom = new Error("ECONNREFUSED gotrue.gotrue.svc.cluster.local:9999")
    let reported: unknown = null
    const result = await fetchOrBadGateway(
      () => Promise.reject(boom),
      (err) => {
        reported = err
      }
    )
    expect(result.status).toBe(502)
    expect(await result.text()).toBe("Bad Gateway")
    expect(reported).toBe(boom)
  })

  test("catches a synchronous throw from the thunk too", async () => {
    let reportedCount = 0
    const result = await fetchOrBadGateway(
      () => {
        throw new TypeError("bad url")
      },
      () => {
        reportedCount += 1
      }
    )
    expect(result.status).toBe(502)
    expect(reportedCount).toBe(1)
  })
})
