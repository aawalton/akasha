import { pickingUngraded } from "akasha/alan/music/choosing/modules/ungraded-picking/ungraded-picking.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { plan } from "akasha/command/argument/pages/plan.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  jsonOf,
  keptOver,
  noPlaylistAt,
  REACHING,
  type Reach,
  rowsOf,
} from "akasha/command/pages/music/modules/playlist-keeping/playlist-keeping.module.code.ts"
import { musicUngradedPlaylist as page } from "akasha/command/pages/music/ungraded-playlist/music-ungraded-playlist.command.ts"

const UNGRADED = "ungraded"

const NAMED = [json, plan] as const

async function answered(argv: readonly string[], given: Given, reach: Reach): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  const kept = await keptOver(given.root, UNGRADED, pickingUngraded, read.taken.plan, reach)
  if (kept === null) return refused(noPlaylistAt(UNGRADED), DATA)
  return told(read.taken.json ? [jsonOf(kept)] : rowsOf(kept))
}

export async function musicUngradedPlaylist(
  argv: readonly string[],
  given: Given,
  reach: Reach = REACHING
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, reach))
}
