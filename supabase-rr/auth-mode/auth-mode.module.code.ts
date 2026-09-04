export type BrowserAuthMode = "capacitor-local" | "cookie-ssr"

export function resolveBrowserAuthMode(protocol: string | undefined): BrowserAuthMode {
  return protocol === "capacitor:" ? "capacitor-local" : "cookie-ssr"
}
