export const SUBAGENT_HEADER = "x-claude-code-agent-id"

const STOPPED_STATUS = 400

const STOPPED_STATUS_TEXT = "Bad Request"

const STOPPED_ERROR_TYPE = "invalid_request_error"

export type HeldSubagents = {
  readonly has: (own: string) => boolean
  readonly taken?: (own: string) => undefined
}

export const NONE_HELD: HeldSubagents = { has: () => false }

type StoppedErrorBody = {
  readonly type: "error"
  readonly error: { readonly type: "invalid_request_error"; readonly message: string }
}

export function subagentIn(req: Request): string | null {
  const said = req.headers.get(SUBAGENT_HEADER)
  if (said === null) return null
  const own = said.trim()
  return own === "" ? null : own
}

function stoppedMessage(own: string): string {
  return (
    `subagent ${own} was stopped from the agents panel, so this turn is refused ` +
    "and every later turn of that subagent is refused too"
  )
}

export function stoppedBody(own: string): StoppedErrorBody {
  return { type: "error", error: { type: STOPPED_ERROR_TYPE, message: stoppedMessage(own) } }
}

export function stoppedResponse(own: string): Response {
  return new Response(JSON.stringify(stoppedBody(own)), {
    status: STOPPED_STATUS,
    statusText: STOPPED_STATUS_TEXT,
    headers: { "content-type": "application/json" },
  })
}

export function refusalFor(req: Request, held: HeldSubagents): Response | null {
  const own = subagentIn(req)
  if (own === null) return null
  if (!held.has(own)) return null
  held.taken?.(own)
  return stoppedResponse(own)
}
