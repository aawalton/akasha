import { writeFileSync } from "node:fs"
import { fail } from "@akasha/command-system/command-failing"
import {
  ATTRIBUTES,
  type Attributes,
  attributesOf,
} from "../seat-attributes/seat-attributes.module.code.ts"

const HELP = `compose-boot — compose a seat's system prompt: who it is, and the read that loads the rest

WHAT A SEAT IS BOUND TO IS NOT IN ITS PROMPT. This composes who the seat is, from its stated
persona, domain and role, and the one call that reaches every page those bind it to.

The pages themselves are read, never handed over: text in a prompt is credited as read without
anybody reading it, and it remains after the file under it has moved. So nothing here is
credited, and a seat begins owing every page it is bound to.

The call carries no path. A bare \`akasha read\` reads the caller's own seat page, and what that page
warrants is what the seat must read, and the warrants answer it: the persona and the role and the
domain it states, the type of each, and every domain the one it states is a part of. A path spelled
into a prompt is the one thing a mover cannot repoint, so none is spelled.

A seat stating nothing is told so and is told to run the call all the same: a seat that does not
know who it is is the one that most needs the read. Nothing here refuses: this feeds a spawn, and a
seat that does not start is worse than one carrying less.

Usage:
  bun seat-system/compose-boot/compose-boot.module.code.ts --agent <id> [--out <path>]

Flags:
  --agent <id>   Whose attributes to read.
  --out <path>   Write there rather than to stdout.
  --help         This.
`

function parse(argv: readonly string[]): { readonly agent: string; readonly out: string | null } {
  let agent = ""
  let out: string | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === "--help") {
      process.stdout.write(HELP)
      process.exit(0)
    }
    const next = (): string => {
      const value = argv[i + 1]
      if (value === undefined) fail(`\`${arg}\` takes a value`)
      i += 1
      return value
    }
    if (arg === "--agent") agent = next()
    else if (arg === "--out") out = next()
    else fail(`\`${arg}\` is not an argument this takes — run it with --help`)
  }
  if (agent === "") fail("--agent <id> is required: the composition is one seat's own")
  return { agent, out }
}

function claim(attributes: Attributes): string {
  const named = ATTRIBUTES.flatMap((key) => {
    const one = attributes[key]
    return one === undefined ? [] : [`${key} \`${one.slug}\``]
  })
  return named.length === 0 ? "" : named.join(", ")
}

export const SEAT_READ = "akasha read"

const READING =
  "What that means is in pages, and none of them is here. They are read rather than handed " +
  "over, so that what you act on is the text on disk now rather than the text that was composed when " +
  "you started. This one call reaches every one of them and hands back as many as one answer carries:"

// A SEAT WHOSE ATTRIBUTES REACHED NOTHING STILL GETS A PROMPT. What composed to nothing was exactly
// the seat that most needed the read, and the instruction to read went with the emptiness.
const UNKNOWN =
  "Nothing here states who you are: no persona, no domain and no role reached this prompt. Where " +
  "that is stated is behind the read below, so run it before you take yourself for nobody."

export function compose(seat: string, sent = ""): string {
  return (
    (seat === "" ? `${UNKNOWN}\n` : `You are ${seat}.\n`) +
    (sent === "" ? "" : `\n${sent}\n`) +
    `\n${READING}\n\n    ${SEAT_READ}\n\nRun it before you act.\n`
  )
}

export function compositionFor(agent: string): string {
  return compose(claim(attributesOf(agent)))
}

function main(): undefined {
  const { agent, out } = parse(process.argv.slice(2))
  const body = compositionFor(agent)
  if (out === null) {
    process.stdout.write(body)
    return undefined
  }
  writeFileSync(out, body)
  return undefined
}

if (import.meta.main) main()
