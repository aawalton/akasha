import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicCapture } from "akasha/command/pages/music/capture/music-capture.command.code.ts"
import { musicHeardTracks } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
import { musicReleaseParts } from "akasha/command/pages/music/release-parts/music-release-parts.command.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

type Step = {
  readonly calledAs: string
  readonly run: (argv: readonly string[], given: never) => Promise<Answer>
}

const STEPS: readonly Step[] = [
  { calledAs: "akasha music capture", run: musicCapture as Step["run"] },
  { calledAs: "akasha music heard-tracks", run: musicHeardTracks as Step["run"] },
  { calledAs: "akasha music release-parts", run: musicReleaseParts as Step["run"] },
]

function said(answer: Answer): undefined {
  for (const one of answer.report) process.stdout.write(`${one}\n`)
  for (const one of answer.refusals) process.stdout.write(`${one}\n`)
}

export async function runService(): Promise<void> {
  const root = akashaRoot()
  const outside = { root, from: root, writer: null, agentId: null }
  for (const step of STEPS) {
    const answer = await step.run([], { ...outside, calledAs: step.calledAs } as never)
    said(answer)
    if (answer.code !== 0) return process.exit(answer.code)
  }
}
