import type { SeatResumeDriver } from "@akasha/seat-system/seat-resume-driver"

export type { SeatResumeDriver }

export type ParsedArgs = {
  prompt: string
  resume: boolean
  account: string
  sessionId: string | undefined
  agentId: string | undefined
  headless: boolean
  exitAfterIterations?: number
  modelOverride?: string
  anthropicBaseUrl?: string
  anthropicAuthToken?: string
}

export type SeatResume =
  | { readonly resume: false }
  | {
      readonly resume: true
      readonly driver: SeatResumeDriver
    }

export function decideBootResume(opts: {
  resume: boolean
  sessionId: string | undefined
  prompt: string
  headless: boolean
}): SeatResume {
  if (!opts.resume && opts.sessionId == null) return { resume: false }
  if (opts.prompt !== "") return { resume: true, driver: "argv-prompt" }
  return { resume: true, driver: opts.headless ? "awaiting-inbound" : "operator-prompt" }
}

export function parseArgs(argv: readonly string[]): ParsedArgs {
  const args = [...argv]

  let resume = false
  let account = ""
  let sessionId: string | undefined
  let agentId: string | undefined
  let headless = false
  let exitAfterIterations: number | undefined
  let modelOverride: string | undefined
  let anthropicBaseUrl: string | undefined
  let anthropicAuthToken: string | undefined
  while (args.length > 0) {
    const head = args[0]
    if (head === undefined || !head.startsWith("-")) break
    if (head === "-r" || head === "--resume") {
      resume = true
      args.shift()
    } else if (head === "--headless") {
      headless = true
      args.shift()
    } else if (head === "-a" || head === "--account") {
      args.shift()
      account = args.shift() ?? ""
    } else if (head === "--session-id") {
      args.shift()
      sessionId = args.shift()
    } else if (head === "--agent-id") {
      args.shift()
      agentId = args.shift()
    } else if (head === "--exit-after-iterations") {
      args.shift()
      const raw = args.shift() ?? ""
      const n = Number(raw)
      if (!Number.isInteger(n) || n <= 0) {
        throw new Error(`--exit-after-iterations: expected positive integer, got "${raw}"`)
      }
      exitAfterIterations = n
    } else if (head === "--model") {
      args.shift()
      modelOverride = args.shift()
    } else if (head === "--anthropic-base-url") {
      args.shift()
      anthropicBaseUrl = args.shift()
    } else if (head === "--anthropic-auth-token") {
      args.shift()
      anthropicAuthToken = args.shift()
    } else {
      break
    }
  }

  const prompt = args.join(" ")
  return {
    prompt,
    resume,
    account,
    sessionId,
    agentId,
    headless,
    exitAfterIterations,
    modelOverride,
    anthropicBaseUrl,
    anthropicAuthToken,
  }
}

export function buildReExecArgv(opts: {
  originalArgv: readonly string[]
  agentId: string
  sessionId: string
}): readonly string[] {
  const stripped: string[] = []
  let skipNext = false
  for (const a of opts.originalArgv) {
    if (skipNext) {
      skipNext = false
      continue
    }
    if (a === "--agent-id" || a === "--session-id") {
      skipNext = true
      continue
    }
    if (a === "-r" || a === "--resume") continue
    stripped.push(a)
  }
  let insertAt = stripped.length
  let skipNextStripped = false
  for (const [i, a] of stripped.entries()) {
    if (skipNextStripped) {
      skipNextStripped = false
      continue
    }
    if (!a.startsWith("-")) {
      insertAt = i
      break
    }
    if (
      a === "-a" ||
      a === "--account" ||
      a === "--model" ||
      a === "--anthropic-base-url" ||
      a === "--anthropic-auth-token"
    ) {
      skipNextStripped = true
    }
  }
  const injected = ["--agent-id", opts.agentId, "--session-id", opts.sessionId, "--resume"]
  return [...stripped.slice(0, insertAt), ...injected, ...stripped.slice(insertAt)]
}
