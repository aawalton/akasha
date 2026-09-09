import { statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Asking } from "@akasha/changes/mechanical-change-running"
import { readingIn } from "@akasha/indexes"
import { secretAt } from "@akasha/pages/page-file-name"
import { z } from "zod"
import type { Applied } from "../../../../commands/modules/applying/applying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import {
  ACCOUNT_DECLARED,
  bodiesIn,
  type Declared,
  worldIn,
} from "../marking/claude-account-marking.module.test-fixtures.ts"
import {
  type Credential,
  type Doors,
  type Push,
  pushedIn,
} from "./claude-account-credential-push.module.code.ts"

export const ACCESS_KEY = "access-token"

export const REFRESH_KEY = "refresh-token"

export const FAKE_ACCESS = "fake-access-token-for-a-test"

export const FAKE_REFRESH = "fake-refresh-token-for-a-test"

export const ROTATED_ACCESS = "fake-access-token-rotated-for-a-test"

export const ROTATED_REFRESH = "fake-refresh-token-rotated-for-a-test"

export const NOW = Date.parse("2026-09-02T12:00:00.000Z")

export const AN_HOUR = 3_600_000

export const LATER = NOW + AN_HOUR

export const LATER_AT = new Date(LATER).toISOString()

export const RESCUED_DECLARED: readonly Declared[] = [
  ...ACCOUNT_DECLARED,
  { slug: "rescued-credential", uncommitted: true },
]

const scratch = scratchWorld()

export const sweep = scratch.sweep

export function worldMade(declared: readonly Declared[] = RESCUED_DECLARED): string {
  return worldIn(scratch.rootFor("credential-push-"), declared)
}

export function credentialOf(slug: string, said: Partial<Credential> = {}): Credential {
  return {
    slug,
    accessToken: ROTATED_ACCESS,
    refreshToken: ROTATED_REFRESH,
    accessTokenExpiresAtMs: LATER,
    ...said,
  }
}

export const NOWHERE = "/var/tmp/credential-push-no-such-root"

export const FAILED: readonly string[] = ["[gate] fail: the landing said no"]

const PUT = "change-mechanical-file/add-file"

const LANDED: Applied = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: null,
}

export async function pushed(root: string, credential: Credential, doors: Doors): Promise<Push> {
  return await pushedIn(root, credential, doors, readingIn(root), bodiesIn(root))
}

export type Sops = {
  readonly doors: Doors
  readonly held: Map<string, string>
  readonly landed: string[]
}

function cipherText(root: string, page: string, values: ReadonlyMap<string, string>): string {
  return JSON.stringify({ at: join(root, page), values: [...values] })
}

const CIPHER_SHAPE = z.object({
  at: z.string(),
  values: z.array(z.tuple([z.string(), z.string()])),
})

function valuesOf(text: string): ReadonlyMap<string, string> {
  const said = CIPHER_SHAPE.safeParse(JSON.parse(text))
  return said.success ? new Map(said.data.values) : new Map()
}

export function sopsIn(said: Partial<Doors> = {}): Sops {
  const held = new Map<string, string>()
  const landed: string[] = []
  const doors: Doors = {
    secretsRead: (root, page) => {
      const at = secretAt(page)
      if (at === null) return null
      const text = held.get(join(root, at))
      return text === undefined ? null : valuesOf(text)
    },
    cipherMade: (root, page, values) => ({ text: cipherText(root, page, values), why: "" }),
    landing: async (root, asked, message): Promise<Applied> => {
      landed.push(message)
      for (const [at, body] of bodiesOf(asked)) held.set(join(root, at), body)
      return LANDED
    },
    ...said,
  }
  return { doors, held, landed }
}

export function bodiesOf(asked: readonly Asking[]): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  for (const one of asked) if (one.at === PUT) held.set(one.given.at, one.given.body)
  return held
}

export function seeded(
  sops: Sops,
  root: string,
  page: string,
  values: Readonly<Record<string, string>>
): undefined {
  const at = secretAt(page)
  if (at === null) return
  sops.held.set(join(root, at), cipherText(root, page, new Map(Object.entries(values))))
}

export function silentLanding(sops: Sops): Doors["landing"] {
  return async (root, asked, message) => {
    sops.landed.push(`${message} ${root} ${asked.length}`)
    return LANDED
  }
}

export function crossedLanding(sops: Sops): Doors["landing"] {
  return async (root, asked, message) => {
    sops.landed.push(message)
    const crossed = new Map([
      [ACCESS_KEY, "fake-access-token-something-else"],
      [REFRESH_KEY, "fake-refresh-token-something-else"],
    ])
    for (const at of bodiesOf(asked).keys()) {
      sops.held.set(join(root, at), cipherText(root, at, crossed))
    }
    return LANDED
  }
}

export function spoilingLanding(sops: Sops, at: string): Doors["landing"] {
  return async (root, asked, message) => {
    const said = await sops.doors.landing(root, asked, message)
    writeFileSync(join(root, at), "this is not a page body\n")
    return said
  }
}

export function refusingLanding(refusals: readonly string[]): Doors["landing"] {
  return async () => ({ refusals })
}

export function heldIn(sops: Sops, root: string, page: string): ReadonlyMap<string, string> {
  const at = secretAt(page)
  const text = at === null ? undefined : sops.held.get(join(root, at))
  return text === undefined ? new Map() : valuesOf(text)
}

export function modeOf(root: string, at: string): string {
  return (statSync(join(root, at)).mode & 0o777).toString(8)
}

export function whyOf(said: Push): string {
  return said.kind === "pushed" || said.kind === "unchanged" ? said.kind : said.why
}
