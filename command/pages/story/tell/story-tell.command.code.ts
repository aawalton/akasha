import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import type { Splice } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { editsAt } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  without,
  withProperty,
} from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  assignedIn,
  literalIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Asking,
  foldedOver,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { draft as draftArgument } from "akasha/command/argument/pages/draft.argument.ts"
import { fact as factArgument } from "akasha/command/argument/pages/fact.argument.ts"
import { knower as knowerArgument } from "akasha/command/argument/pages/knower.argument.ts"
import { newFact as newFactArgument } from "akasha/command/argument/pages/new-fact.argument.ts"
import { page as pageArgument } from "akasha/command/argument/pages/page.argument.ts"
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
import { noPageSaid } from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import {
  appending,
  stamped,
} from "akasha/command/modules/change-running/change-running.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  continued,
  factsSpelled,
  fits,
  type Laid,
  replacing,
  secretsLeft,
  spliced,
  type Told,
  withoutSecrets,
} from "akasha/command/pages/story/tell/modules/tell-continuing/tell-continuing.module.code.ts"
import { storyTell as page } from "akasha/command/pages/story/tell/story-tell.command.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

import { lore } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { loreAbout } from "akasha/story/lore/properties/lore-about.relation-property.ts"
import { loreFact } from "akasha/story/lore/properties/lore-fact.text-property.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import { loreSecrets } from "akasha/story/lore/properties/lore-secrets.file-property.ts"
import { loreDisclosure } from "akasha/story/lore-disclosure/lore-disclosure.page-type.ts"
import { gameMaster } from "akasha/story/lore-disclosure/pages/game-master.lore-disclosure.ts"

const NAMED = [pageArgument, factArgument, knowerArgument, newFactArgument, draftArgument] as const

const HELD = "jsonl"

const UTF8 = "utf8"

const LINE = "\n"

const WORLD = "world"

const FACT = "fact"

const QUALIFIED = "qualified"

export const GAME_MASTER = `${loreDisclosure.slug}/${gameMaster.slug}`

type Telling = { readonly told: readonly Told[]; readonly secrets: readonly string[] }

export type Taken = {
  readonly page: string
  readonly fact: string
  readonly knowers: readonly string[]
  readonly adds: boolean
  readonly drafts: boolean
}

type Read = Taken | { readonly refused: string }

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const named = held.page.trim()
  const said = held.fact.trim()
  if (named === "") return { refused: `\`${pageArgument.said}\` names no page` }
  if (said === "") return { refused: `\`${factArgument.said}\` names no fact` }
  const knowers = held.knower.map((one) => one.trim()).filter((one) => one !== "")
  return { page: named, fact: said, knowers, adds: held.newFact, drafts: held.draft }
}

export type Reading = {
  readonly listedAt: (pageTypeSlug: string, slug: string) => readonly { readonly path: string }[]
  readonly valueAt: (path: string) => Value | null
  readonly textOf: (path: string) => string | null
  readonly shaped: (path: string, text: string) => string
}

function shapedUnder(root: string): (path: string, text: string) => string {
  return (path, text) =>
    new TextDecoder().decode(formattedBody(root, path, new TextEncoder().encode(text)).body)
}

function rootReading(root: string): Reading {
  return {
    listedAt: (pageTypeSlug, slug) => listedAt(root, pageTypeSlug, slug),
    valueAt: (path) => valueByPath(root, path),
    textOf: (path) => {
      const at = join(root, path)
      return statSync(at, { throwIfNoEntry: false }) === undefined ? null : readFileSync(at, UTF8)
    },
    shaped: shapedUnder(root),
  }
}

function worldReading(world: World): Reading {
  return {
    listedAt: (pageTypeSlug, slug) => world.index.listedAt(pageTypeSlug, slug),
    valueAt: (path) => world.index.valueAt(path),
    textOf: (path) => world.textOf(path),
    shaped: shapedUnder(world.root),
  }
}

export function knowersFor(named: readonly string[]): readonly string[] {
  return [GAME_MASTER, ...new Set(named.filter((one) => one !== GAME_MASTER))]
}

export function toldIn(
  telling: Telling,
  fact: string,
  named: readonly string[],
  adds = false
): Telling | string {
  const knowers = knowersFor(named)
  const at = telling.told.findIndex((one) => one.fact === fact)
  const was = telling.told[at]
  if (was !== undefined) {
    const added = knowers.filter((one) => !was.knowers.includes(one))
    if (added.length === 0) return `\`${fact}\` is known already to everyone the call names`
    const grown = { fact, knowers: [...was.knowers, ...added] }
    return {
      told: telling.told.map((one, each) => (each === at ? grown : one)),
      secrets: telling.secrets,
    }
  }
  const held = telling.secrets.indexOf(fact)
  if (held < 0 && !adds) {
    return `no fact on the page reads \`${fact}\` word for word, and \`${newFactArgument.said}\` adds a fact the page holds nowhere`
  }
  if (fact.length > loreFact.maxLength) {
    const runs = `\`${fact}\` runs to ${fact.length} characters, and a told fact holds at most ${loreFact.maxLength}`
    return held < 0
      ? runs
      : `${runs}, so the world builder rewords that secret to fit before it is told`
  }
  return {
    told: [...telling.told, { fact, knowers }],
    secrets: telling.secrets.filter((_one, each) => each !== held),
  }
}

