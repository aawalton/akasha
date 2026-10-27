import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { body } from "akasha/command/argument/pages/body.argument.ts"
import { bodyFile } from "akasha/command/argument/pages/body-file.argument.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Filing,
  filledIn,
} from "akasha/command/modules/filling/command-filling.module.code.ts"
import { senderIn } from "akasha/command/pages/seat/send/seat-send.command.code.ts"
import { storyChat as page } from "akasha/command/pages/story/chat/story-chat.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { chatLine } from "akasha/story/world/stories/played/modules/chat-lines/chat-lines.module.code.ts"
import { chat } from "akasha/story/world/stories/played/properties/chat.file-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const APPEND = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

const HELD = "jsonl"

const BODY_FILING: Filing = { said: "--body", file: "--body-file", whole: true }

const NO_SENDER = "`AGENT_ID` names no seat, so there is no seat to say it as, and nothing was said"

const NO_BODY = "a message says something, and this names no `--body` or `--body-file`"

export type Placing = (root: string, story: string) => string | null

export function chatAt(root: string, story: string): string | null {
  const listed = listedAt(root, storyPlayed.slug, story)[0]
  return listed === undefined ? null : besideAt(listed.path, chat.propertySlug, HELD)
}

export function askedFor(path: string, from: string, said: string, at: string): readonly Asking[] {
  return [{ at: APPEND, given: { at: path, content: chatLine(from, said, at) } }]
}

async function saidBy(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  placing: Placing,
  from: string | null
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [storyArgument, bodyFile, body])
  if ("refused" in read) return refused(read.refused.join(" "), INPUT)
  const filled = filledIn(given.root, read.taken.body, read.taken.bodyFile, BODY_FILING)
  if ("refused" in filled) return refused(filled.refused.join(" "), INPUT)
  const said = filled.text?.trim() ?? ""
  if (said === "") return refused(NO_BODY, INPUT)
  if (from === null) return refused(NO_SENDER, INPUT)
  const story = read.taken.story.trim()
  const path = placing(given.root, story)
  if (path === null) return refused(`\`${story}\` names no story played here`, DATA)
  const landed = await landing(
    given.root,
    askedFor(path, from, said, new Date().toISOString()),
    `${from} says a message in the chat of ${story}`,
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([`said in the chat of ${story} as ${from}`])
}

export async function storyChat(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  placing: Placing = chatAt,
  from: string | null = senderIn(optionalEnv("AGENT_ID"))
): Promise<Answer> {
  return await answering(async (done) => await saidBy(done, argv, given, landing, placing, from))
}
