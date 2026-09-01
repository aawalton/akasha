import {
  ANSWERED_OPTION_INDEX_KEY,
  selectTappedOptionIndex,
} from "@akasha/open-questions/question-answer"
import {
  openQuestionsWhere,
  QUESTION_PAGE_TYPE_SLUG,
} from "@akasha/open-questions/question-status"
import { getPage, getPages } from "@akasha/pages-access/get"
import { patchPage } from "@akasha/pages-access/patch"
import { type PageWhere } from "@akasha/pages-core/page-types"
import { buildPageHref } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { z } from "zod"
import { unwritten } from "~/lib/pages-unheld"
import { type InboundSender, withSenderFooter } from "~/lib/sender-surface"
import { HOURLY_CONFIRM_ANSWER_SEAT, TRACKING_HOURLY_CONFIRM_SOURCE } from "./hourly-confirm-source"

const ANSWERED_STATUS = "answered"
const DISMISSED_STATUS = "dismissed"
const ANSWER_SOURCE = "question-answer"
const DISMISS_SOURCE = "question-dismiss"

const QUESTION_CHANNEL = "question resolution"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const personaRowSchema = z.object({ id: z.string().min(1), slug: z.string().min(1) })

async function listPersonaTargets(): Promise<readonly { id: string; slug: string }[]> {
  const { rows } = await getPages({
    pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
    select: ["id", "slug"],
  })
  const targets: { id: string; slug: string }[] = []
  for (const row of rows) {
    const parsed = personaRowSchema.safeParse(row)
    if (parsed.success) targets.push(parsed.data)
  }
  return targets
}

export type ResolveQuestionArgs = {
  questionId: string
  action: "answer" | "dismiss"
  content?: string
  answeredOptionIndex?: number
  sessionUserId: string
  sender: InboundSender
}

export type ResolveQuestionResult =
  | { ok: true; nextHref: string | null }
  | { ok: false; error: string }

function ownedQuestionWhere(args: ResolveQuestionArgs): PageWhere {
  return [
    { key: "id", eq: args.questionId },
    { key: "userId", eq: args.sessionUserId },
  ]
}

const questionRowSchema = z.object({
  title: z.string().catch(""),
  askedBy: z.string().nullable().catch(null),
  options: z.array(z.string()).catch([]),
  sourceContext: z.string().nullable().catch(null),
})

function automationSeat(sourceContext: string | null): string | null {
  return sourceContext === TRACKING_HOURLY_CONFIRM_SOURCE ? HOURLY_CONFIRM_ANSWER_SEAT : null
}

type ResolvedAsker = { handle: string }

export interface ResolveQuestionDeps {
  readonly listPersonaTargets: () => Promise<readonly { id: string; slug: string }[]>
  readonly getPage: typeof getPage
  readonly getPages: typeof getPages
  readonly patchPage: typeof patchPage
}

export const defaultResolveQuestionDeps: ResolveQuestionDeps = {
  listPersonaTargets,
  getPage,
  getPages,
  patchPage,
}

function errMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

async function resolveAsker(
  askedBy: string,
  deps: ResolveQuestionDeps,
  seat: string | null = null
): Promise<ResolvedAsker | { error: string }> {
  let handle = seat
  if (handle === null) {
    const targets = await deps.listPersonaTargets()
    handle = targets.find((t) => t.id === askedBy)?.slug ?? null
  }
  if (handle === null) {
    return { error: `No live persona handle for asker ${askedBy}` }
  }
  return { handle }
}

