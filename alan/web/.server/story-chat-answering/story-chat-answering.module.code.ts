import {
  type ActionBarEffects,
  actionIn,
  answerFor,
  defaultEffects,
  gateFor,
  type Stated,
} from "akasha/alan/web/.server/action-bar-answering/action-bar-answering.module.code.ts"
import { capacitorCorsHeaders } from "akasha/alan/web/modules/capacitor-cors/capacitor-cors.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  readingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { CHAT_SENDER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import {
  CHAT_PLAYER,
  chatLine,
} from "akasha/story/world/stories/played/modules/chat-lines/chat-lines.module.code.ts"
import { chat } from "akasha/story/world/stories/played/properties/chat.file-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const CORS_METHODS = "POST, OPTIONS"

const HELD = "jsonl"

const TRIES = 5

const WRITER = "Alan's chat <chat@alanwalton.com>"

const NO_MESSAGE = "Please write a message."

const NOT_KEPT = "The chat did not keep your message. Try again."

const NOT_TOLD = "Your message is kept, but it did not reach the game master. Send it again."

export type Appended = { readonly ok: true } | { readonly refused: string }

export type ChatEffects = ActionBarEffects & {
  readonly append: (game: string, line: string) => Promise<Appended>
}

type Reading = typeof readingFor

type Writing = typeof writingFor

async function chatPathOf(
  game: string,
  reading: Reading
): Promise<string | { readonly refused: string }> {
  const read = await reading({ pages: [{ pageTypeSlug: storyPlayed.slug, slug: game }] })
  if ("refused" in read) return read
  const page = read.bodies[0]?.path
  if (page === undefined) return { refused: `no story played is named \`${game}\`` }
  const at = besideAt(page, chat.propertySlug, HELD)
  return at === null ? { refused: `\`${page}\` can hold no chat beside it` } : at
}

export async function appendedTo(
  game: string,
  line: string,
  reading: Reading = readingFor,
  writing: Writing = writingFor
): Promise<Appended> {
  const path = await chatPathOf(game, reading)
  if (typeof path !== "string") return path
  let why = "nothing was tried"
  for (let taken = 1; taken <= TRIES; taken += 1) {
    const read = await reading({ paths: [path] })
    if ("refused" in read) {
      why = read.refused
      continue
    }
    const held = read.bodies.find((one) => one.path === path)?.content ?? ""
    const wrote = await writing({
      writer: WRITER,
      message: `Alan says a message in the chat of ${game}`,
      puts: [{ path, content: `${held}${line}` }],
      read: read.at,
    })
    if (!("refused" in wrote)) return { ok: true }
    why = wrote.refused
  }
  return { refused: `\`${path}\` was not written in ${TRIES} tries — ${why}` }
}

function chatEffects(): ChatEffects {
  return { ...defaultEffects(), append: (game, line) => appendedTo(game, line) }
}

async function keptBy(effects: ChatEffects, game: string, line: string): Promise<Appended> {
  try {
    return await effects.append(game, line)
  } catch (thrown) {
    return { refused: saidBy(thrown) }
  }
}

async function toldBy(effects: ChatEffects, stated: Stated): Promise<string | null> {
  try {
    const written = await effects.write(stated)
    return written.kind === "refused" ? written.detail : null
  } catch (thrown) {
    return saidBy(thrown)
  }
}

export async function answerStoryChat(
  request: Request,
  effects: ChatEffects = chatEffects()
): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: capacitorCorsHeaders(request, CORS_METHODS) })
  }
  const answer = answerFor(request)
  const body: unknown = await request.json().catch(() => null)
  const asked = actionIn(body)
  if (asked === null) return answer({ ok: false, error: NO_MESSAGE }, 400)
  const gate = await gateFor(effects, request, asked.game, answer)
  if (!gate.ok) return gate.answered
  const text = asked.text.trim()
  const kept = await keptBy(
    effects,
    gate.game,
    chatLine(CHAT_PLAYER, text, new Date().toISOString())
  )
  if ("refused" in kept) {
    console.error(`the chat of ${gate.game} kept no message: ${kept.refused}`)
    return answer({ ok: false, error: NOT_KEPT }, 503)
  }
  const stated: Stated = {
    to: gate.seat,
    from: CHAT_SENDER,
    warrant: "announce",
    body: text,
    startedOnDemand: true,
  }
  const unsent = await toldBy(effects, stated)
  if (unsent !== null) {
    console.error(`the chat of ${gate.game} did not reach ${gate.seat}: ${unsent}`)
    return answer({ ok: false, error: NOT_TOLD }, 503)
  }
  return answer({ ok: true }, 200)
}
