import { nightlyChapterWriting } from "akasha/story/world/stories/written/modules/nightly-chapter-writing/nightly-chapter-writing.module.code.ts"

export async function runService(): Promise<void> {
  const said = await nightlyChapterWriting(false)
  for (const one of said) process.stdout.write(`${one}\n`)
}
