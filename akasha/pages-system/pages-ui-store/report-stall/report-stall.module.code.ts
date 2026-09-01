import { emitStoreDiagnostic } from "../diagnostics/diagnostics.module.code.ts"

let HYDRATE_OVERRUN_EMITTED = false

export function reportPagesStoreStall(): undefined {
  if (HYDRATE_OVERRUN_EMITTED) return undefined
  HYDRATE_OVERRUN_EMITTED = true
  emitStoreDiagnostic({
    reason: "hydrate-overrun",
    message: "pages-ui-store hydrate overran threshold; the network or the page fetch stalled",
    detail: "hydration did not complete within the app's overrun threshold",
  })
  return undefined
}
