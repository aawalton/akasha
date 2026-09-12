function waitForScrollEnd(): Promise<void> {
  return new Promise((resolve) => {
    window.addEventListener("scrollend", () => resolve(), { once: true })
  })
}

function highlightCard(el: HTMLElement) {
  el.classList.remove("scroll-target")
  void el.offsetWidth
  el.classList.add("scroll-target")
  el.addEventListener("animationend", () => el.classList.remove("scroll-target"), { once: true })
}

function flashTab(): Promise<void> {
  return new Promise((resolve) => {
    const trigger = document.querySelector<HTMLElement>(
      '[data-slot="tabs-trigger"][data-state="active"]'
    )
    if (!trigger) {
      resolve()
      return
    }
    trigger.classList.remove("tab-flash")
    void trigger.offsetWidth
    trigger.classList.add("tab-flash")
    setTimeout(resolve, 400)
    trigger.addEventListener("animationend", () => trigger.classList.remove("tab-flash"), {
      once: true,
    })
  })
}

export function collapseCard(cardId: string) {
  const el = document.querySelector<HTMLElement>(`#${CSS.escape(cardId)}`)
  if (el?.getAttribute("data-state") === "open") {
    el.querySelector<HTMLElement>('[data-slot="collapsible-trigger"]')?.click()
  }
}

function waitForCard(cardId: string, timeoutMs: number): Promise<HTMLElement | null> {
  const selector = `#${CSS.escape(cardId)}:not([inert] *)`
  const immediate = document.querySelector<HTMLElement>(selector)
  if (immediate) return Promise.resolve(immediate)
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const el = document.querySelector<HTMLElement>(selector)
      if (el) {
        observer.disconnect()
        clearTimeout(timer)
        resolve(el)
      }
    })
    const timer = setTimeout(() => {
      observer.disconnect()
      resolve(null)
    }, timeoutMs)
    observer.observe(document.body, { childList: true, subtree: true })
  })
}

export async function scrollToCard(cardId: string, tabChanged: boolean) {
  if (tabChanged) {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      await waitForScrollEnd()
    }

    await flashTab()
  }

  const el = await waitForCard(cardId, 2000)
  if (!el) return

  if (el.getAttribute("data-state") === "closed") {
    el.querySelector<HTMLElement>('[data-slot="collapsible-trigger"]')?.click()
    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))
  }

  const rect = el.getBoundingClientRect()
  const margin = 24
  const alreadyVisible = rect.top >= margin && rect.bottom <= window.innerHeight - margin

  if (!alreadyVisible) {
    const top =
      rect.height + margin * 2 <= window.innerHeight
        ? window.scrollY + rect.bottom - window.innerHeight + margin
        : window.scrollY + rect.top - margin
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
    await waitForScrollEnd()
  }

  highlightCard(el)
}
