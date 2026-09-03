import type { Answer } from "@akasha/command-system/calling"
import { copActivate, findCop } from "@akasha/inference-pool/cop-admin"
import {
  aloneIn,
  answering,
  heldOr,
  refusalIn,
  refusedBy,
  told,
  wordsIn,
} from "../inference-answering/inference-answering.module.code.ts"

export async function inferenceActivate(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)

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
