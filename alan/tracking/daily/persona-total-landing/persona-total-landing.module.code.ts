import { readFiles, type Written, writeFiles } from "@akasha/pages-query"

export const PERSONA_PAGE_TYPE_SLUG = "persona"

export const PERSONA_TOTAL_WRITER = "daily-tracking <daily-tracking@alanwalton.com>"

const CLOSING = "} as const satisfies Persona"

const TOTAL_LINE = /^ {2}totalPoints: -?\d+(?:\.\d+)?,$/m

export function personaPagePath(slug: string): string {
  return `akasha/persona-system/personas/${slug}/${slug}.persona.ts`
}

export function personaBodyWithTotal(body: string, totalPoints: number): string | null {
  if (!Number.isFinite(totalPoints)) return null
  const line = `  totalPoints: ${totalPoints},`
  if (TOTAL_LINE.test(body)) {
    const next = body.replace(TOTAL_LINE, line)
    return next === body ? null : next
  }
  const at = body.lastIndexOf(CLOSING)
  if (at < 0) return null
  return `${body.slice(0, at)}${line}\n${body.slice(at)}`
}

export function totalIn(body: string): number | null {
  const found = body.match(/^ {2}totalPoints: (-?\d+(?:\.\d+)?),$/m)
  return found?.[1] === undefined ? null : Number(found[1])
}

const ATTEMPTS = 4

const PAUSE_MS = 1_500

const sleep = (ms: number): Promise<undefined> =>
  new Promise((done) => {
    setTimeout(() => {
      done(undefined)
    }, ms)
  })

async function landedOnPersona(slug: string, totalPoints: number): Promise<Written> {
  const path = personaPagePath(slug)
  let why = `no attempt to land ${path} was made`
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (attempt > 1) await sleep(PAUSE_MS)
    const found = await readFiles([path])
    if (!found.ok) {
      why = found.why
      continue
    }
    const held = found.bodies.find((one) => one.path === path)
    if (held === undefined || held.content === null) {
      return { ok: false, why: `no body stands at ${path}, so no total can be set in one` }
    }
    if (totalIn(held.content) === totalPoints) return { ok: true, at: found.at }
    const content = personaBodyWithTotal(held.content, totalPoints)
    if (content === null) {
      return { ok: false, why: `${path} is not a body this can set a total in` }
    }
    const landed = await writeFiles(
      [{ path, content }],
      PERSONA_TOTAL_WRITER,
      `${slug} carries a total of ${totalPoints} points`,
      undefined,
      undefined,
      found.at
    )
    if (landed.ok) return landed
    why = landed.why
  }
  return { ok: false, why: `${why} — ${ATTEMPTS} attempts were spent` }
}

export async function landTotalPoints(
  pageTypeSlug: string,
  slug: string,
  totalPoints: number,
  _writer: string
): Promise<Written> {
  if (pageTypeSlug === PERSONA_PAGE_TYPE_SLUG) return landedOnPersona(slug, totalPoints)
  return {
    ok: false,
    why:
      `a total of ${totalPoints} for \`${pageTypeSlug}/${slug}\` went unwritten: a total is landed ` +
      `by carrying a page's whole body back, and only \`${PERSONA_PAGE_TYPE_SLUG}\` has a body this ` +
      "knows how to set a total in",
  }
}
