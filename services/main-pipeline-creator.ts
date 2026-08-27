#!/usr/bin/env bun
export const tool = {
  summary: "Create the main pipeline for the commit the merge queue last landed",
  repos: ["instructions"],
} as const

import { resolveRoots } from "../repo/roots/roots"
import {
  LOG,
  runBoundedMainPipelineCreatorTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "../tools/lib/main-pipeline-creator/tick.ts"

const WRITER = "main-pipeline-creator"

const HELP = `bun services/main-pipeline-creator.ts — one main pipeline per commit that lands

One workstation process. Every ${TICK_MS / 1000} seconds it reads the merge queue's
\`main-commit\`, asks whether a pipeline page already stands for \`main\` at that commit, and
creates one where none does. A commit that already has exactly one pipeline is left alone, and
two at one commit are reported rather than added to.

Everything it reads and everything it writes is a file. The pipeline, its workflows and their
steps are written as pages with \`writePage\`, in one pass: the seqs for all three are minted
first, because a workflow names its pipeline by seq and a step names both, so nothing can be
written until every number is known. A step's file states only what the step IS — its name, the
pipeline and workflow it belongs to, what it depends on and what gates it — and its definition
goes to the gitignored sidecar beside it.

Creating a pipeline overtakes every \`pending\` pipeline standing on \`main\`, stamping
\`overtaken-by-seq\` on each. One that is already \`dispatching\` or \`running\` is not overtaken:
it runs to its verdict, and the new pipeline names it under \`main-predecessor-seqs\` and waits
behind it.

Which workflows a pipeline gets is decided against the commit's own tree. The tree is extracted
under /var/tmp, the dispatch graph is built over it, and the workflow configuration is read from
it. A graph with no package edges, or one missing a node for a changed file that was not deleted,
ends the tick rather than creating a pipeline that would dispatch the wrong set.

The commit the diff is folded against is the last commit on \`main\` that was pipelined, where
that commit is an ancestor of this one, and this commit's parent otherwise. A commit that is
already an ancestor of a pipelined commit is proven covered and creates nothing.

A tick that has not answered inside ${TICK_CEILING_MS / 1000} seconds ends the process rather
than starting a second one beside it, and systemd restarts it.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/main-pipeline-creator.ts
  --help  This.

Environment:
  CODE_ROOT     The code checkout the commit is read from. Defaults to the standard one.
  MEMORY_ROOT   The repository the pipeline, workflow and step pages are written to.
`

function sleepAbortable(ms: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false)
  return new Promise<boolean>((resolve) => {
    const cleanup = (): undefined => {
      clearTimeout(timer)
      signal.removeEventListener("abort", onAbort)
    }
    const onAbort = (): undefined => {
      cleanup()
      resolve(false)
    }
    const timer = setTimeout(() => {
      cleanup()
      resolve(true)
    }, ms)
    signal.addEventListener("abort", onAbort, { once: true })
  })
}

async function main(): Promise<void> {
  if (process.argv.slice(2).some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }

  process.env.AGENT_ID = WRITER
  process.env.ACTING_AGENT_ID = ""

  const ac = new AbortController()
  process.on("SIGTERM", () => ac.abort())
  process.on("SIGINT", () => ac.abort())

  const roots = resolveRoots()

  console.log(
    `${LOG} starting tick loop pid=${process.pid} tick=${TICK_MS}ms ceiling=${TICK_CEILING_MS}ms`
  )

  while (!ac.signal.aborted) {
    try {
      await runBoundedMainPipelineCreatorTick(roots, ac.signal)
    } catch (err) {
      if (!ac.signal.aborted) console.error(`${LOG} tick threw:`, err)
    }
    const slept = await sleepAbortable(TICK_MS, ac.signal)
    if (!slept) break
  }

  console.log(`${LOG} stopping`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${LOG} fatal:`, err)
    process.exit(1)
  })
}
