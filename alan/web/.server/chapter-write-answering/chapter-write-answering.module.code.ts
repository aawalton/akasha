import {
  type SignedIn,
  signedInAs,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import {
  askingFor,
  readingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  asContributor,
  type Enrolment,
  personSlugFor,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { ACTION_BAR_PLAYER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import {
  type ChapterMade,
  chapterMadeFor,
} from "akasha/story/world/stories/written/chapters/modules/chapter-making/chapter-making.module.code.ts"

const NOT_SIGNED_IN = "Not authenticated."

const NO_STORY = "No story."

const NOT_THE_READER = "Only the person this story is written for starts its chapters."

const NOT_LISTENING = "The story is not listening right now. Try again."

export type ChapterWriteEffects = {
  readonly signedIn: (request: Request) => Promise<SignedIn | null>
  readonly enrol: (contributor: string) => Promise<Enrolment>
  readonly make: (story: string) => Promise<ChapterMade>
}

function defaultEffects(): ChapterWriteEffects {
  return {
    signedIn: (request) => signedInAs(request),
    enrol: (contributor) => personSlugFor(asContributor(contributor)),
    make: (story) =>
      chapterMadeFor(story, {
        ask: (query) => askingFor(query),
        read: (sought) => readingFor(sought),
        write: (asked) => writingFor(asked),
        send: (asked) => writingFor(asked),
      }),
  }
}

function storyIn(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null
  return textIn((body as { readonly story?: unknown }).story)
}

async function madeBy(effects: ChapterWriteEffects, story: string): Promise<ChapterMade> {
  try {
    return await effects.make(story)
  } catch (thrown) {
    return { kind: "unread", why: saidBy(thrown) }
  }
}

export async function answerChapterWrite(
  request: Request,
  effects: ChapterWriteEffects = defaultEffects()
): Promise<Response> {
  const answer = (body: unknown, status: number) => Response.json(body, { status })
  const story = storyIn(await request.json().catch(() => null))
  if (story === null || story.trim() === "") return answer({ ok: false, error: NO_STORY }, 400)
  const signed = await effects.signedIn(request)
  if (signed === null) return answer({ ok: false, error: NOT_SIGNED_IN }, 401)
  const enrolled = await effects.enrol(signed.contributor)
  if (!enrolled.ok) {
    return answer({ ok: false, error: enrolled.unread ? NOT_LISTENING : NOT_THE_READER }, 403)
  }
  if (enrolled.personSlug !== ACTION_BAR_PLAYER) {
    return answer({ ok: false, error: NOT_THE_READER }, 403)
  }
  const made = await madeBy(effects, story)
  if (made.kind === "refused") return answer({ ok: false, error: made.said }, 409)
  if (made.kind === "unread") {
    console.error(`a chapter of ${story} was not started: ${made.why}`)
    return answer({ ok: false, error: NOT_LISTENING }, 503)
  }
  for (const fault of made.faults) console.error(`chapter ${made.slug}: ${fault}`)
  return answer({ ok: true, slug: made.slug }, 200)
}