// AN ANSWER HAS NOWHERE TO GO. This wrote a `message` page to the asker's seat through
// `@shared/pages-query`, into this pod's own checkout. That reach is severed, and `message` is no
// page type the pages system service holds, so there is no seat to write to.
//
// Throwing is what this already did for a message that did not land, and both callers already
// carry it: an answer refuses the whole resolution and leaves the question open, and a dismissal
// warns and marks the question dismissed anyway. Which is right — the answer is worth nothing to
// Alan if it never reaches the persona who asked, and a dismissal is a thing he did rather than a
// thing he said. The footer is still built, so what went undelivered is what would have been sent.
async function deliver(
  asker: ResolvedAsker,
  content: string,
  source: string,
  sender: InboundSender
): Promise<void> {
  const body = withSenderFooter(content, sender, QUESTION_CHANNEL)
  throw new Error(
    `message for '${asker.handle}' did not land: ` +
      `${unwritten("message", `${body.length} characters from \`${source}\``)}`
  )
}

async function nextOpenQuestionHref(
  excludeId: string,
  deps: ResolveQuestionDeps
): Promise<string | null> {
  const { rows } = await deps.getPages({
    pageTypeSlug: QUESTION_PAGE_TYPE_SLUG,
    where: openQuestionsWhere(),
    select: ["id", "title", "slug", "createdAt"],
    order: [{ by: "createdAt", dir: "asc" }],
    limit: 2,
  })
  const next = rows.find((row) => row.id !== excludeId)
  if (next === undefined) return null
  return buildPageHref({
    pageTypeSlug: toPageTypeSlug(QUESTION_PAGE_TYPE_SLUG),
    slug: next.slug,
    fallbackSlugSource: next.title,
    id: next.id,
  })
}

export async function resolveQuestion(
  args: ResolveQuestionArgs,
  deps: ResolveQuestionDeps = defaultResolveQuestionDeps
): Promise<ResolveQuestionResult> {
  const row = await deps.getPage({
    pageTypeSlug: QUESTION_PAGE_TYPE_SLUG,
    where: ownedQuestionWhere(args),
    select: ["id", "title", "slug", "askedBy", "status", "options", "sourceContext"],
  })
  if (row === null) {
    return { ok: false, error: `Question ${args.questionId} not found` }
  }
  const parsed = questionRowSchema.parse(row)
  if (parsed.askedBy === null) {
    return { ok: false, error: `Question ${args.questionId} has no askedBy` }
  }

  if (args.action === "answer") {
    const content = args.content?.trim() ?? ""
    if (content === "") {
      return { ok: false, error: "An answer requires non-empty content" }
    }
    const tappedIndex = selectTappedOptionIndex({
      options: parsed.options,
      claimedIndex: args.answeredOptionIndex,
      content,
    })
    if (tappedIndex === null) {
      const asker = await resolveAsker(parsed.askedBy, deps, automationSeat(parsed.sourceContext))
      if ("error" in asker) return { ok: false, error: asker.error }
      try {
        await deliver(asker, content, ANSWER_SOURCE, args.sender)
      } catch (err) {
        return { ok: false, error: `Failed to deliver answer to asker: ${errMessage(err)}` }
      }
    }
    await deps.patchPage({
      pageTypeSlug: QUESTION_PAGE_TYPE_SLUG,
      where: ownedQuestionWhere(args),
      set: {
        status: ANSWERED_STATUS,
        answeredAt: Date.now(),
        answer: content,
        ...(tappedIndex === null ? {} : { [ANSWERED_OPTION_INDEX_KEY]: tappedIndex }),
      },
    })
  } else {
    if (automationSeat(parsed.sourceContext) === null) {
      const asker = await resolveAsker(parsed.askedBy, deps)
      if ("error" in asker) {
        console.warn(
          `[resolve-question] dismiss: asker unresolved for ${args.questionId}: ${asker.error}`
        )
      } else {
        try {
          await deliver(
            asker,
            `Your question was dismissed without an answer: "${parsed.title}"`,
            DISMISS_SOURCE,
            args.sender
          )
        } catch (err) {
          console.warn(
            `[resolve-question] dismiss: notice delivery failed for ${args.questionId}: ${errMessage(err)}`
          )
        }
      }
    }
    await deps.patchPage({
      pageTypeSlug: QUESTION_PAGE_TYPE_SLUG,
      where: ownedQuestionWhere(args),
      set: { status: DISMISSED_STATUS, answeredAt: Date.now() },
    })
  }

  const nextHref = await nextOpenQuestionHref(args.questionId, deps)
  return { ok: true, nextHref }
}
