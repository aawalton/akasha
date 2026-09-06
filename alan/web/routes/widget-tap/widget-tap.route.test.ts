import { expect, test } from "bun:test"
import { answerWidgetTap } from "../../.server/widget-tap-answering/widget-tap-answering.module.code.ts"

const CAPACITOR = "capacitor://localhost"

const AT = "2026-09-06T12:00:00.000Z"

const signedIn = async () => ({
  authenticated: true as const,
  userId: "alan",
  headers: new Headers(),
})

const signedOut = async () => ({ authenticated: false as const, headers: new Headers() })

const counted = async () => ({ taps: 4, at: AT })

const uncounted = async () => null

function asked(body: unknown): Request {
  return new Request("https://alanwalton.com/api/widget-tap", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: CAPACITOR },
    body: JSON.stringify(body),
  })
}

test("a caller who is not signed in is refused", async () => {
  const answered = await answerWidgetTap(
    asked({ widget: "alanwalton-surplus" }),
    signedOut,
    counted
  )
  expect(answered.status).toBe(401)
})

test("a body naming no widget is refused", async () => {
  expect((await answerWidgetTap(asked({}), signedIn, counted)).status).toBe(400)
  expect((await answerWidgetTap(asked({ widget: "" }), signedIn, counted)).status).toBe(400)
  expect((await answerWidgetTap(asked({ widget: 7 }), signedIn, counted)).status).toBe(400)
})

test("a slug no widget page carries is answered as no widget", async () => {
  const answered = await answerWidgetTap(asked({ widget: "no-such-widget" }), signedIn, uncounted)
  expect(answered.status).toBe(404)
})

test("a tap is counted on the widget the body names", async () => {
  const asks: string[] = []
  const answered = await answerWidgetTap(
    asked({ widget: "alanwalton-surplus" }),
    signedIn,
    async (slug) => {
      asks.push(slug)
      return { taps: 4, at: AT }
    }
  )
  expect(answered.status).toBe(200)
  expect(asks).toEqual(["alanwalton-surplus"])
  expect(await answered.json()).toEqual({
    ok: true,
    widget: "alanwalton-surplus",
    taps: 4,
    at: AT,
  })
})

test("an answer to the native shell carries the cross-origin headers that shell needs", async () => {
  const answered = await answerWidgetTap(asked({ widget: "alanwalton-surplus" }), signedIn, counted)
  expect(answered.headers.get("Access-Control-Allow-Origin")).toBe(CAPACITOR)
})
