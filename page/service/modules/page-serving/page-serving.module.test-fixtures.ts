import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  ASK_AT,
  answering,
  WRITE_AT,
} from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import type {
  Asked,
  Wrote,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

const ROOT = rootOf(import.meta.dir)

export const TOLD: Asked[] = []

const NOTHING_LANDS: Wrote = { commit: null, wrote: [], took: [] }

export const GIVEN = {
  root: ROOT,
  writer: {
    writing: (asked: Asked) => {
      TOLD.push(asked)
      return Promise.resolve(NOTHING_LANDS)
    },
  },
}

export function asking(body: unknown, at: string = ASK_AT, method: string = "POST"): Request {
  return new Request(`http://workstation${at}`, {
    method,
    body: method === "POST" ? JSON.stringify(body) : undefined,
    headers: { "content-type": "application/json" },
  })
}

export async function bodyOf(answered: Response): Promise<Record<string, unknown>> {
  return (await answered.json()) as Record<string, unknown>
}

export async function refusalOf(answered: Response): Promise<string> {
  return String((await bodyOf(answered)).refused)
}

const A_TIGHT_CEILING = 40

const EVERY_DECISION_KIND = { pageTypeSlug: "decision-kind", keys: ["slug"] }

export function tightly(limit?: number): Promise<Response> {
  const query = limit === undefined ? EVERY_DECISION_KIND : { ...EVERY_DECISION_KIND, limit }
  return answering({ ...GIVEN, answeredAtMost: A_TIGHT_CEILING }, asking(query))
}

export const scratch = scratchWorld()

export const A_PAGE = "akasha/a-page.module.ts"

export function repoWith(body: string): string {
  const root = scratch.rootFor("akasha-page-serving-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  const at = join(root, A_PAGE)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  return root
}

export function over(root: string) {
  return { root, writer: GIVEN.writer }
}

export const AN_INSTANT = "2026-09-01T12:00:00.000Z"

export const A_DEVICE_TOKEN = {
  pageTypeSlug: "device-token",
  slug: "held-one",
  values: {
    id: "01a05dc7-421c-7000-b93a-ac4514adf294",
    type: "device-token",
    slug: "held-one",
    person: "alan",
    iosApp: "alanwalton",
    lastSeenAt: AN_INSTANT,
  },
}

const A_WRITE = { writer: "Amy <amy@alanwalton.com>", message: "a message" }

export function writing(body: Record<string, unknown>): Request {
  return asking({ ...A_WRITE, ...body }, WRITE_AT)
}
