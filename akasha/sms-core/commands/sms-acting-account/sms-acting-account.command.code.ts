import type { Answer, Given } from "@akasha/command-system/calling"
import { extractActingAccountUserId } from "../../acting-account/acting-account.module.code.ts"
import {
  heldAt,
  type Reading,
  refusedBy,
  told,
  wordsIn,
} from "../sms-command-reading/sms-command-reading.module.code.ts"

const SURFACE = "--surface-file"

const VALUED = [SURFACE]

const SWITCHES: readonly string[] = []

export type Read = {
  readonly surface: string
}

export function readIn(argv: readonly string[]): Reading<Read> {
  const said = wordsIn(argv, VALUED, SWITCHES)
  if ("refused" in said) return said
  const refusals = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const surface = said.named[SURFACE]
  if (surface === undefined) {
    refusals.push(`this names the surface to read at \`${SURFACE}\`, and nothing did`)
  }
  if (refusals.length > 0 || surface === undefined) return { refused: refusals }
  return { surface }
}

export function smsActingAccount(argv: readonly string[], given: Given): Answer {
  const said = readIn(argv)
  if ("refused" in said) return refusedBy(said.refused)
  const held = heldAt(given, SURFACE, said.surface)
  if ("refused" in held) return refusedBy(held.refused)
  const accountUserId = extractActingAccountUserId(held.text)
  if (accountUserId === null) {
    return refusedBy([
      "this surface carries no trusted acting-account footer, so nothing may be written as anyone",
    ])
  }
  return told([accountUserId])
}
