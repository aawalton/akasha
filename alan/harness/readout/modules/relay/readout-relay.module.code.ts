import { existsSync } from "node:fs"
import { resolve } from "node:path"
import {
  buildReadoutRefusal,
  presentsSecret,
  READOUT_CACHE_CONTROL,
  RELAY_SECRET_HEADER,
} from "akasha/alan/harness/readout/modules/credential/readout-credential.module.code.ts"
import {
  NOT_FALLING,
  type Reading,
  readingKept,
  readingValues,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  type Fetcher,
  readingFor,
  type Sleeper,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { z } from "zod"

export const RELAY_PATH = "/api/readout-relay"

export const RELAY_SECRET_NAME = "READING_RELAY_SECRET"

export const NO_READOUT_NAMED =
  "no readout page was named, so there is no reading to carry. The page a reading sits beside " +
  "is the first of the two arguments this takes."

export const NOWHERE_TO_CARRY_TO =
  "nowhere to carry a reading to was named. The origin of the site the reading is shown on is " +
  "the second of the two arguments this takes."

export const NO_SECRET_TO_CARRY_ON =
  `${RELAY_SECRET_NAME} is not set, so a reading carried would be refused. It is the secret the ` +
  "site names for the machine its readings are taken on."

export const JOURNAL_ERROR_LEVEL = "<3>"

const READOUT_PAGE_TYPE = "readout"

const RELAY_WRITER = "readout relay <readout-relay@alanwalton.com>"

export function noReadoutPageAt(page: string): string {
  return (
    `${JOURNAL_ERROR_LEVEL}relay wiring fault: no readout page is at '${page}', so this relay ` +
    "carries nothing, and will go on carrying nothing until the path it names is put right"
  )
}

export type Relayed = Reading & { readonly readout: string }

export type Carrying = Omit<Relayed, "fallsPerHour"> & { readonly fallsPerHour?: number }

export type Sent = (to: URL, init: RequestInit) => Promise<Response>

const relayed = z.object({
  readout: z.string().trim().min(1),
  value: z.number().finite(),
  at: z.string().trim().min(1),
  fallsPerHour: z.number().finite().default(NOT_FALLING),
})

export function parseRelayed(body: unknown): Relayed | null {
  const parsed = relayed.safeParse(body)
  if (!parsed.success) return null
  if (Number.isNaN(Date.parse(parsed.data.at))) return null
  return parsed.data
}

export function noReadoutSlugged(readout: string): string {
  return (
    `no \`${READOUT_PAGE_TYPE}\` is slugged \`${readout}\`, so the reading carried for it would ` +
    "be kept beside nothing"
  )
}

export async function keepRelayed(
  carried: Relayed,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<string | null> {
  const placed = await readingFor(
    { pages: [{ pageTypeSlug: READOUT_PAGE_TYPE, slug: carried.readout }] },
    fetcher,
    naps
  )
  if ("refused" in placed) return placed.refused
  const path = placed.bodies[0]?.path
  if (path === undefined) return noReadoutSlugged(carried.readout)
  const wrote = await writingFor(
    {
      writer: RELAY_WRITER,
      message: `a reading of ${carried.readout} taken ${carried.at}`,
      kept: [{ path, values: readingValues(carried) }],
    },
    fetcher,
    naps
  )
  return "refused" in wrote ? wrote.refused : null
}

export async function answerRelayed(request: Request): Promise<Response> {
  const headers = { "Cache-Control": READOUT_CACHE_CONTROL }
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "A reading is carried in." }, { status: 405, headers })
  }
  if (!presentsSecret(request, RELAY_SECRET_HEADER, optionalEnv(RELAY_SECRET_NAME))) {
    return buildReadoutRefusal()
  }
  const carried = parseRelayed(await request.json().catch(() => null))
  if (carried === null) {
    return Response.json({ ok: false, error: "No reading." }, { status: 400, headers })
  }
  const why = await keepRelayed(carried)
  if (why !== null) {
    return Response.json({ ok: false, error: why }, { status: 502, headers })
  }
  return Response.json({ ok: true, readout: carried.readout, at: carried.at }, { headers })
}

export function readoutNamedBy(page: string): string {
  const named = (page.split("/").at(-1) ?? "").split(".")[0] ?? ""
  if (named === "") {
    throw new Error(`'${page}' names no readout, so there is nothing to carry a reading under`)
  }
  return named
}

export async function relayReading(
  to: string,
  secret: string,
  carried: Carrying,
  send: Sent = fetch,
  timeoutMs = 10_000
): Promise<undefined> {
  const at = new URL(RELAY_PATH, to)
  const answered = await send(at, {
    method: "POST",
    headers: { "Content-Type": "application/json", [RELAY_SECRET_HEADER]: secret },
    body: JSON.stringify(carried),
    signal: AbortSignal.timeout(timeoutMs),
  })
  if (!answered.ok) {
    throw new Error(
      `${at.href} answered ${answered.status} for the reading of '${carried.readout}'`
    )
  }
}

export function statedIn(open: Record<string, string | undefined>, name: string): string | null {
  const stated = open[name]?.trim()
  return stated === undefined || stated === "" ? null : stated
}

export function readoutPageAt(root: string, page: string): string | null {
  const full = resolve(root, page)
  return existsSync(full) ? full : null
}

export function noReadingBeside(page: string): string {
  return `${page} has no reading beside it, so there is none to carry`
}

export function readingCarried(at: string, to: string): string {
  return `a reading taken ${at} carried to ${to}`
}

export async function carryReadingBeside(
  root: string,
  page: string,
  to: string,
  secret: string
): Promise<string> {
  if (readoutPageAt(root, page) === null) throw new Error(noReadoutPageAt(page))
  const kept = readingKept(root, page)
  if (kept === null) throw new Error(noReadingBeside(page))
  await relayReading(to, secret, { ...kept, readout: readoutNamedBy(page) })
  return readingCarried(kept.at, to)
}

if (import.meta.main) {
  const page = (process.argv[2] ?? "").trim()
  const to = (process.argv[3] ?? "").trim()
  const secret = statedIn(process.env, RELAY_SECRET_NAME)
  if (page === "") {
    process.stderr.write(`${NO_READOUT_NAMED}\n`)
    process.exit(2)
  }
  if (to === "") {
    process.stderr.write(`${NOWHERE_TO_CARRY_TO}\n`)
    process.exit(2)
  }
  if (secret === null) {
    process.stderr.write(`${NO_SECRET_TO_CARRY_ON}\n`)
    process.exit(2)
  }
  const root = rootStated(process.env) ?? process.cwd()
  try {
    process.stdout.write(`${await carryReadingBeside(root, page, to, secret)}\n`)
  } catch (thrown) {
    process.stderr.write(`${saidBy(thrown)}\n`)
    process.exit(1)
  }
}
