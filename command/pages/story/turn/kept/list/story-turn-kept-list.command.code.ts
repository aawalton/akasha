import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { saidOf } from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { storyTurnKeptList as page } from "akasha/command/pages/story/turn/kept/list/story-turn-kept-list.command.ts"
import {
  type Fit,
  fittedBeside,
  turnAtOf,
  turnSlugOf,
} from "akasha/command/pages/story/turn/modules/turn-keeping/turn-keeping.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const NAMED = [playedTurn] as const

export function fitSaid(fit: Fit): string {
  if (fit === "fits") return "fits the pages as they are now"
  if (fit === "rederived") return "derived again from the lines it changes, and fits the pages now"
  if (fit === "landed") return "the page holds its new lines already"
  return `fits nothing: ${fit.unfit}`
}

export function storyTurnKeptList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const named = read.taken.playedTurn.trim()
  const turn = turnAtOf(given.root, named)
  if (turn === null) return refused(`\`${named}\` names no played turn here`, DATA)
  const fitted = fittedBeside(given.root, turn)
  if ("refused" in fitted) return refused(fitted.refused, DATA)
  const went = counted(fitted.landed, "kept edit")
  const landed = fitted.landed === 0 ? [] : [`${went} whose new lines the pages hold already went`]
  if (fitted.rows.length === 0) return told([...landed, `no edit is kept beside \`${turn}\``])
  const rows = fitted.rows.map(
    (one, at) => `${String(at + 1)}. ${saidOf(one)} — ${fitSaid(fitted.fits[at] ?? "fits")}`
  )
  const slug = turnSlugOf(turn)
  const drop = `\`akasha story turn kept drop --turn ${slug} --record <number>\``
  return told([...rows, ...landed, `${drop} takes one away without landing it`])
}
