import { writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Reading } from "akasha/agents/read-record/read-record.module.code.ts"
import { partly, readingIn } from "akasha/agents/read-record/read-record.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { numbered } from "akasha/commands/modules/long-body/long-body.module.code.ts"
import { ANSWER_CEILING } from "akasha/commands/pages/read/read.command.code.ts"
import {
  AGENT,
  givenFor,
  HELD,
  lettered,
  namingEach,
  read,
  rootWith,
} from "akasha/commands/pages/read/read.command.test-fixtures.ts"

export const LONG = "akasha/one/long.ts"

const LONG_LINES = 600

export function longBody(): string {
  return lettered(LONG_LINES)
}

function longRoot(): string {
  return rootWith([{ at: LONG, body: longBody() }])
}

export function tooWideRead(): Answer {
  const root = rootWith([{ at: LONG, body: `${"x".repeat(ANSWER_CEILING + 1)}\n` }])
  return read(["--file-path", LONG], givenFor(root))
}

function ranThrough(root: string, most: number): readonly Answer[] {
  const said: Answer[] = []
  for (let one = 0; one < most; one += 1) {
    said.push(read(["--file-path", LONG], givenFor(root)))
    if (!partly(readingIn(root, AGENT, LONG))) break
  }
  return said
}

export function longFirst(): { readonly root: string; readonly said: Answer } {
  const root = longRoot()
  return { root, said: read(["--file-path", LONG], givenFor(root)) }
}

export function longWhole(): { readonly said: readonly Answer[]; readonly held: Reading | null } {
  const root = longRoot()
  const said = ranThrough(root, 8)
  return { said, held: readingIn(root, AGENT, LONG) }
}

export function longBeside(): { readonly first: Answer; readonly next: Answer } {
  const root = rootWith([
    { at: LONG, body: longBody() },
    { at: HELD, body: "one\n" },
  ])
  return {
    first: read(namingEach([LONG, HELD]), givenFor(root)),
    next: read(namingEach([HELD, LONG]), givenFor(root)),
  }
}

export function begunAgain(): readonly string[] {
  const root = longRoot()
  read(["--file-path", LONG], givenFor(root))
  const full = read(["--full", "--file-path", LONG], givenFor(root))
  writeFileSync(join(root, LONG), lettered(LONG_LINES - 1))
  const moved = read(["--file-path", LONG], givenFor(root))
  return [full.report[0] ?? "", moved.report[0] ?? ""]
}

export function linesGiven(answers: readonly Answer[]): readonly string[] {
  const said: string[] = []
  for (const one of answers) {
    for (const line of one.report) {
      if (line.startsWith(" ")) said.push(...line.split("\n"))
    }
  }
  return said
}

export function wholeNumbered(): readonly string[] {
  return numbered(longBody()).split("\n")
}
