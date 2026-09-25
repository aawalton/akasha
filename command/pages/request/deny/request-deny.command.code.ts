import { resolve } from "node:path"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeFileContentPage } from "akasha/change/mechanical/file-content/change/change-file-content-page/change-file-content-page.change-mechanical-file-content.ts"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { featureRequest } from "akasha/command/argument/pages/feature-request.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { requestDeny as page } from "akasha/command/pages/request/deny/request-deny.command.ts"
import {
  type Asked,
  reachedIn,
  STANDING,
  wrongIn,
} from "akasha/command/pages/request/modules/reaching/request-reaching.module.code.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Boost,
  refunding,
} from "akasha/product/kofi/contribution-point/modules/spending/contribution-point-spending.module.code.ts"

const RESTATES = `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const APPENDS = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

const REWRITES = `${changeMechanicalFileContent.slug}/${changeFileContentPage.slug}` as const

const PUBLISHED = "published"

const DENIED = "denied"

const CONTRIBUTOR = "contributor"

const BALANCE = "balance"

const TRANSACTIONS = "transactions"

const JSONL = "jsonl"

const BOOSTS = "boosts"

const PROPOSER = "proposer"

const POINTS = "points"

export function noRequest(slug: string): string {
  return `\`${slug}\` names no feature request, so there is nothing to deny`
}

export function noStanding(slug: string): string {
  return `\`${slug}\` is a feature request saying no standing, so nothing was denied`
}

export function otherThan(slug: string, standing: string): string {
  return `\`${slug}\` is at the standing \`${standing}\`, and only a published request is denied`
}

export function noProposer(slug: string): string {
  return `\`${slug}\` names no proposer, so what that proposer paid cannot be held back`
}

export function noContributor(named: string): string {
  return `\`${named}\` boosts this request and is no contributor page, so nothing went back`
}

export function noBalance(named: string): string {
  return `\`${named}\` states no balance to put points back onto, so nothing went back`
}

function namedIn(held: unknown): string | null {
  const said = textIn(held)
  return said === null ? null : (slugIn(said) ?? said)
}

export function boostsIn(value: Value | null): readonly Boost[] {
  const held = value === null ? null : value[BOOSTS]
  if (!Array.isArray(held)) return []
  const found: Boost[] = []
  for (const one of held) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const row = one as Record<string, unknown>
    const contributor = namedIn(row[CONTRIBUTOR])
    const points = row[POINTS]
    if (contributor === null || typeof points !== "number") continue
    found.push({ contributor, points })
  }
  return found
}

export function proposerIn(value: Value | null): string | null {
  return value === null ? null : namedIn(value[PROPOSER])
}

export type Giving = {
  readonly page: string
  readonly beside: string
  readonly line: string
  readonly was: number
  readonly now: number
  readonly points: number
}

function givingFor(root: string, boosts: readonly Boost[], at: string): readonly Giving[] | string {
  const found: Giving[] = []
  for (const one of boosts) {
    const listed = listedAt(root, CONTRIBUTOR, one.contributor)[0]
    if (listed === undefined) return noContributor(one.contributor)
    const beside = besideAt(listed.path, TRANSACTIONS, JSONL)
    if (beside === null) return noContributor(one.contributor)
    const value = valueByPath(root, listed.path)
    const was = value === null ? null : value[BALANCE]
    if (typeof was !== "number") return noBalance(one.contributor)
    found.push({
      page: listed.path,
      beside,
      line: `${JSON.stringify({ id: uuidVersion7(), at, points: one.points })}\n`,
      was,
      now: was + one.points,
      points: one.points,
    })
  }
  return found
}

export function askingFrom(at: string, giving: readonly Giving[]): readonly Asking[] {
  const asked: Asking[] = []
  for (const one of giving) {
    asked.push({ at: APPENDS, given: { at: one.beside, content: one.line } })
    asked.push({
      at: REWRITES,
      given: { at: one.page, old: `${BALANCE}: ${one.was},`, new: `${BALANCE}: ${one.now},` },
    })
  }
  asked.push({ at: RESTATES, given: { at, key: STANDING, to: DENIED } })
  return asked
}

export function messageFor(asked: Asked): string {
  return `deny the feature request ${asked.slug} and put its boosts back`
}

export function saidFor(
  asked: Asked,
  giving: readonly Giving[],
  commit: string | null
): readonly string[] {
  const points = giving.reduce((sum, one) => sum + one.points, 0)
  const now = `${asked.slug} is denied`
  const gave =
    giving.length === 0
      ? "nothing was owed back, so no points moved"
      : `${points} points went back, over ${giving.length} boosts`
  return commit === null ? [now, gave] : [now, gave, commit]
}

async function stated(
  done: string[],
  root: string,
  at: string,
  asked: Asked,
  giving: readonly Giving[],
  given: Given
): Promise<Answer> {
  const landed = await runMechanicalChange(root, askingFrom(at, giving), messageFor(asked), {
    agentId: given.agentId,
    writer: given.writer,
    done,
  })
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(asked, giving, landed.commit)])
}

type Denying = (done: string[], asked: Asked, given: Given) => Promise<Answer>

async function denied(done: string[], asked: Asked, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const reached = reachedIn(root, asked.slug)
  if (reached === null) return mistaking([noRequest(asked.slug)])
  if (reached.standing === null) return mistaking([noStanding(asked.slug)])
  if (reached.standing !== PUBLISHED) return mistaking([otherThan(asked.slug, reached.standing)])
  const value = valueByPath(root, reached.at)
  const proposer = proposerIn(value)
  if (proposer === null) return mistaking([noProposer(asked.slug)])
  const giving = givingFor(root, refunding(boostsIn(value), proposer), new Date().toISOString())
  if (typeof giving === "string") return mistaking([giving])
  return await stated(done, root, reached.at, asked, giving, given)
}

export async function deniedBy(
  asked: Asked,
  given: Given,
  denying: Denying = denied
): Promise<Answer> {
  return await answering(async (done) => await denying(done, asked, given))
}

export async function requestDeny(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [featureRequest])
  if ("refused" in read) return mistaking([...read.refused])
  const asked: Asked = { slug: read.taken.featureRequest }
  const wrong = wrongIn(asked)
  if (wrong.length > 0) return mistaking(wrong)
  return await deniedBy(asked, given)
}
