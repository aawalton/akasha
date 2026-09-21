import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicCapture } from "akasha/command/pages/music/capture/music-capture.command.code.ts"
import { musicHeardTracks } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const CAPTURING = "akasha music capture"

const MARKING = "akasha music heard-tracks"

function said(answer: Answer): undefined {
  for (const one of answer.report) process.stdout.write(`${one}\n`)
  for (const one of answer.refusals) process.stdout.write(`${one}\n`)
}

export async function runService(): Promise<void> {
  const root = akashaRoot()
  const outside = { root, from: root, writer: null, agentId: null }
  const filed = await musicCapture([], { ...outside, calledAs: CAPTURING })
  said(filed)
  if (filed.code !== 0) return process.exit(filed.code)
  const marked = await musicHeardTracks([], { ...outside, calledAs: MARKING })
  said(marked)
  if (marked.code !== 0) return process.exit(marked.code)
}
