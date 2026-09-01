import { OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"

export const APPIUM_BASE = "http://100.64.0.2:4723"

const ELEMENT_KEY = "element-6066-11e4-a52e-4f735466cecf"

export const DEFAULT_CALL_TIMEOUT_MS = 30_000
export const STATUS_TIMEOUT_MS = 8_000
export const SESSION_CREATE_TIMEOUT_MS = 360_000

const envelopeSchema = z.object({ value: z.unknown() }).passthrough()

const errorValueSchema = z
  .object({ error: z.string().optional(), message: z.string().optional() })
  .passthrough()

interface WdRequestOptions {
  readonly method: "GET" | "POST" | "DELETE"
  readonly base: string
  readonly path: string
  readonly body?: unknown
  readonly timeoutMs?: number
  readonly what: string
}

async function wdRequest(opts: WdRequestOptions): Promise<unknown> {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_CALL_TIMEOUT_MS
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  let res: Response
  try {
    res = await fetch(`${opts.base}${opts.path}`, {
      method: opts.method,
      headers: opts.body === undefined ? undefined : { "content-type": "application/json" },
      body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
      signal: controller.signal,
    })
  } catch (err) {
    const reason =
      err instanceof Error && err.name === "AbortError"
        ? `timed out after ${timeoutMs}ms`
        : `transport error: ${err instanceof Error ? err.message : String(err)}`
    throw new OperationalError(
      `Appium ${opts.what} ${reason} (${opts.base}). The Appium server must be up at that address.`
    )
  } finally {
    clearTimeout(timer)
  }

  const parsed = envelopeSchema.safeParse(await res.json().catch(() => ({ value: null })))
  if (!parsed.success) {
    throw new OperationalError(`Appium ${opts.what} returned an unparseable response body`)
  }
  if (!res.ok) {
    const errValue = errorValueSchema.safeParse(parsed.data.value)
    const detail = errValue.success
      ? `${errValue.data.error ?? "error"}: ${errValue.data.message ?? ""}`.trim()
      : `HTTP ${res.status}`
    throw new OperationalError(`Appium ${opts.what} failed — ${detail}`)
  }
  return parsed.data.value
}

export async function appiumReady(base: string): Promise<boolean> {
  try {
    const value = await wdRequest({
      method: "GET",
      base,
      path: "/status",
      timeoutMs: STATUS_TIMEOUT_MS,
      what: "status",
    })
    const parsed = z.object({ ready: z.boolean() }).passthrough().safeParse(value)
    return parsed.success && parsed.data.ready
  } catch {
    return false
  }
}

export async function createSession(base: string, capabilities: unknown): Promise<string> {
  const value = await wdRequest({
    method: "POST",
    base,
    path: "/session",
    body: { capabilities: { alwaysMatch: capabilities, firstMatch: [{}] } },
    timeoutMs: SESSION_CREATE_TIMEOUT_MS,
    what: "session create",
  })
  const parsed = z.object({ sessionId: z.string() }).passthrough().safeParse(value)
  if (!parsed.success) {
    throw new OperationalError("Appium session create returned no sessionId")
  }
  return parsed.data.sessionId
}

export async function deleteSession(base: string, sessionId: string): Promise<void> {
  await wdRequest({
    method: "DELETE",
    base,
    path: `/session/${sessionId}`,
    what: "session delete",
  })
}

export async function getContexts(base: string, sessionId: string): Promise<readonly string[]> {
  const value = await wdRequest({
    method: "GET",
    base,
    path: `/session/${sessionId}/contexts`,
    what: "contexts",
  })
  const parsed = z.array(z.string()).safeParse(value)
  if (!parsed.success) {
    throw new OperationalError("Appium contexts returned a non-string-array value")
  }
  return parsed.data
}

export async function setContext(base: string, sessionId: string, name: string): Promise<void> {
  await wdRequest({
    method: "POST",
    base,
    path: `/session/${sessionId}/context`,
    body: { name },
    what: "context switch",
  })
}

export async function executeScript(
  base: string,
  sessionId: string,
  script: string,
  args: readonly unknown[] = []
): Promise<unknown> {
  return wdRequest({
    method: "POST",
    base,
    path: `/session/${sessionId}/execute/sync`,
    body: { script, args },
    what: "execute/sync",
  })
}

export async function findElement(
  base: string,
  sessionId: string,
  using: string,
  value: string
): Promise<string> {
  const result = await wdRequest({
    method: "POST",
    base,
    path: `/session/${sessionId}/element`,
    body: { using, value },
    what: `find element (${using}=${value})`,
  })
  return extractElementId(result)
}

export async function activeElement(base: string, sessionId: string): Promise<string> {
  const result = await wdRequest({
    method: "GET",
    base,
    path: `/session/${sessionId}/element/active`,
    what: "active element",
  })
  return extractElementId(result)
}

export async function clickElement(
  base: string,
  sessionId: string,
  elementId: string
): Promise<void> {
  await wdRequest({
    method: "POST",
    base,
    path: `/session/${sessionId}/element/${elementId}/click`,
    body: {},
    what: "element click",
  })
}

export async function elementSendKeys(
  base: string,
  sessionId: string,
  elementId: string,
  text: string
): Promise<void> {
  await wdRequest({
    method: "POST",
    base,
    path: `/session/${sessionId}/element/${elementId}/value`,
    body: { text, value: [...text] },
    what: "element send keys",
  })
}

export async function tapCoordinates(
  base: string,
  sessionId: string,
  x: number,
  y: number
): Promise<void> {
  await wdRequest({
    method: "POST",
    base,
    path: `/session/${sessionId}/actions`,
    body: {
      actions: [
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x, y },
            { type: "pointerDown", button: 0 },
            { type: "pause", duration: 60 },
            { type: "pointerUp", button: 0 },
          ],
        },
      ],
    },
    what: "coordinate tap",
  })
}

