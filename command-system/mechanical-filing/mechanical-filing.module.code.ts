import { landedMechanically } from "../asking/asking.module.code.ts"
import type { Answer, Given } from "../calling/calling.module.code.ts"
import { builtIn } from "../file-arguing/file-arguing.module.code.ts"
import type { Piping } from "../piping/piping.module.code.ts"

export async function filing(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const built = builtIn(argv, given, piping)
  if ("code" in built) return built
  return await landedMechanically(given.root, given.calledAs, built.changes, built.message)
}
