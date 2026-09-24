import { readFileSync, statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { game as gameArgument } from "akasha/command/argument/pages/game.argument.ts"
import { ledger as ledgerArgument } from "akasha/command/argument/pages/ledger.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { gameUnpack as page } from "akasha/command/pages/game/unpack/game-unpack.command.ts"
import { LEDGERS } from "akasha/command/pages/game/unpack/modules/rows-as-pages/rows-as-pages.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  foldedFor,
  type Naming,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { putting } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"

const NAMED = [gameArgument, ledgerArgument] as const

const JSONL = "jsonl"
const UTF8 = "utf8"
const BREAK = "\n"
const PARTED = "/"
const FIRST_ROW = 1

export type Taken = { readonly game: string; readonly ledger: string }

export type Read = Taken | { readonly refused: string }

export type Found = { readonly at: string; readonly slug: string }

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const named = held.game.trim()
  if (named === "") return { refused: `\`${gameArgument.said}\` names no game` }
  const ledger = held.ledger.trim()
  if (!LEDGERS.has(ledger)) {
    return { refused: `\`${ledgerArgument.said}\` takes one of ${[...LEDGERS.keys()].join(", ")}` }
  }
  return { game: named, ledger }
}

function foundIn(root: string, said: string): Found | null {
  const named = addressIn(said)
  const slug = named.kind === "qualified" ? named.slug : said
  const listed = listedAt(root, storyGame.slug, slug)[0]
  if (listed === undefined) return null
  return { at: listed.path, slug }
}

export function rowsIn(body: string): readonly string[] {
  return body.split(BREAK).filter((one) => one.trim() !== "")
}

export function messageFor(ledger: string, gameSlug: string): string {
  return `make a page of each ${ledger} row of ${gameSlug}`
}

function folderFor(at: string, under: string): string {
  return `${at.slice(0, at.lastIndexOf(PARTED))}${PARTED}${under}`
}

async function unpacked(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const ledger = LEDGERS.get(held.ledger)
  if (ledger === undefined) return refused(`\`${held.ledger}\` names no ledger`, INPUT)
  const found = foundIn(given.root, held.game)
  if (found === null) return refused(`\`${held.game}\` names no game here`, DATA)
  const beside = besideAt(found.at, held.ledger, JSONL)
  if (beside === null) {
    return refused(`\`${found.at}\` is no page file, so no rows sit beside it`, DATA)
  }
  const at = isAbsolute(beside) ? beside : join(given.root, beside)
  if (statSync(at, { throwIfNoEntry: false }) === undefined) {
    return refused(`\`${beside}\` is nowhere, so this game keeps no such rows`, DATA)
  }
  const folder = folderFor(found.at, ledger.under)
  const naming: Naming[] = []
  for (const line of rowsIn(readFileSync(at, UTF8))) {
    const row: unknown = JSON.parse(line)
    if (!isRecord(row)) return refused(`a row of \`${beside}\` is no record`, DATA)
    const one = ledger.rowed({ gameSlug: found.slug, folder, row, at: naming.length + FIRST_ROW })
    if ("refused" in one) return refused(one.refused, DATA)
    naming.push(one)
  }
  if (naming.length === 0) return refused(`\`${beside}\` holds no row`, DATA)
  const folded = foldedFor(given.root, naming)
  if ("refused" in folded) return refused(folded.refused, DATA)
  const landed = await landing(
    given.root,
    folded.puts.map(putting),
    messageFor(held.ledger, found.slug),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(naming.map((one) => one.slug))
}

export async function gameUnpack(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await unpacked(done, argv, given, landing))
}
