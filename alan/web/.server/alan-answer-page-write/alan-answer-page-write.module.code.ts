import { answerPageWrite as answerFrom } from "akasha/alan/harness/web-page-answer/.server/answer-page-write/answer-page-write.module.code.ts"
import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import {
  chapterReadBacklog,
  chapterReadIn,
} from "akasha/story/world/stories/written/chapters/modules/chapter-read-backlog/chapter-read-backlog.module.code.ts"

const ALANWALTON_WRITER = "alanwalton-web"

async function backlogAfterReading(chapter: string): Promise<undefined> {
  const kept = await chapterReadBacklog(chapter)
  if (kept.failed) console.error(`word backlog: ${kept.said}`)
  else console.log(`word backlog: ${kept.said}`)
  for (const one of kept.faults) console.error(`word backlog: ${one}`)
  return undefined
}

export async function answerPageWrite(request: Request): Promise<Response> {
  const asked: unknown = await request
    .clone()
    .json()
    .catch(() => null)
  const answered = await answerFrom(request, ALANWALTON_WRITER, readAlanUser)
  const chapter = chapterReadIn(asked)
  if (answered.ok && chapter !== null) void backlogAfterReading(chapter)
  return answered
}
