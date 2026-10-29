import { episode } from "akasha/alan/collection/watching/episode/episode.page-type.ts"
import {
  type Held,
  type Patch,
  type Row,
  recordingFor,
  type Sighting,
  titled,
} from "akasha/alan/collection/watching/modules/episode-recording/episode-recording.module.code.ts"
import { movie } from "akasha/alan/collection/watching/movie/movie.page-type.ts"
import { season } from "akasha/alan/collection/watching/season/season.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { followBuilds } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/build-following/build-following.module.code.ts"
import { chromeOf } from "akasha/infrastructure/service/akasha-service/browser-extension/modules/chrome-reaching/chrome-reaching.module.code.ts"
import {
  ASKING,
  answerTo,
  SITE,
} from "akasha/infrastructure/service/akasha-service/browser-extension/modules/site-answering/site-answering.module.code.ts"

export type Asked = {
  readonly kind: string
  readonly sighting: Sighting
}

export type Answered = {
  readonly said: string
  readonly recorded: boolean
}

type Query = {
  readonly pageTypeSlug: string
  readonly where?: Readonly<Record<string, Readonly<Record<string, unknown>>>>
  readonly keys?: readonly string[]
}

const DAY_ZONE = "America/Denver"

const WATCHED = "watched"

const CRUNCHYROLL = "https://www.crunchyroll.com/*"

export const MANIFEST = {
  manifest_version: 3,
  name: "Streaming Watching",
  version: "1.0.0",
  description: "Records the episodes and films Alan finishes on Crunchyroll as watched.",
  permissions: ["storage", "alarms"],
  host_permissions: [`${SITE}/*`, CRUNCHYROLL],
  background: { service_worker: "worker.js" },
  content_scripts: [{ matches: [CRUNCHYROLL], js: ["site.js"], run_at: "document_idle" }],
}

export function dayNow(now: Date): string {
  return now.toLocaleDateString("en-CA", { timeZone: DAY_ZONE })
}

export async function rowsFor(query: Query): Promise<readonly Row[]> {
  const answer = await answerTo("/api/ask", { ...ASKING, body: JSON.stringify(query) })
  if (answer.status === 401) throw new Error("sign in to alanwalton.com, then try again")
  if (!answer.ok) throw new Error(`alanwalton.com answered ${answer.status}`)
  const body = (await answer.json()) as {
    readonly rows?: readonly Row[]
    readonly refused?: unknown
  }
  if (typeof body.refused === "string") throw new Error(body.refused)
  return body.rows ?? []
}

export function writeOf(patch: Patch): string {
  return JSON.stringify({
    op: "patchPage",
    args: {
      pageTypeSlug: patch.pageTypeSlug,
      where: [{ key: "slug", eq: patch.slug }],
      set: patch.set,
    },
  })
}

async function wrote(patch: Patch): Promise<undefined> {
  const answer = await answerTo("/api/page-write", { ...ASKING, body: writeOf(patch) })
  if (answer.ok) return
  const body = (await answer.json().catch(() => ({}))) as { readonly error?: unknown }
  throw new Error(
    `alanwalton.com refused the write with ${answer.status}: ${String(body.error ?? "")}`
  )
}

async function heldFor(sighting: Sighting): Promise<Held> {
  const empty: Held = { shows: [], films: [], seasons: [], episodes: [] }
  if (sighting.film) {
    const films = await rowsFor({
      pageTypeSlug: movie.slug,
      keys: ["slug", "title", "status", "ownLength"],
    })
    return { ...empty, films }
  }
  const shows = await rowsFor({ pageTypeSlug: show.slug, keys: ["slug", "title", "status"] })
  const shown = titled(shows, sighting.show)
  const slug = shown === null ? null : textIn(shown.slug)
  if (slug === null) return { ...empty, shows }
  const seasons = await rowsFor({
    pageTypeSlug: season.slug,
    where: { partOfCollections: { has: `${show.slug}/${slug}` } },
    keys: ["slug", "position", "status"],
  })
  const under = seasons
    .map((one) => textIn(one.slug))
    .filter((one): one is string => one !== null)
    .map((one) => `${season.slug}/${one}`)
  const episodes =
    under.length === 0
      ? []
      : await rowsFor({
          pageTypeSlug: episode.slug,
          where: { partOfCollections: { contains: under } },
          keys: ["slug", "title", "position", "status", "ownLength", "partOfCollections"],
        })
  return { shows, films: [], seasons, episodes }
}

export async function watched(
  sighting: Sighting,
  heldBy: (one: Sighting) => Promise<Held> = heldFor,
  written: (patch: Patch) => Promise<unknown> = wrote,
  day: string = dayNow(new Date())
): Promise<Answered> {
  const recording = recordingFor(sighting, await heldBy(sighting), day)
  for (const patch of recording.patches) await written(patch)
  return { said: recording.said, recorded: recording.patches.length > 0 }
}

async function answered(asked: Asked): Promise<Answered> {
  if (asked.kind !== WATCHED) {
    return { said: "this extension records watched episodes only", recorded: false }
  }
  try {
    return await watched(asked.sighting)
  } catch (thrown) {
    return { said: saidBy(thrown), recorded: false }
  }
}

function idle(): Promise<boolean> {
  return Promise.resolve(true)
}

async function pressed(): Promise<undefined> {
  return undefined
}

export function runWorker(): undefined {
  const chrome = chromeOf()
  followBuilds(chrome, idle, pressed)
  chrome.runtime.onMessage.addListener((asked, _sender, reply) => {
    void answered(asked as Asked).then(reply)
    return true
  })
}
