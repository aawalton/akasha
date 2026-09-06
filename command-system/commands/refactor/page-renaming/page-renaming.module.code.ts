import { listedAt } from "@akasha/indexes"
import type { Edit } from "../../../../changes/modules/change-answer/change-answer.module.types.ts"
import { worldAt } from "../../../../changes/modules/change-shadow/change-shadow.module.code.ts"
import { renamePage } from "../../../../changes/pages/rename-page/rename-page.change.code.ts"
import { counted } from "../../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../../calling/calling.module.code.ts"
import { answering } from "../../../calling/calling.module.code.ts"
import type { FileCarry } from "../../../landing/landing.module.code.ts"
import { baseOf } from "../../../landing/landing.module.code.ts"
import { VALUED } from "../arguing/refactor-arguing.module.code.ts"
import { bodyTextOf, respelledLanded, were } from "../landing/refactor-landing.module.code.ts"
import { pairFor } from "../slug-renaming/slug-renaming.module.code.ts"

export function saidUnder(
  moved: ReadonlyMap<string, string>,
  bodies: ReadonlyMap<string, string>
): ReadonlyMap<string, string> {
  const back = new Map<string, string>()
  for (const [from, to] of moved) back.set(to, from)
  const said = new Map<string, string>()
  for (const [path, body] of bodies) said.set(back.get(path) ?? path, body)
  return said
}

// A change answers one list of edits, and a landing takes the paths that moved apart from the
// bodies written, so the one list is read out here as the two maps a landing takes.
export function movedIn(edits: readonly Edit[]): ReadonlyMap<string, string> {
  const said = new Map<string, string>()
  for (const one of edits) {
    const came = one.from
    if (came !== undefined && came !== one.path) said.set(came, one.path)
  }
  return said
}

export function bodiesIn(edits: readonly Edit[]): ReadonlyMap<string, string> {
  const said = new Map<string, string>()
  for (const one of edits) if (one.body !== null) said.set(one.path, one.body)
  return said
}

function pageSaying(
  was: string,
  now: string,
  carried: number,
  repointing: number,
  dry: boolean
): readonly string[] {
  return [
    `\`${was}\` ${dry ? "would be renamed" : "was renamed"} to \`${now}\``,
    `${counted(carried, "file")} ${were(carried, dry)} carried`,
    repointing === 0
      ? "no file naming it needed repointing"
      : `${counted(repointing, "file")} naming it ${were(repointing, dry)} repointed`,
  ]
}

export async function pageLanded(
  given: Given,
  root: string,
  from: string,
  to: string,
  plural: string | undefined,
  argv: readonly string[]
): Promise<Answer> {
  const asked = pairFor(from, to, (pageTypeSlug, slug) => listedAt(root, pageTypeSlug, slug))
  if ("refused" in asked) return answering([], [asked.refused], 1)
  const was = asked.pair.was
  const at = asked.pair.from
  const world = worldAt(root, bodyTextOf(root, baseOf(root)))
  const renamed = renamePage(world, plural === undefined ? { at, to } : { at, to, plural })
  if (renamed.refused !== null) return answering([], [renamed.refused], 1)
  const moved = movedIn(renamed.edits)
  const said = saidUnder(moved, bodiesIn(renamed.edits))
  const carries: readonly FileCarry[] = [...moved].map(([one, two]) => ({ from: one, to: two }))
  const repointing = [...said.keys()].filter((path) => !moved.has(path)).length
  return await respelledLanded(
    given,
    root,
    said,
    `rename the page \`${was}\` to \`${to}\``,
    (dry) => pageSaying(was, to, carries.length, repointing, dry),
    false,
    argv,
    VALUED,
    carries
  )
}
