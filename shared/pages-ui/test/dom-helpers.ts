export function requireInput(parent: ParentNode, selector: string): HTMLInputElement {
  const el = parent.querySelector(selector)
  if (!(el instanceof HTMLInputElement)) {
    throw new Error(`expected HTMLInputElement matching ${selector}, got ${describe(el)}`)
  }
  return el
}

export function requireTextarea(parent: ParentNode, selector: string): HTMLTextAreaElement {
  const el = parent.querySelector(selector)
  if (!(el instanceof HTMLTextAreaElement)) {
    throw new Error(`expected HTMLTextAreaElement matching ${selector}, got ${describe(el)}`)
  }
  return el
}

export function requireAnchor(parent: ParentNode, selector: string): HTMLAnchorElement {
  const el = parent.querySelector(selector)
  if (!(el instanceof HTMLAnchorElement)) {
    throw new Error(`expected HTMLAnchorElement matching ${selector}, got ${describe(el)}`)
  }
  return el
}

export function requireElement(parent: ParentNode, selector: string): HTMLElement {
  const el = parent.querySelector(selector)
  if (!(el instanceof HTMLElement)) {
    throw new Error(`expected HTMLElement matching ${selector}, got ${describe(el)}`)
  }
  return el
}

export function asInput(el: Element | null | undefined): HTMLInputElement {
  if (!(el instanceof HTMLInputElement)) {
    throw new Error(`expected HTMLInputElement, got ${describe(el)}`)
  }
  return el
}

export function asTextarea(el: Element | null | undefined): HTMLTextAreaElement {
  if (!(el instanceof HTMLTextAreaElement)) {
    throw new Error(`expected HTMLTextAreaElement, got ${describe(el)}`)
  }
  return el
}

export function asAnchor(el: Element | null | undefined): HTMLAnchorElement {
  if (!(el instanceof HTMLAnchorElement)) {
    throw new Error(`expected HTMLAnchorElement, got ${describe(el)}`)
  }
  return el
}

export function asHTMLElement(el: Element | null | undefined): HTMLElement {
  if (!(el instanceof HTMLElement)) {
    throw new Error(`expected HTMLElement, got ${describe(el)}`)
  }
  return el
}

function describe(value: unknown): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined"
  if (value instanceof Element) return value.tagName.toLowerCase()
  return typeof value
}
