import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import type { Splice } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  without,
  withProperty,
} from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  assignedIn,
  literalIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { fact as factArgument } from "akasha/command/argument/pages/fact.argument.ts"
import { knower as knowerArgument } from "akasha/command/argument/pages/knower.argument.ts"
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
import { storyTell as page } from "akasha/command/pages/story/tell/story-tell.command.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { loreAbout } from "akasha/story/lore/properties/lore-about.relation-property.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import { loreSecrets } from "akasha/story/lore/properties/lore-secrets.file-property.ts"
import { loreDisclosure } from "akasha/story/lore-disclosure/lore-disclosure.page-type.ts"
import { gameMaster } from "akasha/story/lore-disclosure/pages/game-master.lore-disclosure.ts"

const NAMED = [pageArgument, factArgument, knowerArgument] as const

const HELD = "jsonl"

const UTF8 = "utf8"

const LINE = "\n"

const WORLD = "world"

const FACT = "fact"

const QUALIFIED = "qualified"

export const GAME_MASTER = `${loreDisclosure.slug}/${gameMaster.slug}`

export type Told = { readonly fact: string; readonly knowers: readonly string[] }

export type Telling = { readonly told: readonly Told[]; readonly secrets: readonly string[] }

type Taken = { readonly page: string; readonly fact: string; readonly knowers: readonly string[] }

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
  return { page: named, fact: said, knowers }
}

export function knowersFor(named: readonly string[]): readonly string[] {
  return [GAME_MASTER, ...new Set(named.filter((one) => one !== GAME_MASTER))]
}

export function toldIn(telling: Telling, fact: string, named: readonly string[]): Telling | string {
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
  if (held < 0) return `no fact on the page reads \`${fact}\` word for word`
  return {
    told: [...telling.told, { fact, knowers }],
    secrets: telling.secrets.filter((_one, each) => each !== held),
  }
}

export function factsSpelled(facts: readonly Told[]): string {
  const records = facts.map(
    (one) =>
      `{ ${FACT}: ${JSON.stringify(one.fact)}, ${loreKnowers.propertySlug}: [${one.knowers.map((each) => JSON.stringify(each)).join(", ")}] }`
  )
  return `[${records.join(", ")}]`
}

function spliced(text: string, spots: readonly Splice[]): string {
  let held = text
  for (const one of spots.toSorted((here, there) => there.from - here.from)) {
    held = `${held.slice(0, one.from)}${one.put}${held.slice(one.to)}`
  }
  return held
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

function secretsAt(root: string, at: string): readonly string[] {
  const path = join(root, at)
  if (statSync(path, { throwIfNoEntry: false }) === undefined) return []
  return readFileSync(path, UTF8)
    .split(LINE)
    .filter((one) => one.trim() !== "")
    .map((one): unknown => JSON.parse(one))
    .filter((one): one is string => typeof one === "string")
}

function pathOf(root: string, named: string): string | null {
  const address = addressIn(named)
  if (address.kind !== QUALIFIED) return null
  return listedAt(root, address.pageTypeSlug, address.slug)[0]?.path ?? null
}

function lorePathOf(root: string, named: string): string | null {
  const address = addressIn(named)
  if (address.kind !== QUALIFIED) return null
  if (address.pageTypeSlug !== lore.slug && address.pageTypeSlug !== place.slug) return null
  return pathOf(root, named)
}

async function toldBy(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const at = lorePathOf(given.root, held.page)
  if (at === null) return refused(`\`${held.page}\` names no lore page or place here`, DATA)
  for (const one of held.knowers) {
    if (one !== GAME_MASTER && pathOf(given.root, one) === null) {
      return refused(`\`${one}\` names no page here, so it cannot come to know a fact`, DATA)
    }
  }
  const secretsFile = besideAt(at, loreSecrets.propertySlug, HELD)
  if (secretsFile === null) return refused(`\`${at}\` can hold no secrets beside it`, DATA)
  const value = valueByPath(given.root, at)
  const was: Telling = {
    told: recordsIn(value?.[loreFacts.propertySlug]),
    secrets: secretsAt(given.root, secretsFile),
  }
  const now = toldIn(was, held.fact, held.knowers)
  if (typeof now === "string") return refused(now, DATA)
  const text = readFileSync(join(given.root, at), UTF8)
  const body = bodyTelling(at, text, now)
  if (body === null) return refused(`\`${at}\` exports no object`, DATA)
  const asked = [taking(at), putting({ path: at, content: body })]
  if (now.secrets.length !== was.secrets.length) {
    asked.push(taking(secretsFile))
    if (now.secrets.length > 0) {
      const content = now.secrets.map((one) => `${JSON.stringify(one)}${LINE}`).join("")
      asked.push(putting({ path: secretsFile, content }))
    }
  }
  const knowers = knowersFor(held.knowers)
  const landed = await landing(
    given.root,
    asked,
    `A fact of ${held.page} is told to ${knowers.join(", ")}`,
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([`told\t${held.page}`, ...knowers.map((one) => `knower\t${one}`)])
}

export async function storyTell(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await toldBy(done, argv, given, landing))
}
