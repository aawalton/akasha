import { emitStoreDiagnostic } from "./diagnostics"

let hydrateOverrunEmitted = false

export function reportPagesStoreStall(): undefined {
  if (hydrateOverrunEmitted) return undefined
  hydrateOverrunEmitted = true
  emitStoreDiagnostic({
    reason: "hydrate-overrun",
    message: "pages-ui-store hydrate overran threshold; the network or the page fetch stalled",
    detail: "hydration did not complete within the app's overrun threshold",
  })
  return undefined
}
