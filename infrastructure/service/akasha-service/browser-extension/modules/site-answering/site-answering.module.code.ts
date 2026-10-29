export const SITE = "https://alanwalton.com"

const ANSWER_MS = 15_000

export const ASKING = {
  method: "POST",
  credentials: "include",
  headers: { accept: "application/json", "content-type": "application/json" },
} as const

export async function answerTo(path: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(`${SITE}${path}`, { ...init, signal: AbortSignal.timeout(ANSWER_MS) })
  } catch (thrown) {
    if (thrown instanceof DOMException && thrown.name === "TimeoutError") {
      throw new Error("alanwalton.com did not answer, so try again in a minute")
    }
    throw thrown
  }
}
