const VERSION = "2023-06-01"
const BETA = "oauth-2025-04-20"
const SYSTEM = "You are Claude Code, Anthropic's official CLI for Claude."
const TRIES = 4
const ABREAST = 4
const UNREACHED = 3
const WAITING = 2000
const LONGEST = 8000

const AGAIN: ReadonlySet<number> = new Set([408, 409, 429, 500, 502, 503, 504, 529])

const UNREACHED_SAID = "the model could not be reached"

export type Asking = {
  readonly model: string
  readonly prompts: readonly string[]
}

function tokenIn(held: unknown): string | null {
  if (typeof held !== "object" || held === null) return null
  for (const [key, value] of Object.entries(held)) {
    if (key.toLowerCase().includes("access") && typeof value === "string") return value
    const deeper = tokenIn(value)
    if (deeper !== null) return deeper
  }
  return null
}

async function credential(): Promise<string> {
  const at = process.env["CLAUDE_CODE_HOST_CREDS_FILE"]
  if (at === undefined) throw new Error("no CLAUDE_CODE_HOST_CREDS_FILE stands in the environment")
  const held: unknown = JSON.parse(await Bun.file(at).text())
  const token = tokenIn(held)
  if (token === null) throw new Error("the credentials file names no access token")
  return token
}

function endpoint(): string {
  const at = process.env["ANTHROPIC_BASE_URL"]
  if (at === undefined) throw new Error("no ANTHROPIC_BASE_URL stands in the environment")
  return `${at.replace(/\/+$/, "")}/v1/messages`
}

function textIn(held: unknown): string {
  const content =
    typeof held === "object" && held !== null ? (held as { content?: unknown }).content : undefined
  if (!Array.isArray(content) || content.length === 0) throw new Error("the model answered nothing")
  const first: unknown = content[0]
  const text =
    typeof first === "object" && first !== null ? (first as { text?: unknown }).text : undefined
  if (typeof text !== "string") throw new Error("the model answered no text")
  return text
}

async function waiting(ms: number): Promise<undefined> {
  await new Promise((settle) => setTimeout(settle, ms))
  return undefined
}

type Waited = { readonly text: string } | { readonly again: number | null }

function adviceIn(said: string | null): number | null {
  if (said === null) return null
  const held = Number(said)
  return Number.isFinite(held) && held > 0 ? Math.round(held * 1000) : null
}

async function once(at: string, token: string, model: string, prompt: string): Promise<Waited> {
  let answered: Response
  try {
    answered = await fetch(at, {
      method: "POST",
      headers: {
        "anthropic-version": VERSION,
        "anthropic-beta": BETA,
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 10,
        system: [{ type: "text", text: SYSTEM }],
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(120000),
    })
  } catch {
    return { again: null }
  }
  if (answered.ok) return { text: textIn(await answered.json()) }
  if (!AGAIN.has(answered.status)) {
    throw new Error(`${UNREACHED_SAID} — the model answered ${answered.status}`)
  }
  return { again: adviceIn(answered.headers.get("retry-after")) }
}

async function answerTo(at: string, token: string, model: string, prompt: string): Promise<string> {
  let wait = WAITING
  for (let tried = 0; tried < TRIES; tried += 1) {
    let held: Waited
    try {
      held = await once(at, token, model, prompt)
    } catch (thrown) {
      throw new Error(`${UNREACHED_SAID} — ${String(thrown)}`)
    }
    if ("text" in held) return held.text
    await waiting(Math.min(held.again ?? wait, LONGEST))
    wait = Math.min(wait * 2, LONGEST)
  }
  throw new Error(`${UNREACHED_SAID} after ${TRIES} tries`)
}

export async function modelAsking(asking: Asking): Promise<readonly string[]> {
  const at = endpoint()
  const token = await credential()
  const answers: string[] = new Array(asking.prompts.length).fill("")
  let next = 0
  async function drawing(): Promise<undefined> {
    for (;;) {
      const mine = next
      next += 1
      if (mine >= asking.prompts.length) return undefined
      const prompt = asking.prompts[mine]
      if (prompt === undefined) return undefined
      answers[mine] = await answerTo(at, token, asking.model, prompt)
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(ABREAST, asking.prompts.length) }, () => drawing())
  )
  return answers
}

function askingIn(held: unknown): Asking {
  const model =
    typeof held === "object" && held !== null ? (held as { model?: unknown }).model : undefined
  const prompts =
    typeof held === "object" && held !== null ? (held as { prompts?: unknown }).prompts : undefined
  if (typeof model !== "string") throw new Error("the job names no model")
  if (!Array.isArray(prompts) || prompts.some((one) => typeof one !== "string")) {
    throw new Error("the job carries no prompts")
  }
  return { model, prompts }
}

async function answering(): Promise<undefined> {
  const said = await Bun.stdin.text()
  let answers: readonly string[]
  try {
    answers = await modelAsking(askingIn(JSON.parse(said)))
  } catch (thrown) {
    const why = String(thrown)
    process.stderr.write(why)
    process.exit(UNREACHED)
  }
  process.stdout.write(JSON.stringify({ answers }))
  return undefined
}

if (import.meta.main) await answering()
