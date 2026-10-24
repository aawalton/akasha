"use client"

import { useSyncExternalStore } from "react"

export const SCHEMES = ["dark", "light", "system"] as const

export type Scheme = (typeof SCHEMES)[number]

const STORED_AT = "scheme"

const CHOSEN = "scheme"

const UNCHOSEN: Scheme = "dark"

function isScheme(value: unknown): value is Scheme {
  return typeof value === "string" && SCHEMES.some((one) => one === value)
}

export function storedScheme(): Scheme {
  try {
    const held = localStorage.getItem(STORED_AT)
    return isScheme(held) ? held : UNCHOSEN
  } catch {
    return UNCHOSEN
  }
}

export function chooseScheme(scheme: Scheme): undefined {
  try {
    localStorage.setItem(STORED_AT, scheme)
  } catch {
    return
  }
  window.dispatchEvent(new Event(CHOSEN))
}

function subscribe(changed: () => void): () => void {
  window.addEventListener(CHOSEN, changed)
  window.addEventListener("storage", changed)
  return () => {
    window.removeEventListener(CHOSEN, changed)
    window.removeEventListener("storage", changed)
  }
}

function unknownOnServer(): Scheme | null {
  return null
}

export function useScheme(): Scheme | null {
  return useSyncExternalStore(subscribe, storedScheme, unknownOnServer)
}
