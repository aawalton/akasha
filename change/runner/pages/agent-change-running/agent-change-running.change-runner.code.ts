import type { Changes } from "akasha/change/runner/pages/agent-change-running/agent-change-running.change-runner.addressed.ts"

export type Asking = {
  [K in keyof Changes]: { readonly at: K; readonly given: Changes[K] }
}[keyof Changes]
