import type { Landing } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"

export function throwingAfter(wrote: readonly string[], thrown: Error): Landing {
  return async (_root, _asked, _message, writing) => {
    for (const one of wrote) writing?.done?.push(one)
    throw thrown
  }
}
