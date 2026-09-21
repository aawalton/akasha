import { musicCapture } from "akasha/command/pages/music/capture/music-capture.command.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const CALLED_AS = "akasha music capture"

export async function runService(): Promise<void> {
  const root = akashaRoot()
  const said = await musicCapture([], {
    root,
    calledAs: CALLED_AS,
    from: root,
    writer: null,
    agentId: null,
  })
  for (const one of said.report) process.stdout.write(`${one}\n`)
  for (const one of said.refusals) process.stdout.write(`${one}\n`)
  if (said.code !== 0) process.exit(said.code)
}
