import type { QuestionLink } from "@akasha/open-questions/question-link"
import { unheld } from "~/lib/pages-unheld"

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

// A QUESTION THAT WENT UNREAD IS NOT A BLANK QUESTION. This read the question's title, context,
// options, links and status, then the persona who asked it, through `@shared/pages-query` — over
// its remote half, since `QuestionAnswerArm` calls this from a client effect in the capacitor
// SPA and a phone has no checkout. Both halves are gone, and `question` is no page type the pages
// system service holds.
//
// The zod schemas this parsed rows through caught every missing field into an empty string, an
// empty list or a zero, so a question that came back unread already parsed cleanly into a
// question with no title, no options and an asked-at of the epoch. Drawing that on the phone
// would put an empty card in front of Alan with two buttons under it, and answering it would
// resolve a question whose text he never saw. So this refuses before any of that is built.
//
// The persona lookup went with it. `persona` is a page type the pages system service does hold,
// but which persona asked is read off the question, and there is no question to read it from.
export async function resolveQuestionDetail(args: {
  id: string
  pageTypeSlug: string
}): Promise<QuestionDetail> {
  throw new Error(unheld(args.pageTypeSlug, `the question \`${args.id}\``))
}
