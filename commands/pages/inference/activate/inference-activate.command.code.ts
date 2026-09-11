import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  aloneIn,
  heldOr,
  wasRefused,
  wordsIn,
} from "akasha/inference/commands/inference-answering/inference-answering.module.code.ts"
import { copActivate, findCop } from "akasha/inference/pool/cop-admin/cop-admin.module.code.ts"

export async function inferenceActivate(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  if (wasRefused(said)) return refusedBy(said.refused)

  const refusals: string[] = []
  const name = heldOr(aloneIn(said, "the pool service"), refusals) ?? undefined
  if (refusals.length > 0) return refusedBy(refusals)
  if (name === undefined) {
    return refusedBy(["this names the pool service made resident, and nothing did"])
  }

  return await answering(async () => {
    const cop = findCop()
    if (!cop.poolNames.includes(name)) {
      return refusedBy([
        `\`${name}\` is no pool service — the pool carries ${cop.poolNames.join(", ")}`,
      ])
    }
    const resident = await copActivate(cop, name)
    return told([`resident\t${resident.join(", ")}`])
  })
}
