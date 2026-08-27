import { describe, expect, it } from "bun:test"
import { isWebKit } from "./is-webkit"

const WEBKIT_ENGINES = {
  "Safari (macOS)":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  "Safari (iOS)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  "Chrome for iOS (CriOS, WKWebView)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/110.0.5481.83 Mobile/15E148 Safari/604.1",
  "Firefox for iOS (FxiOS, WKWebView)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/110.0 Mobile/15E148 Safari/605.1.15",
  "Capacitor iOS WKWebView (no Safari/Version token)":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
} as const

const NON_WEBKIT = {
  "Chrome (desktop, Blink)":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Chrome (Android, Blink)":
    "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  "Edge (desktop, Blink)":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
  "Samsung Internet (Blink)":
    "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36",
  "Firefox (desktop, Gecko)":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
  "HappyDOM (headless test runtime)":
    "Mozilla/5.0 (X11; Linux x64) AppleWebKit/537.36 (KHTML, like Gecko) HappyDOM/20.10.6",
  "JSDOM (headless test runtime)":
    "Mozilla/5.0 (X11; Linux x64) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/24.0.0",
} as const

describe("isWebKit — WebKit engines classify true (never get infinite-WAV src)", () => {
  for (const [name, ua] of Object.entries(WEBKIT_ENGINES)) {
    it(name, () => expect(isWebKit(ua)).toBe(true))
  }
})

describe("isWebKit — Blink/Gecko classify false (keep the live stream)", () => {
  for (const [name, ua] of Object.entries(NON_WEBKIT)) {
    it(name, () => expect(isWebKit(ua)).toBe(false))
  }
})
