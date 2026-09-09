import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import {
  getMessage,
  listMessages,
} from "akasha/google/email/email-message-fetching/email-message-fetching.module.code.ts"

export interface EmailMessage {
  readonly id: string
  readonly subject: string
  readonly date: string
  readonly body: string
}

const FETCH_WIDTH = 8

export async function cachedMessages(options: {
  readonly query: string
  readonly cacheDir: string
  readonly label: string
}): Promise<readonly EmailMessage[]> {
  mkdirSync(options.cacheDir, { recursive: true })
  const listed = await listMessages({ query: options.query, max: 500 })
  const ids = listed.map((m) => m.id)
  const wanted = ids.filter((id) => !existsSync(`${options.cacheDir}/${id}.json`))
  console.log(`gmail: ${ids.length} ${options.label}, ${wanted.length} to fetch`)
  for (let at = 0; at < wanted.length; at += FETCH_WIDTH) {
    await Promise.all(
      wanted.slice(at, at + FETCH_WIDTH).map(async (id) => {
        writeFileSync(
          `${options.cacheDir}/${id}.json`,
          `${JSON.stringify(await getMessage({ id }), null, 2)}\n`
        )
      })
    )
    if (at % 80 === 0 && at > 0) console.log(`  fetched ${at} of ${wanted.length}`)
  }
  return ids.map(
    (id) => JSON.parse(readFileSync(`${options.cacheDir}/${id}.json`, "utf8")) as EmailMessage
  )
}
