import { musicUnheardPlaylist } from "akasha/command/pages/music/unheard-playlist/music-unheard-playlist.command.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const CALLED_AS = "akasha music unheard-playlist"

export async function runService(): Promise<void> {
  const root = akashaRoot()
  const given = { root, from: root, writer: null, agentId: null, calledAs: CALLED_AS }
  const answer = await musicUnheardPlaylist([], given as never)
  for (const one of answer.report) process.stdout.write(`${one}\n`)
  for (const one of answer.refusals) process.stdout.write(`${one}\n`)
  if (answer.code !== 0) process.exit(answer.code)
}