export interface LongPressDragSpec {
  readonly x: number
  readonly y: number
  readonly toX: number
  readonly toY: number
  readonly holdMs: number
  readonly steps: number
  readonly stepMs: number
}

type PointerAction =
  | {
      readonly type: "pointerMove"
      readonly duration: number
      readonly x: number
      readonly y: number
    }
  | { readonly type: "pointerDown"; readonly button: number }
  | { readonly type: "pointerUp"; readonly button: number }
  | { readonly type: "pause"; readonly duration: number }

interface FingerActionsBody {
  readonly actions: readonly {
    readonly type: "pointer"
    readonly id: string
    readonly parameters: { readonly pointerType: "touch" }
    readonly actions: readonly PointerAction[]
  }[]
}

export function buildLongPressDragActions(spec: LongPressDragSpec): FingerActionsBody {
  const moves: PointerAction[] = []
  for (let i = 1; i <= spec.steps; i++) {
    const t = i / spec.steps
    moves.push({
      type: "pointerMove",
      duration: spec.stepMs,
      x: Math.round(spec.x + (spec.toX - spec.x) * t),
      y: Math.round(spec.y + (spec.toY - spec.y) * t),
    })
  }
  return {
    actions: [
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: spec.x, y: spec.y },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: spec.holdMs },
          ...moves,
          { type: "pause", duration: 60 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ],
  }
}

export async function longPressDrag(
  base: string,
  sessionId: string,
  spec: LongPressDragSpec
): Promise<void> {
  await wdRequest({
    method: "POST",
    base,
    path: `/session/${sessionId}/actions`,
    body: buildLongPressDragActions(spec),
    what: "long-press drag",
  })
}

export async function screenshot(base: string, sessionId: string): Promise<Buffer> {
  const value = await wdRequest({
    method: "GET",
    base,
    path: `/session/${sessionId}/screenshot`,
    what: "screenshot",
  })
  const parsed = z.string().safeParse(value)
  if (!parsed.success) {
    throw new OperationalError("Appium screenshot returned a non-base64 value")
  }
  return Buffer.from(parsed.data, "base64")
}

export async function dismissAlert(base: string, sessionId: string): Promise<void> {
  try {
    await wdRequest({
      method: "POST",
      base,
      path: `/session/${sessionId}/alert/dismiss`,
      body: {},
      what: "alert dismiss",
    })
  } catch {}
}

export function pickWebviewContext(contexts: readonly string[]): string | undefined {
  return contexts.find((c) => c.startsWith("WEBVIEW_"))
}

export function extractElementId(value: unknown): string {
  const parsed = z.object({ [ELEMENT_KEY]: z.string() }).safeParse(value)
  if (!parsed.success) {
    throw new OperationalError("WebDriver response carried no element reference (matched nothing)")
  }
  return parsed.data[ELEMENT_KEY]
}
