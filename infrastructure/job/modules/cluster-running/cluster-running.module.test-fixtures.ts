import type {
  Carrying,
  Pushing,
  Running,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import type { Ran } from "akasha/infrastructure/service/cluster/modules/workload-deploying/workload-deploying.module.code.ts"

export const COMMIT = "0123456789abcdef0123456789abcdef01234567"

export function ranOf(code: number, stdout = "", stderr = ""): Ran {
  return { argv: [], code, stdout, stderr }
}

export const carried: Carrying = () => ({ carried: true })

export const uncarried: Carrying = () => ({ carried: false })

export const pushed: Pushing = () => ({
  failed: false,
  line: "push:   pushed",
  remote: "origin",
  branch: "main",
  reason: null,
})

export const refusedPush: Pushing = () => ({
  failed: true,
  line: "push:   refused",
  remote: "origin",
  branch: "main",
  reason: "no remote",
})

export type Caught = {
  readonly running: Running
  readonly seen: string[][]
  readonly sent: () => string
}

export function capturing(answering: (argv: readonly string[]) => Ran = () => ranOf(0)): Caught {
  const seen: string[][] = []
  let sent = ""
  return {
    running: (argv, text) => {
      seen.push([...argv])
      if (text !== null) sent = text
      return answering(argv)
    },
    seen,
    sent: () => sent,
  }
}
