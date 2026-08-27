export const OPEN_QUESTIONS_RESYNC_EVENT = "open-questions:resync"

export function dispatchOpenQuestionsResync(): undefined {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(OPEN_QUESTIONS_RESYNC_EVENT))
}
