import type { QuestionLink } from "@shared/open-questions"
import { askComposed } from "@shared/pages-query/ask"
import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import { z } from "zod"

const PERSONA_SLUG = "persona"

export type QuestionDetail = {
  question: {
    id: string
    title: string
    context: string | null
    options: readonly string[]
    links: readonly QuestionLink[]
    status: string
    askedAtMs: number
  }
  persona: {
    id: string
    handle: string | null
    name: string
    avatarUrl: string | null
    chatHref: string | null
  } | null
}

const questionRowSchema = z.object({
  title: z.string().catch(""),
  context: z.string().nullable().catch(null),
  options: z.array(z.string()).catch([]),
  links: z
    .array(z.object({ label: z.string(), url: z.string(), platform: z.enum(["web", "native"]) }))
    .catch([]),
  status: z.string().catch(""),
  "asked-by": z.string().nullable().catch(null),
  "created-at": z.string().nullable().catch(null),
})

const personaRowSchema = z.object({
  title: z.string().catch(""),
  slug: z.string().nullable().catch(null),
  cover: z.string().nullable().catch(null),
})

function isoToMs(iso: string | null): number {
  if (iso === null || iso === "") return 0
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? 0 : ms
}

async function resolveAskingPersona(askedBy: string | null): Promise<QuestionDetail["persona"]> {
  if (askedBy === null) return null
  const asked = await askComposed({
    "page-type": PERSONA_SLUG,
    where: { id: { is: askedBy } },
    keys: ["title", "slug", "cover"],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`persona \`${askedBy}\` went unread: ${asked.why}`)
  }
  const personaRow = asked.answer.rows[0]
  if (personaRow === undefined) return null
  const persona = personaRowSchema.parse(personaRow.values)
  const chatHref = buildPageHref({
    pageTypeSlug: PageTypeSlug(PERSONA_SLUG),
    slug: persona.slug,
    fallbackSlugSource: persona.title,
    id: askedBy,
  })
  return { id: askedBy, handle: null, name: persona.title, avatarUrl: persona.cover, chatHref }
}

export async function resolveQuestionDetail(args: {
  id: string
  pageTypeSlug: string
}): Promise<QuestionDetail> {
  const asked = await askComposed({
    "page-type": args.pageTypeSlug,
    where: { id: { is: args.id } },
    keys: ["title", "context", "options", "links", "status", "asked-by", "created-at"],
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(`\`${args.pageTypeSlug}\` \`${args.id}\` went unread: ${asked.why}`)
  }
  const row = asked.answer.rows[0]
  const parsed = questionRowSchema.parse(row?.values ?? {})
  const persona = await resolveAskingPersona(parsed["asked-by"])
  return {
    question: {
      id: args.id,
      title: parsed.title,
      context: parsed.context,
      options: parsed.options,
      links: parsed.links,
      status: parsed.status,
      askedAtMs: isoToMs(parsed["created-at"]),
    },
    persona,
  }
}
