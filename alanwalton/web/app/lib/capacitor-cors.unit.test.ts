import { describe, expect, test } from "bun:test"
import { capacitorCorsHeaders, withCors } from "./capacitor-cors"

function reqWithOrigin(origin: string | null): { headers: Headers } {
  const headers = new Headers()
  if (origin !== null) headers.set("Origin", origin)
  return { headers }
}

describe("capacitorCorsHeaders", () => {
  test("emits the allowlist for the capacitor origin with the given methods", () => {
    const cors = capacitorCorsHeaders(reqWithOrigin("capacitor://localhost"), "POST, OPTIONS")
    expect(cors["Access-Control-Allow-Origin"]).toBe("capacitor://localhost")
    expect(cors["Access-Control-Allow-Methods"]).toBe("POST, OPTIONS")
    expect(cors["Access-Control-Allow-Headers"]).toBe("Authorization, Content-Type")
    expect(cors.Vary).toBe("Origin")
  })

  test("threads the caller's methods verbatim (GET routes)", () => {
    expect(
      capacitorCorsHeaders(reqWithOrigin("capacitor://localhost"), "GET, OPTIONS")[
        "Access-Control-Allow-Methods"
      ]
    ).toBe("GET, OPTIONS")
  })

  test("emits NOTHING for a same-origin web request (no Origin header)", () => {
    expect(capacitorCorsHeaders(reqWithOrigin(null), "POST, OPTIONS")).toEqual({})
  })

  test("emits NOTHING for any other origin (no wildcard)", () => {
    expect(capacitorCorsHeaders(reqWithOrigin("https://evil.example"), "POST, OPTIONS")).toEqual({})
  })
})

describe("withCors", () => {
  test("merges the CORS record onto a headers bag and returns it", () => {
    const headers = new Headers({ "content-type": "application/json" })
    const out = withCors(headers, {
      "Access-Control-Allow-Origin": "capacitor://localhost",
      Vary: "Origin",
    })
    expect(out).toBe(headers)
    expect(out.get("Access-Control-Allow-Origin")).toBe("capacitor://localhost")
    expect(out.get("Vary")).toBe("Origin")
    expect(out.get("content-type")).toBe("application/json")
  })

  test("a no-CORS ({}) merge is a no-op — same-origin responses stay clean", () => {
    const headers = new Headers({ "content-type": "application/json" })
    withCors(headers, {})
    expect(headers.has("Access-Control-Allow-Origin")).toBe(false)
  })
})
