import { landingAsked, mistaking, wroteAndTook } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { builtIn, restatedIn } from "../../file-arguing/file-arguing.module.code.ts"
import type { Piping } from "../../piping/piping.module.code.ts"
import { inputIn } from "../../piping/piping.module.code.ts"

export async function writing(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const kind = restatedIn(argv, given)
  if ("refusals" in kind) return mistaking(kind.refusals)
  const built = builtIn(argv, kind.given, piping)
  if ("code" in built) return built
  return await landingAsked(kind.given, {
    changes: built.changes,
    message: built.message,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: (landed) => wroteAndTook(landed),
    draft: true,
  })
}

export async function write(argv: readonly string[], given: Given): Promise<Answer> {
  return await writing(argv, given, inputIn)
}
