import { listedAt } from "@akasha/indexes"
import { renamePage } from "../../../../changes/refactor-changes/pages/rename-page/rename-page.refactor-change.code.ts"
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
  const renamed = renamePage(
    root,
    plural === undefined ? { at, to } : { at, to, plural },
    bodyTextOf(root, baseOf(root))
  )
  const moved = renamed.moved
  const bodies = renamed.bodies
  if (moved === null || bodies === null) {
    return answering([], [renamed.refused ?? `\`${was}\` was not renamed`], 1)
  }
  const said = saidUnder(moved, bodies)
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