export function bodyTelling(path: string, text: string, telling: Telling): string | null {
  const source = parsedAs(path, text)
  const owner = literalIn(source)
  if (owner === null) return null
  const spots: Splice[] = []
  const facts = assignedIn(owner, loreFacts.propertySlug)
  const spelled = `${loreFacts.propertySlug}: ${factsSpelled(telling.told)}`
  if (facts === null) {
    const after =
      assignedIn(owner, loreAbout.propertySlug) === null ? WORLD : loreAbout.propertySlug
    spots.push(withProperty(text, source, owner, spelled, after))
  } else {
    spots.push({ from: facts.getStart(source), to: facts.getEnd(), put: spelled })
  }
  const secrets = assignedIn(owner, loreSecrets.propertySlug)
  if (telling.secrets.length === 0 && secrets !== null) {
    spots.push(without(text, source, owner, owner.properties, owner.properties.indexOf(secrets)))
  }
  return spliced(text, spots)
}

function recordsIn(held: unknown): readonly Told[] {
  if (!Array.isArray(held)) return []
  const found: Told[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const fact: unknown = Reflect.get(one, FACT)
    const knowers: unknown = Reflect.get(one, loreKnowers.propertySlug)
    if (typeof fact !== "string" || !Array.isArray(knowers)) continue
    found.push({ fact, knowers: knowers.filter((each) => typeof each === "string") })
  }
  return found
}

function secretsAt(reading: Reading, at: string): readonly string[] {
  const text = reading.textOf(at)
  if (text === null) return []
  return text
    .split(LINE)
    .filter((one) => one.trim() !== "")
    .map((one): unknown => JSON.parse(one))
    .filter((one): one is string => typeof one === "string")
}

function pathOf(reading: Reading, named: string): string | null {
  const address = addressIn(named)
  if (address.kind !== QUALIFIED) return null
  return reading.listedAt(address.pageTypeSlug, address.slug)[0]?.path ?? null
}

function lorePathOf(reading: Reading, named: string): string | null {
  const address = addressIn(named)
  if (address.kind !== QUALIFIED) return null
  if (address.pageTypeSlug !== lore.slug && address.pageTypeSlug !== place.slug) return null
  return pathOf(reading, named)
}

export function askedFor(held: Taken, reading: Reading): readonly Asking[] | string {
  const at = lorePathOf(reading, held.page)
  if (at === null) return `\`${held.page}\` names no lore page or place here`
  for (const one of held.knowers) {
    if (one !== GAME_MASTER && pathOf(reading, one) === null) {
      return `\`${one}\` names no page here, so it cannot come to know a fact`
    }
  }
  const here = tellingAt(held, reading, at)
  if (typeof here === "string") return here
  if (!here.fresh || fits(here.laid)) return here.asked
  const known = { fact: held.fact, knowers: knowersFor(held.knowers) }
  const added = { ...held, adds: true }
  const moved = continued(held.page, known, reading, (path) => tellingAt(added, reading, path))
  return typeof moved === "string" ? moved : [...moved, ...here.kept]
}

type Here = Laid & { readonly kept: readonly Asking[] }

function tellingAt(held: Taken, reading: Reading, at: string): Here | string {
  const secretsFile = besideAt(at, loreSecrets.propertySlug, HELD)
  if (secretsFile === null) return `\`${at}\` can hold no secrets beside it`
  const value = reading.valueAt(at)
  const was: Telling = {
    told: recordsIn(value?.[loreFacts.propertySlug]),
    secrets: secretsAt(reading, secretsFile),
  }
  const now = toldIn(was, held.fact, held.knowers, held.adds)
  if (typeof now === "string") return now
  const text = reading.textOf(at)
  if (text === null) return `\`${at}\` holds no body to tell a fact on`
  const body = bodyTelling(at, text, now)
  if (body === null) return `\`${at}\` exports no object`
  const laid = reading.shaped(at, body)
  const asked: Asking[] = [replacing(at, text, laid)]
  const fresh = now.told.length > was.told.length
  if (now.secrets.length === was.secrets.length) return { asked, laid, fresh, kept: [] }
  const kept = reading.textOf(secretsFile)
  if (kept === null) return `\`${secretsFile}\` holds no secrets to tell from`
  const left = secretsLeft(secretsFile, kept, now.secrets)
  const bare = now.secrets.length === 0 ? withoutSecrets(at, text) : []
  return { asked: [...asked, left], laid, fresh, kept: [left, ...bare] }
}

function toldLines(held: Taken): readonly string[] {
  return [`told\t${held.page}`, ...knowersFor(held.knowers).map((one) => `knower\t${one}`)]
}

async function drafted(held: Taken, given: Given): Promise<Answer> {
  const keeper = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (keeper === null || editsAt(keeper) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const why: { said: string | null } = { said: null }
  const kept = await appending(given.root, keeper, given.agentId, false, async (world) => {
    const asked = askedFor(held, worldReading(world))
    if (typeof asked === "string") {
      why.said = asked
      return { edits: [], refused: asked }
    }
    return stamped(await foldedOver(world, asked), false, false)
  })
  if (why.said !== null) return refused(why.said, DATA)
  if (kept.code !== 0) return kept
  return told([
    ...toldLines(held),
    `the edits are kept beside ${keeper}, and \`akasha change apply\` lands them`,
  ])
}

async function toldBy(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  if (held.drafts) return await drafted(held, given)
  const asked = askedFor(held, rootReading(given.root))
  if (typeof asked === "string") return refused(asked, DATA)
  const knowers = knowersFor(held.knowers)
  const landed = await landing(
    given.root,
    asked,
    `A fact of ${held.page} is told to ${knowers.join(", ")}`,
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(toldLines(held))
}

export async function storyTell(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await toldBy(done, argv, given, landing))
}
