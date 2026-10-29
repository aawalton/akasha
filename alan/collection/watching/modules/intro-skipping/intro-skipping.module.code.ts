import { told } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/site-telling/site-telling.module.code.ts"

const SKIPPING = /skip (intro|recap|credits|ending)/i

const SHOWN_MS = 4000

const BUTTONS =
  "button, [role='button'], a, [class*='skip'], [class*='Skip'], [data-testid*='skip']"

const LONGEST_WORDING = 40

const HELD = new WeakSet<object>()

export function skippable(wording: string | null | undefined): boolean {
  if (typeof wording !== "string") return false
  const words = wording.replace(/\s+/g, " ").trim()
  if (words.length > LONGEST_WORDING) return false
  return SKIPPING.test(words)
}

export type Pressable = {
  readonly textContent: string | null
  readonly getAttribute: (name: string) => string | null
  readonly click?: () => void
}

export type Buttons = {
  readonly querySelectorAll: (selectors: string) => Iterable<Pressable>
}

function wordsOf(one: Pressable): readonly string[] {
  return [one.textContent ?? "", one.getAttribute("aria-label") ?? ""]
}

export function pressedShown(root: Buttons): number {
  let pressed = 0
  for (const one of root.querySelectorAll(BUTTONS)) {
    if (HELD.has(one)) continue
    if (!wordsOf(one).some(skippable)) continue
    HELD.add(one)
    pressed += 1
    one.click?.()
  }
  return pressed
}

export function skipIntros(): undefined {
  const doc = document
  pressedShown(doc)
  told("Skip buttons are pressed as they appear", SHOWN_MS)
  new MutationObserver(() => {
    pressedShown(doc)
  }).observe(doc.documentElement, { childList: true, subtree: true })
}
