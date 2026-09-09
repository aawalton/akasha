import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"
import {
  namedIn,
  quoted,
  ran,
} from "../../../modules/seat-act-calling/seat-act-calling.module.code.ts"

const RESUME = "resume"

const PROMPT = "--prompt"

const START_MODE = "--start-mode"

const TARGET = "--agent-id"

type Carried = { readonly carried: readonly string[] }

function carriedIn(
  word: string,
  taking: readonly string[],
  flags: readonly string[]
): Carried | Answer {
  const held: string[] = []
  for (let at = 0; at < flags.length; at = at + 2) {
    const one = flags[at]
    if (one !== undefined && taking.includes(one)) {
      const value = flags[at + 1]
      if (value === undefined) {
        return refused(`\`${one}\` names what follows it, and nothing did`, 1)
      }
      held.push(one, value)
      continue
    }
    return refused(
      `\`${word}\` takes ${quoted(taking)} and nothing else, and ` +
        `${quoted(flags.slice(at, at + 1))} followed it`,
      1
    )
  }
  return { carried: held }
}

export async function seatResume(argv: readonly string[], given: Given): Promise<Answer> {
  const named = namedIn(given.calledAs, RESUME, argv)
  if (!("name" in named)) return named
  const carried = carriedIn(given.calledAs, [PROMPT, START_MODE], argv.slice(1))
  if (!("carried" in carried)) return carried
  const { default: resuming } = await import("@akasha/seat-system/seat-resume")
  return await ran(async () => {
    await resuming([TARGET, named.name, ...carried.carried])
  })
}
